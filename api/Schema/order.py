from pydantic import BaseModel
from datetime import date


# ----- Schemas for Orders table -----
class BaseOrder(BaseModel):
    total_amount: int | None = None
    payment_method: str | None = None
    customize_details: str | None = None
    ordered_item_id: int | None = None

    class Config:
        from_attributes = True


class AdminModifyOrder(BaseModel):
    order_id: int
    status: int

    class Config:
        from_attributes = True


class ModifyOrder(BaseOrder):
    order_id: int
    pay_date: date | None = None


class GetOrder(ModifyOrder):
    status: int | None = None
    create_date: date | None = None
    ordered_user_id: int | None = None
