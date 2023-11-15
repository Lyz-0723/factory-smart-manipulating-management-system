from pydantic import BaseModel

# ----- Schemas for Productuin_Lines table -----
class BasePL(BaseModel):
  pl_name: str | None = None
  pl_description: str | None = None
  status: int | None = None
  item_id: int | None = None

  class Config:
    from_attributes = True


class GetPL(BasePL):
  pl_id: int