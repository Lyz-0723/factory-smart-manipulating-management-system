from pydantic import BaseModel

# ----- Schemas for Items table -----
class BaseItem(BaseModel):
  item_name: str
  item_description: str
  unit_price: int

  class Config:
    from_attributes = True


class GetItem(BaseItem):
  item_id: int