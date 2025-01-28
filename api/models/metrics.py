from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MetricsResponse(BaseModel):
    stoken: str
    total_games_attempted: int
    total_games_correct: int
    total_points_earned: int
    success_rate: Optional[float]
    last_active: Optional[datetime]
