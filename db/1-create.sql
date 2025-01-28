CREATE DATABASE IF NOT EXISTS Discreta;

USE Discreta;

CREATE TABLE IF NOT EXISTS ADMIN (
    AId INTEGER AUTO_INCREMENT PRIMARY KEY,
    AEmail VARCHAR(30),
    APassword CHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS PROFESSOR (
    PId INTEGER PRIMARY KEY,
    PName VARCHAR(30),
    PEmail VARCHAR(30),
    PPassword CHAR(64)
);

CREATE TABLE IF NOT EXISTS STUDENT (
    SToken CHAR(64) PRIMARY KEY,
    SName VARCHAR(30),
    SEmail VARCHAR(30),
    SPassword CHAR(64)
);

CREATE TABLE IF NOT EXISTS QUESTIONS (
    QId INTEGER PRIMARY KEY,
    QTitle VARCHAR(50),
    QDesc VARCHAR(500),
    QDifficulty VARCHAR(10),
    Interactive BOOLEAN,
    CONSTRAINT chk_questions_qdifficulty CHECK (QDifficulty IN ("Easy", "Medium", "Hard"))
);

CREATE TABLE IF NOT EXISTS OPTIONS (
    QId INTEGER PRIMARY KEY,
    OId CHAR(1),
    ODesc VARCHAR(100),
    IsCorrect BOOLEAN,
    CONSTRAINT CHK_OptionsOId CHECK (OId IN ("A", "B", "C", "D")),
    FOREIGN KEY fk_questions_options_qid (QId) REFERENCES QUESTIONS(QId)
);

CREATE TABLE IF NOT EXISTS PROFESSOR_ADDITIONS (
    AId INTEGER,
    PId INTEGER,
    Timestamp DATETIME,
    FOREIGN KEY fk_admin_professor_aid (AId) REFERENCES ADMIN(AId),
    FOREIGN KEY fk_admin_professor_pid (PId) REFERENCES PROFESSOR(PId)
);

CREATE TABLE IF NOT EXISTS STUDENT_CREATIONS (
    PId INTEGER,
    SToken CHAR(64),
    Timestamp DATETIME,
    FOREIGN KEY fk_professor_student_pid (PId) REFERENCES PROFESSOR(PId),
    FOREIGN KEY fk_professor_student_stoken (SToken) REFERENCES STUDENT(SToken)
);

CREATE TABLE IF NOT EXISTS STUDENT_ATTEMPTS (
    SToken CHAR(64),
    QId INTEGER,
    Timestamp DATETIME,
    GotCorrect BOOLEAN,
    FOREIGN KEY fk_student_questions_stoken (SToken) REFERENCES STUDENT(SToken),
    FOREIGN KEY fk_student_questions_qid (QId) REFERENCES QUESTIONS(QId)
);

CREATE TABLE IF NOT EXISTS GAMES (
    GId INTEGER AUTO_INCREMENT PRIMARY KEY,
    GName VARCHAR(50) NOT NULL,
    GDescription VARCHAR(500),
    GDifficulty VARCHAR(10),
    CorrPoints INTEGER,
    CONSTRAINT chk_games_difficulty CHECK (GDifficulty IN ('Easy', 'Medium', 'Hard'))
);

CREATE TABLE IF NOT EXISTS GAME_ATTEMPTS (
    SToken CHAR(64),
    GId INTEGER,
    Timestamp DATETIME,
    GotCorrect BOOLEAN,
    FOREIGN KEY fk_student_game_attempts_stoken (SToken) REFERENCES STUDENT(SToken),
    FOREIGN KEY fk_student_game_attempts_gid (GId) REFERENCES GAMES(GId)
);

CREATE TABLE IF NOT EXISTS METRICS (
    SToken CHAR(64),
    TotalGamesAttempted INT DEFAULT 0,
    TotalGamesCorrect INT DEFAULT 0,
    TotalPointsEarned INT DEFAULT 0,
    LastActive DATETIME,
    SuccessRate FLOAT GENERATED ALWAYS AS (
        CASE 
            WHEN TotalGamesAttempted = 0 THEN 0 
            ELSE (TotalGamesCorrect * 100.0 / TotalGamesAttempted) 
        END
    ) STORED,
    AveragePointsPerGame FLOAT GENERATED ALWAYS AS (
        CASE 
            WHEN TotalGamesAttempted = 0 THEN 0 
            ELSE (TotalPointsEarned * 1.0 / TotalGamesAttempted) 
        END
    ) STORED,
    PRIMARY KEY (SToken),
    FOREIGN KEY (SToken) REFERENCES STUDENT(SToken)
);
