from Model.Order import Orders, Order_Status
from database import db, execute_stmt_in_tran
from Schema.order import GetOrder, BaseOrder

async def get_self_orders(user_id: int) -> list[GetOrder]:
  """Get all orders actions with db"""
  stmt = Orders.select().where(Orders.c.ordered_user_id == user_id)
  
  return await db.fetch_all(stmt)


async def get_self_spec_order(order_id: int) -> GetOrder:
  """Get self specific order actions with db"""
  stmt = Orders.select().where(Orders.c.order_id==order_id)

  return await db.fetch_one(stmt)


async def get_self_spec_status_orders(user_id: int, status: int) -> list[GetOrder]:
  """Get self specific status orders actions with db"""
  stmt = Orders.select().where(Orders.c.ordered_user_id==user_id).where(Orders.c.status==status)

  return await db.fetch_all(stmt)


async def make_self_new_order(new_order: BaseOrder) -> None:
  """Making new order actions with db"""
  stmt = Orders.inset().values(total_amount=new_order.total_amount,
                               status=new_order.status,
                               create_date=new_order.create_date,
                               payment_method=new_order.payment_method,
                               pay_date=new_order.pay_date,
                               customize_details=new_order.customize_details,
                               ordered_user_id=new_order.ordered_user_id,
                               ordered_item_id=new_order.ordered_item_id)
  
  return await execute_stmt_in_tran([stmt])


async def modify_self_spec_order(modify_order: GetOrder) -> None:
  """Modifying self specific order actions with db"""
  stmt = Orders.update().where(Orders.c.order_id == modify_order.order_id).values(total_amount=modify_order.total_amount,
                                                                                  status=modify_order.status,
                                                                                  create_date=modify_order.create_date,
                                                                                  payment_method=modify_order.payment_method,
                                                                                  pay_date=modify_order.pay_date,
                                                                                  customize_details=modify_order.customize_details,
                                                                                  ordered_user_id=modify_order.ordered_user_id,
                                                                                  ordered_item_id=modify_order.ordered_item_id)
  
  return await execute_stmt_in_tran([stmt])


async def withdraw_spec_order(order_id: int) -> None:
  """Withdrawing self specific order actions with db"""
  stmt = Orders.delete().where(Orders.c.order_id == order_id)

  return await execute_stmt_in_tran([stmt])