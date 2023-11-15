from pydantic import BaseModel

# ----- Schemas for Machines table -----
class BaseMachine(BaseModel):
  serial_number: str | None = None
  machine_usage: str | None = None
  position: int | None = None
  status: int | None = None
  script: str | None = None
  pl_id: int | None = None

  class Config:
    from_attributes = True

  
class GetMachine(BaseMachine):
  machine_id: int