from pydantic import BaseModel


# ----- Schemas for Status table -----
class BaseStatus(BaseModel):
    status: str

    class Config:
        from_attributes = True


class Status(BaseStatus):
    status_id: int


# ----- Schemas for Ratings table -----
class Rating(BaseModel):
    rating_id: int
    rating: str

    class Config:
        from_attributes = True
