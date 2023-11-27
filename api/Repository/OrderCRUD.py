from datetime import datetime

from Model.Order import Orders, Order_Status
from Schema.order import GetOrder, BaseOrder
from Schema.status_and_rating import BaseStatus
from database import db, execute_stmt_in_tran


async def get_all_orders() -> list[GetOrder]:
    """Get all orders actions with db"""
    stmt = Orders.select()
    return await db.fetch_all(stmt)


async def get_self_orders(user_id: int) -> list[GetOrder]:
    """Get all orders actions with db"""
    stmt = Orders.select().where(Orders.c.ordered_user_id == user_id)
    return await db.fetch_all(stmt)


async def get_self_spec_order(order_id: int) -> GetOrder:
    """Get self specific order actions with db"""
    stmt = Orders.select().where(Orders.c.order_id == order_id)
    return await db.fetch_one(stmt)


async def get_spec_order_status(status_id: int) -> BaseStatus:
    stmt = Order_Status.select().where(Order_Status.c.status_id == status_id)
    return await db.fetch_one(stmt)


async def get_self_spec_status_orders(user_id: int, status: int) -> list[GetOrder]:
    """Get self specific status orders actions with db"""
    stmt = Orders.select().where(Orders.c.ordered_user_id == user_id).where(Orders.c.status == status)
    return await db.fetch_all(stmt)


async def make_self_new_order(new_order: BaseOrder, user_id: int) -> bool:
    """Making new order actions with db"""
    stmt = Orders.insert().values(total_amount=new_order.total_amount,
                                  status=1,
                                  create_date=datetime.now(),
                                  payment_method=new_order.payment_method,
                                  customize_details=new_order.customize_details,
                                  ordered_user_id=user_id,
                                  ordered_item_id=new_order.ordered_item_id)

    return await execute_stmt_in_tran([stmt])


async def modify_self_spec_order(modify_order: GetOrder) -> bool:
    """Modifying self specific order actions with db"""
    stmt = Orders.update().where(Orders.c.order_id == modify_order.order_id).values(
        total_amount=modify_order.total_amount,
        status=modify_order.status,
        create_date=modify_order.create_date,
        payment_method=modify_order.payment_method,
        pay_date=modify_order.pay_date,
        customize_details=modify_order.customize_details,
        ordered_user_id=modify_order.ordered_user_id,
        ordered_item_id=modify_order.ordered_item_id)

    return await execute_stmt_in_tran([stmt])


async def withdraw_spec_order(order_id: int) -> bool:
    """Withdrawing self specific order actions with db"""
    stmt = Orders.delete().where(Orders.c.order_id == order_id)
    return await execute_stmt_in_tran([stmt])
