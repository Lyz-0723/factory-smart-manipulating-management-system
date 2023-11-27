import sqlalchemy
from sqlalchemy import Column, ForeignKey
from database import metadata
from Model.Users import Users
from Model.ProductionLine import Items

Order_Status = sqlalchemy.Table(
  "Order_Status",
  metadata,
  Column("status_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("status", sqlalchemy.VARCHAR(9), nullable=False)
)


Orders = sqlalchemy.Table(
  "Orders",
  metadata,
  Column("order_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("total_amount", sqlalchemy.INTEGER, nullable=False),
  Column("status", sqlalchemy.INTEGER, ForeignKey("Order_Status.status_id"), nullable=False),
  Column("create_date", sqlalchemy.Date, nullable=False),
  Column("payment_method", sqlalchemy.VARCHAR(30), nullable=False),
  Column("pay_date", sqlalchemy.DATE, nullable=True),
  Column("customize_details", sqlalchemy.VARCHAR(60), nullable=False),
  Column("ordered_user_id", sqlalchemy.INTEGER, ForeignKey(Users.c.user_id)),
  Column("ordered_item_id", sqlalchemy.INTEGER, ForeignKey(Items.c.item_id))
)