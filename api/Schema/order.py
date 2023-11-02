from pydantic import BaseModel
from datetime import date

# ----- Schemas for Orders table -----
class BaseOrder(BaseModel):
  total_amount: int
  status: str
  create_date: date
  payment_method: str
  pay_date: date
  customize_details: str
  ordered_user_id: int
  ordered_item_id: int

  class Config:
    from_attributes = True


class GetOrder(BaseOrder):
  id: int