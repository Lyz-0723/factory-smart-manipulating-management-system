from Model.Order import Items
from database import db, execute_stmt_in_tran
from Schema.item import BaseItem, GetItem

async def get_all_items() -> list[GetItem]:
  """Get all items actions with db"""
  stmt = Items.select()

  return await db.fetch_all(stmt)


async def get_spec_item(item_id: int) -> GetItem:
  """Get specific item actions with db"""
  stmt = Items.select().where(Items.c.item_id == item_id)

  return await db.fetch_one(stmt)


async def add_new_item(item: BaseItem) -> None:
  """Add new item actions with db"""
  stmt = Items.insert().values(item_name=item.item_name,
                               item_description=item.item_description,
                               unit_price=item.unit_price)
  
  return await execute_stmt_in_tran([stmt])


async def modify_spec_item(modify_item: GetItem) -> None:
  """Modify specific item actions with db"""
  stmt = Items.update().where(Items.c.item_id == modify_item.item_id).values(item_name=modify_item.item_name,
                                                                             item_description=modify_item.item_description,
                                                                             unit_price=modify_item.unit_price)
  
  return await execute_stmt_in_tran([stmt])


async def delete_spec_item(item_id: int) -> None:
  """Deleting specific item actions with db"""
  stmt = Items.delete().where(Items.c.item_id == item_id)

  return await execute_stmt_in_tran([stmt])