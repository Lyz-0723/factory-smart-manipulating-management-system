from pydantic import BaseModel

# ----- Schemas for Status table -----
class Status(BaseModel):
  status_id: int
  status: str

  class Config:
    from_attributes = True


# ----- Schemas for Ratings table -----
class Rating(BaseModel):
  rating_id: int
  rating: str
  
  class Config:
    from_attributes = True