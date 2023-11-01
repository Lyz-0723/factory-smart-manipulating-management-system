from pydantic import BaseModel

# ----- Schemas for Items table -----
class BaseItem(BaseModel):
  name: str
  description: str
  unit_price: int

  class Config:
    from_attributes = True


class GetItem(BaseItem):
  id: int