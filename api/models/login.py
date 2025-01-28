from pydantic import BaseModel, field_validator
from hashlib import sha256
from typing import Optional

class LoginRequest(BaseModel):
    auth_token: str
    email: str
    password: str

    @field_validator("password", mode="before")
    @classmethod
    def password_before(cls, value: str) -> str:
        return sha256(value.encode("utf-8")).hexdigest()


class LoginResponse(BaseModel):
    response: str | None
    error: str | None
    stoken: Optional[str] = None
