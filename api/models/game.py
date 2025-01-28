from pydantic import BaseModel, constr, conint
from typing import Literal


class Game(BaseModel):
    GId: conint(ge=1)
    GName: constr(min_length=1, max_length=50)
    GDescription: constr(min_length=1, max_length=500)
    GDifficulty: Literal["Easy", "Medium", "Hard"]


class GameAttemptRequest(BaseModel):
    stoken: str
    gid: int
    got_correct: bool
