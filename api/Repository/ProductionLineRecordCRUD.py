from Model.ProductionLine import Production_Line_Records
from database import db, execute_stmt_in_tran
from Schema.pl_record import BasePLRecord, GetPLRecord

async def get_all_production_line_records() -> list[GetPLRecord]:
  """Getting all production line records actions with db"""
  stmt = Production_Line_Records.select()

  return await db.fetch_all(stmt)


async def get_specific_production_line_records(pl_id: int) -> list[GetPLRecord]:
  """Getting all production line records from specific production line actions with db"""
  stmt = Production_Line_Records.select().where(Production_Line_Records.c.pl_id == pl_id)

  return await db.fetch_all(stmt)


async def add_new_production_line_record(pl_record: BasePLRecord) -> None:
  """Adding new production line record actions with db"""
  stmt = Production_Line_Records.insert().values(rating=pl_record.rating,
                                                 production_output=pl_record.production_output,
                                                 energy_consumption=pl_record.energy_consumption,
                                                 record_time=pl_record.record_time,
                                                 pl_id=pl_record.pl_id)
  
  return await execute_stmt_in_tran([stmt])


async def delete_production_line_record(pl_record_id: int) -> None:
  """Deleting production line record actions with db"""
  stmt = Production_Line_Records.delete().where(Production_Line_Records.c.pl_record_id == pl_record_id)

  return await execute_stmt_in_tran([stmt])