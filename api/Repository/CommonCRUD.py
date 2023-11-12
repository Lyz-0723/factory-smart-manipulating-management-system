from Model.Users import Users
from Model.Order import Orders, Items
from Model.Environment import Environment
from Schema.user import GetUser
from Schema.order import GetOrder, BaseOrder
from Schema.item import BaseItem, GetItem
from Schema.environment import BaseEnvironmentRecord
from database import db


async def check_user(user_id: int) -> GetUser:
    """Check if the user exist"""
    stmt = Users.select().where(Users.c.user_id == user_id)
    return await db.fetch_one(stmt)


async def check_user_name(user_name: str) -> GetUser:
    """Check if the user name already been used"""
    stmt = Users.select().where(Users.c.user_name == user_name)
    return await db.fetch_one(stmt)


async def check_order_existence(order_id: int) -> GetOrder:
    """Check if the order belongs to the user"""
    stmt = Orders.select().where(Orders.c.order_id == order_id)
    return await db.fetch_one(stmt)


async def check_order_belonger(user_id: int, order_id: int):
    """Check if the order belongs to the user"""
    stmt = Orders.select().where(Orders.c.order_id == order_id)
    result = await db.fetch_one(stmt)
    return result.ordered_user_id == user_id


async def check_order_values(order: BaseOrder, type: int):
    """Check if the order values are valid. type: 0 -> create, 1 -> modify"""
    return False if (
        (order.total_amount < 100 or order.total_amount > 10000) or (order.status < 1 or order.status > 4) 
        if type == 0 
        else (order.total_amount and (order.total_amount < 100 or order.total_amount > 10000)) or (order.status and (order.status < 1 or order.status > 4))) else True


async def check_item(item_id: int) -> GetItem:
    """Check if the item with corresponding id exist"""
    stmt = Items.select().where(Items.c.item_id == item_id)
    return await db.fetch_one(stmt)


async def check_item_name(item_name: str) -> None:
    """Check if the item name already been used"""
    stmt = Items.select().where(Items.c.item_name == item_name)
    return await db.fetch_one(stmt)


async def check_item_values(item: BaseItem):
    """Check if the item values are valid"""
    return True if item.unit_price > 0 else False


async def check_env_record_values(record: BaseEnvironmentRecord):
    """Check if the record values are valid"""
    return False if record.noise <= 0 else True