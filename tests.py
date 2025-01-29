
import hashlib
from logging import error
import os
from api.main import app
from fastapi.testclient import TestClient
import dotenv

dotenv.load_dotenv()

client = TestClient(app)

auth_token = os.getenv("AUTH_TOKEN")
if auth_token is None:
    error("No AUTH_TOKEN environment variable found!")
    exit(1)


def test_login_valid():
    data = {"auth_token": auth_token,
            "email": "abc@gmail.com", "password": "pqr"}
    hashed_password = hashlib.sha256("pqr".encode("utf-8")).hexdigest()
    res = client.post("/login", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["error"] is None
    assert res_json["response"] is not None


def test_login_invalid_auth():
    data = {"auth_token": "", "email": "abc@gmail.com", "password": "pqr"}

    res = client.post("/login", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["error"] is not None


def test_login_invalid_email():
    data = {"auth_token": auth_token,
            "email": "abcd@gmail.com", "password": "pqr"}

    res = client.post("/login", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["error"] is not None


def test_login_invalid_password():
    data = {"auth_token": auth_token,
            "email": "abc@gmail.com", "password": "pqrs"}

    res = client.post("/login", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["error"] is not None


def test_logout_invalid():
    data = {"auth_token": "", "email": "abc@gmail.com"}

    res = client.post("/logout", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["error"] is not None


def test_signup_valid():
    data = {
        "auth_token": auth_token,
        "name": "random",
        "email": "random@gmail.com",
        "password": "pass",
    }

    res = client.post("/signup", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["error"] is None
    assert res_json["response"] is not None
    assert res_json["stoken"] is not None


def test_signup_invalid_auth():
    data = {
        "auth_token": "",
        "name": "random",
        "email": "random@gmail.com",
        "password": "pass",
    }

    res = client.post("/signup", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["stoken"] is None
    assert res_json["error"] is not None


def test_signup_invalid_repeated():
    data = {
        "auth_token": auth_token,
        "name": "random",
        "email": "random@gmail.com",
        "password": "pass",
    }

    res = client.post("/signup", json=data)
    res_json = res.json()

    assert res.status_code == 200
    assert res_json["response"] is None
    assert res_json["stoken"] is None
    assert res_json["error"] is not None


def test_get_metrics_valid():
    stoken = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    res = client.get(f"/metrics/{stoken}")
    res_json = res.json()

    assert res.status_code == 200
    assert "stoken" in res_json
    assert "total_games_attempted" in res_json
    assert "total_games_correct" in res_json


def test_get_metrics_invalid():
    invalid_stoken = "invalid_stoken_value"
    res = client.get(f"/metrics/{invalid_stoken}")

    assert res.status_code == 404
    assert res.json() == {
        "detail": "Metrics not found for the provided student token."}


def test_game_attempt_valid():
    data = {
        "stoken": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "gid": 1,
        "got_correct": 1,
    }
    res = client.post("/game-attempt", json=data)
    assert res.status_code == 200
    assert res.json() == {
        "message": "Game attempt logged and metrics updated successfully"
    }
