from Model.ProductionLine import Production_Line_Status, Production_Line_Record_Ratings
from Model.Machine import Machine_Status
from Model.Order import Order_Status
from database import db
from Schema.status_and_rating import Status, Rating

async def get_all_production_line_status() -> list[Status]:
  """Getting all production line status acitons with db"""
  stmt = Production_Line_Status.select()

  return await db.fetch_all(stmt)


async def get_all_machine_status() -> list[Status]:
  """Getting all machine status acitons with db"""
  stmt = Machine_Status.select()

  return await db.fetch_all(stmt)


async def get_all_order_status() -> list[Status]:
  """Getting all order status acitons with db"""
  stmt = Order_Status.select()

  return await db.fetch_all(stmt)


async def get_all_production_line_record_ratings() -> list[Rating]:
  """Getting all production line record ratings actions with db"""
  stmt = Production_Line_Record_Ratings.select()

  return await  db.fetch_all(stmt)
