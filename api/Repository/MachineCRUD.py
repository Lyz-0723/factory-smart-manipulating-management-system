from Model.Machine import Machines
from database import db, execute_stmt_in_tran
from Schema.machine import BaseMachine, GetMachine

async def get_all_machines_in_production_line(pl_id: int) -> list[GetMachine]:
  """Getting all machines in production line actions with db"""
  stmt = Machines.select().where(Machines.c.pl_id == pl_id)

  return await db.fetch_all(stmt)


async def get_specific_machine(machine_id: int) -> GetMachine:
  """Get specific machine actions with db"""
  stmt = Machines.select().where(Machines.c.machine_id == machine_id)

  return await db.fetch_one(stmt)


async def add_new_machine(new_machine: BaseMachine) -> None:
  """Adding new machine actions with db"""
  stmt = Machines.insert().values(serial_number=new_machine.serial_number,
                                  machine_usage=new_machine.machine_usage,
                                  position=new_machine.position,
                                  status=new_machine.status,
                                  script=new_machine.script,
                                  pl_id=new_machine.pl_id)
  
  return await execute_stmt_in_tran([stmt])


async def modify_specific_machine(modify_machine: GetMachine) -> None:
  """Modifying specific machine actions with db"""
  stmt = Machines.update().where(Machines.c.machine_id == modify_machine.machine_id).values(serial_number=modify_machine.serial_number,
                                                                                            machine_usage=modify_machine.machine_usage,
                                                                                            position=modify_machine.position,
                                                                                            status=modify_machine.status,
                                                                                            script=modify_machine.script,
                                                                                            pl_id=modify_machine.pl_id)
  
  return await execute_stmt_in_tran([stmt])


async def delete_specific_machine(machine_id: int) -> None:
  """Deleting specific machine actions with db"""
  stmt = Machines.delete().where(Machines.c.machine_id == machine_id)

  return await execute_stmt_in_tran([stmt])
