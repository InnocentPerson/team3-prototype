from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector as msql
import os
import dotenv
from contextlib import asynccontextmanager
from typing import List
from logging import error
from datetime import datetime

from api.consts import (
    STUDENT_NAME_FIELD,
    STUDENT_TABLE,
    STUDENT_EMAIL_FIELD,
    STUDENT_PASSWORD_FIELD,
)
from api.models.login import LoginRequest, LoginResponse
from api.models.logout import LogoutRequest, LogoutResponse
from api.models.signup import SignupRequest, SignupResponse
from api.models.student import Student
from api.models.game import Game, GameAttemptRequest
from api.models.metrics import MetricsResponse
from hashlib import sha256
from random import randint

dotenv.load_dotenv()

user = os.getenv("DB_USER")
if user is None:
    error("No DB_USER environment variable found!")
    exit(1)

password = os.getenv("DB_PASSWORD")
if password is None:
    error("No DB_PASSWORD environment variable found!")
    exit(1)

auth_token = os.getenv("AUTH_TOKEN")
if auth_token is None:
    error("No AUTH_TOKEN environment variable found!")
    exit(1)


@asynccontextmanager
async def get_db_connection(use_database=True):
    connection = msql.connect(
        user=user,
        password=password,
        host="localhost",
        database="Discreta" if use_database else "",
        charset="utf8mb4",
        collation="utf8mb4_general_ci",
    )
    try:
        yield connection
    finally:
        connection.close()


async def run_sql_script(script_path: str):
    async with get_db_connection(use_database=False) as db:
        with db.cursor() as cursor:
            with open(script_path, "r") as file:
                sql_script = file.read()
                queries = sql_script.split(";")
                for query in queries:
                    query = query.strip()
                    if query:
                        cursor.execute(query)
                        db.commit()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


logged_in_students = set()


async def startup():
    create_script_path = os.path.join(os.getcwd(), "db", "1-create.sql")
    insert_script_path = os.path.join(os.getcwd(), "db", "2-insert.sql")
    await run_sql_script(create_script_path)
    await run_sql_script(insert_script_path)


app.add_event_handler("startup", startup)


@app.get("/")
async def greet():
    return {"message": "Discreta says hello!!!"}

@app.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    resp = LoginResponse(response=None, error=None, stoken=None)
    if data.auth_token != auth_token:
        resp.error = "Auth token invalid."
        return resp

    async with get_db_connection() as db:
        with db.cursor(dictionary=True) as cursor:
            query = f"""
                SELECT SToken 
                FROM {STUDENT_TABLE} 
                WHERE {STUDENT_EMAIL_FIELD} = '{data.email}'
                AND {STUDENT_PASSWORD_FIELD} = '{data.password}'
            """
            cursor.execute(query)
            res = cursor.fetchall()
            if len(res) != 1:
                resp.error = f"No unique student found for {data.email}"
                return resp

            # Extract stoken from the row
            stoken_value = res[0]["SToken"]

    # Check if student already logged in
    student = Student(email=data.email)
    if student in logged_in_students:
        resp.error = "Student already logged in."
        return resp

    # Mark as logged in
    logged_in_students.add(student)

    resp.response = f"Student {data.email} logged in."
    resp.stoken = stoken_value  # Return student's token
    return resp


@app.post("/logout", response_model=LogoutResponse)
async def logout(data: LogoutRequest):
    resp = LogoutResponse(response=None, error=None)
    if data.auth_token != auth_token:
        resp.error = "Auth Token invalid."
        return resp

    student = Student(email=data.email)
    if student not in logged_in_students:
        resp.error = f"Student with email {data.email} not logged in."
        return resp

    logged_in_students.remove(student)
    resp.response = f"Student with email {data.email} logged out."
    return resp


@app.post("/signup", response_model=SignupResponse)
async def signup(data: SignupRequest):
    resp = SignupResponse(stoken=None, response=None, error=None)
    if data.auth_token != auth_token:
        resp.error = "Auth Token invalid."
        return resp

    async with get_db_connection() as db:
        with db.cursor() as cursor:
            query = f"SELECT * FROM {STUDENT_TABLE} WHERE {STUDENT_NAME_FIELD} = '{
                data.name
            }' AND {STUDENT_EMAIL_FIELD} = '{data.email}' AND {
                STUDENT_PASSWORD_FIELD
            } = '{data.password}'"
            cursor.execute(query)
            res = cursor.fetchall()
            if len(res) >= 1:
                resp.error = f"Student already exists with {
                    data.email
                } authenticated with {data.password}."
                return resp

            student_token = sha256(
                f"{data.name}{randint(0, len(data.name))}".encode("utf-8")
            ).hexdigest()
            query = f"INSERT INTO {STUDENT_TABLE} VALUES ('{student_token}', '{
                data.name
            }', '{data.email}', '{data.password}')"
            cursor.execute(query)
            insert_metrics_query = "INSERT INTO METRICS (SToken) VALUES (%s)"
            cursor.execute(insert_metrics_query, (student_token,))
            db.commit()

    student = Student(email=data.email)
    logged_in_students.add(student)

    resp.response = (
        f"Student with email {data.email} authenticated by {data.password} signed up."
    )
    resp.stoken = student_token
    return resp


@app.get("/metrics/{stoken}", response_model=MetricsResponse)
async def get_metrics(stoken: str = Path(..., description="Student's unique token")):
    async with get_db_connection() as db:
        with db.cursor(dictionary=True) as cursor:
            query = """
                SELECT 
                    SToken AS stoken,
                    TotalGamesAttempted,
                    TotalGamesCorrect,
                    TotalPointsEarned,
                    SuccessRate AS success_rate,
                    LastActive
                FROM METRICS
                WHERE SToken = %s
            """
            cursor.execute(query, (stoken,))
            metrics = cursor.fetchone()

            if not metrics:
                raise HTTPException(
                    status_code=404,
                    detail="Metrics not found for the provided student token.",
                )

            return metrics


@app.post("/game-attempt")
async def log_game_attempt(data: GameAttemptRequest):
    async with get_db_connection() as db:
        with db.cursor() as cursor:
            # Step 1: Insert into GAME_ATTEMPTS
            timestamp = datetime.utcnow()
            query_attempt = """
                INSERT INTO GAME_ATTEMPTS (SToken, GId, Timestamp, GotCorrect)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(
                query_attempt, (data.stoken, data.gid, timestamp, data.got_correct)
            )

            update_metrics_query = """
                UPDATE METRICS
                SET 
                    TotalGamesAttempted = TotalGamesAttempted + 1,
                    TotalGamesCorrect = TotalGamesCorrect + %s,
                    TotalPointsEarned = TotalPointsEarned + (
                        SELECT CorrPoints FROM GAMES WHERE GId = %s
                    ) * %s,
                    LastActive = %s
                WHERE SToken = %s
            """
            cursor.execute(
                update_metrics_query,
                (int(data.got_correct), data.gid, int(data.got_correct), timestamp, data.stoken),
            )
            db.commit()

    return {"message": "Game attempt logged and metrics updated successfully"}


@app.post("/metrics/reset")
async def reset_metrics(stoken: str):
    async with get_db_connection() as db:
        with db.cursor() as cursor:
            query = """
                UPDATE METRICS
                SET 
                    TotalGamesAttempted = 0,
                    TotalGamesCorrect = 0,
                    TotalPointsEarned = 0,
                    LastActive = NULL
                WHERE SToken = %s
            """
            cursor.execute(query, (stoken,))
            db.commit()

    return {"message": f"Metrics for student {stoken} reset successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(port=8000, app="main:app", reload=True, host="localhost")
