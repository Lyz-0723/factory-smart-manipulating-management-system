from pydantic import BaseModel
from datetime import datetime

# ----- Schemas for Production_Line_Records table -----
class BasePLRecord(BaseModel):
  rating: int | None = None
  production_output: int | None = None
  energy_consumption: int | None = None
  record_time: datetime | None = None
  pl_id: int | None = None

  class Config:
    from_attributes = True


class GetPLRecord(BasePLRecord):
  pl_record_id: int