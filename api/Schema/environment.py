from pydantic import BaseModel
from datetime import datetime

# ----- Schemas for Orders table -----
class BaseEnvironmentRecord(BaseModel):
  temperature: float
  humidity: float
  pressure: float
  vibration: float
  chemical_concentration: float
  noise: int
  record_time: datetime

  class Config:
    from_attributes = True


class GetEnviromentRecord(BaseEnvironmentRecord):
  env_record_id: int