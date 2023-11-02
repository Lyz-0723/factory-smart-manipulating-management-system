from pydantic import BaseModel

# ----- Schemas for Productuin_Lines table -----
class BasePL(BaseModel):
  name: str
  description: str | None = None
  status: str
  item_id: int

  class Config:
    from_attributes = True


class GetPL(BasePL):
  id: int