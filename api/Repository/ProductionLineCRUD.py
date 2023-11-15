from Model.ProductionLine import Production_Lines
from database import db, execute_stmt_in_tran
from Schema.pl import BasePL, GetPL

async def get_all_production_lines() -> list[GetPL]:
  """Getting all production lines actions with db"""
  stmt = Production_Lines.select()

  return await db.fetch_all(stmt)


async def get_specific_production_line(pl_id: int) -> GetPL:
  """Getting specific production line actions with db"""
  stmt = Production_Lines.select().where(Production_Lines.c.pl_id == pl_id)

  return await db.fetch_one(stmt)


async def add_production_line(new_pl: BasePL) -> None:
  """Adding new production line actions with db"""
  stmt = Production_Lines.insert().values(pl_name=new_pl.pl_name,
                                         pl_description=new_pl.pl_description,
                                         status=new_pl.status,
                                         item_id=new_pl.item_id)

  return await execute_stmt_in_tran([stmt])


async def modify_specific_production_line(modify_pl: GetPL) -> None:
  """Modifying production line actions with db"""
  stmt = Production_Lines.update().where(Production_Lines.c.pl_id == modify_pl.pl_id).values(pl_name=modify_pl.pl_name,
                                                                                          pl_description=modify_pl.pl_description,
                                                                                          status=modify_pl.status,
                                                                                          item_id=modify_pl.item_id)

  return await execute_stmt_in_tran([stmt])
  

async def delete_production_line(pl_id: int) -> None:
  """Deleting production line actions with db"""
  stmt = Production_Lines.delete().where(Production_Lines.c.pl_id == pl_id)

  return await execute_stmt_in_tran([stmt])
