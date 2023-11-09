from pydantic import BaseModel
from datetime import date

# ----- Schemas for Orders table -----
class BaseOrder(BaseModel):
  total_amount: int | None = None
  status: int | None = None
  create_date: date | None = None
  payment_method: str | None = None
  pay_date: date | None = None
  customize_details: str | None = None
  ordered_user_id: int | None = None
  ordered_item_id: int | None = None

  class Config:
    from_attributes = True


class GetOrder(BaseOrder):
  order_id: int