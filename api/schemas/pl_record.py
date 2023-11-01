from pydantic import BaseModel
from datetime import date

# ----- Schemas for Production_Line_Records table -----
class BasePLRecord(BaseModel):
  rating: str
  output: int
  energy_consumption: int
  record_time: date
  pl_id: int

  class Config:
    from_attributes = True


class GetPLRecord(BasePLRecord):
  id: int