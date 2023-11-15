from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Repository.MachineCRUD import get_all_machines_in_production_line, get_specific_machine, add_new_machine, modify_specific_machine, delete_specific_machine
from Repository.CommonCRUD import check_machine, check_machine_values
from Repository.ProductionLineCRUD import get_specific_production_line
from exception import no_such_pl, no_such_machine, action_forbidden, bad_request

from Schema.machine import BaseMachine, GetMachine
from Schema.user import GetUser

router = APIRouter(prefix="/machine", tags=["Machine"])

@router.get("/pl/{pl_id}")
async def get_all_machines_in_pl(pl_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetMachine]:
  """The endpoint of getting all machines in a production line"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await get_specific_production_line(pl_id):
    raise no_such_pl

  return await get_all_machines_in_production_line(pl_id)


@router.get("/{machine_id}")
async def get_spec_machine(machine_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> GetMachine:
  """The endpoint of getting specific machine"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_machine(machine_id):
    raise no_such_machine
  
  return await get_specific_machine(machine_id)


@router.post("/")
async def add_machine(new_machine: BaseMachine, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of adding new machine"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_machine_values(new_machine, 0):
    raise bad_request
  
  if not await add_new_machine(new_machine):
    raise bad_request


@router.patch("/")
async def modify_spec_machine(modify_machine: GetMachine, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of modifying machine"""
  machine = await get_spec_machine(modify_machine.machine_id, current_user)
  if not current_user.is_admin:
    raise action_forbidden
  
  if not machine:
    raise no_such_machine
  
  update_data = modify_machine.model_dump(exclude_unset=True, exclude_none=True)
  update = GetMachine.model_validate(machine).model_copy(update=update_data)
  
  if not await check_machine_values(modify_machine, 1):
    raise bad_request
  
  if not await modify_specific_machine(update):
    raise bad_request


@router.delete("/{machine_id}")
async def delete_spec_machine(machine_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of deleting a machine"""
  if not current_user.is_admin:
    raise action_forbidden

  if not await check_machine(machine_id):
    raise no_such_machine
  
  if not await delete_specific_machine(machine_id):
    raise bad_request
  