from Model.Users import Users
from Model.Order import Orders, Items
from Model.ProductionLine import Production_Lines
from Model.Machine import Machines
from Schema.user import GetUser
from Schema.order import GetOrder, BaseOrder
from Schema.item import BaseItem, GetItem
from Schema.environment import BaseEnvironmentRecord
from Schema.pl import BasePL, GetPL
from Schema.machine import BaseMachine
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


async def check_production_line(pl_id: int):
    """Check if the production line exist"""
    stmt = Production_Lines.select().where(Production_Lines.c.pl_id == pl_id)
    return await db.fetch_one(stmt)


async def check_machine(machine_id: int):
    """Check if the machine exist"""
    stmt = Machines.select().where(Machines.c.machine_id == machine_id)
    return await db.fetch_one(stmt)


async def check_machine_values(machine: dict, type: int):
    """Check if the machine data is valid. type: 0 -> create, 1 -> modify"""    
    stmt = Machines.select().where(Machines.c.serial_number == machine.serial_number)
    if (type == 0 and (await db.fetch_one(stmt))) or (type == 1 and (await db.fetch_one(stmt)) and
                                                     (await db.fetch_one(stmt)).serial_number and 
                                                     machine.machine_id != (await db.fetch_one(stmt)).machine_id):
        return False
    
    if machine.status and (machine.status < 1 or machine.status > 4 or not await check_production_line(machine.pl_id)):
        return False

    stmt = Machines.select().where(Machines.c.pl_id == machine.pl_id)
    machines = await db.fetch_all(stmt)
    for m in machines:
        if m.position == machine.position:
            return False
        
    return True


async def check_pl_values(pl: dict, type: int):
    """Check if the production line data is valid. type: 0 -> create, 1 -> modify"""    
    stmt = Production_Lines.select().where(Production_Lines.c.pl_name == pl.pl_name)
    if (type == 0 and (await db.fetch_one(stmt))) or (type == 1 and (await db.fetch_one(stmt)) and
                                                     (await db.fetch_one(stmt)).pl_name and 
                                                     pl.pl_id != (await db.fetch_one(stmt)).pl_id):
        return False
    
    if pl.item_id and not await check_item(pl.item_id):
        return False
    
    if pl.status and (pl.status != 1 and pl.status != 2) or type == 1 and (not await check_production_line(pl.pl_id)):
        return False
        
    return True