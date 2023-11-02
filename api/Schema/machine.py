from pydantic import BaseModel

# ----- Schemas for Machines table -----
class BaseMachine(BaseModel):
  serial_number: str
  usage: str
  position: int
  status: str
  script: str
  pl_id: int

  class Config:
    from_attributes = True

  
class GetMachine(BaseMachine):
  id: int