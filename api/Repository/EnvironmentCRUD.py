from Model.Environment import Environment
from database import db, execute_stmt_in_tran
from Schema.environment import BaseEnvironmentRecord, GetEnviromentRecord

async def get_environment_record() -> list[GetEnviromentRecord]:
  """Get all environment records actions with db"""
  stmt = Environment.select()
  return await db.fetch_all(stmt)


async def get_specific_environment_record(env_record_id: int) -> GetEnviromentRecord:
  """Get specific environment record actions with db"""
  stmt = Environment.select().where(Environment.c.env_record_id == env_record_id)
  return await db.fetch_one(stmt)


async def create_environment_record(env_record: BaseEnvironmentRecord) -> None:
  """Create new environment record actions with db"""
  stmt = Environment.insert().values(temperature=env_record.temperature,
                                     humidity=env_record.humidity,
                                     pressure=env_record.pressure,
                                     vibration=env_record.vibration,
                                     chemical_concentration=env_record.chemical_concentration,
                                     noise=env_record.noise,
                                     record_time=env_record.record_time)
  return await execute_stmt_in_tran([stmt])


async def delete_specific_environment_record(env_record_id: int) -> None:
  """Delete specific environment record actions with db"""
  stmt = Environment.delete().where(Environment.c.env_record_id == env_record_id)
  return await execute_stmt_in_tran([stmt])