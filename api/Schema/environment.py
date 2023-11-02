from pydantic import BaseModel
from datetime import date

# ----- Schemas for Orders table -----
class BaseEnvironmentRecord(BaseModel):
  temperature: float
  humidity: float
  pressure: float
  vibration: float
  chemical_concentration: float
  noise: int
  record_date: date

  class Config:
    from_attributes = True


class GetEnviromentRecord(BaseEnvironmentRecord):
  id: int