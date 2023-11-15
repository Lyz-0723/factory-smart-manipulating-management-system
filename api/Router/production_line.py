from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Repository.ProductionLineCRUD import get_all_production_lines, get_specific_production_line, add_production_line, modify_specific_production_line, delete_production_line
from Repository.CommonCRUD import check_pl_values
from exception import no_such_pl, action_forbidden, bad_request

from Schema.pl import BasePL, GetPL
from Schema.user import GetUser

router = APIRouter(prefix="/pl", tags=["Production_Lines"])

@router.get("/")
async def get_pl(current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetPL]:
  """The endpoint of getting all production lines"""
  if not current_user.is_admin:
    raise action_forbidden
  
  return await get_all_production_lines()


@router.get("/{pl_id}")
async def get_spec_pl(pl_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> GetPL:
  """The endpoint of getting specific production line"""
  if not current_user.is_admin:
    raise action_forbidden
  
  pl = await get_specific_production_line(pl_id)
  if not pl:
    raise no_such_pl

  return pl


@router.post("/")
async def add_pl(new_pl: BasePL, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of adding new production line"""
  if not current_user.is_admin:
    raise action_forbidden

  if not await check_pl_values(new_pl, 0):
    raise bad_request
  
  if not await add_production_line(new_pl):
    raise bad_request


@router.patch("/")
async def modify_pl(modify_pl: GetPL, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of modifying production line"""
  pl = await get_spec_pl(modify_pl.pl_id, current_user)
  if not current_user.is_admin:
    raise action_forbidden
  
  if not pl:
    raise no_such_pl
  
  update_data = modify_pl.model_dump(exclude_unset=True, exclude_none=True)
  update = GetPL.model_validate(pl).model_copy(update=update_data)

  if not await check_pl_values(modify_pl, 1):
    raise bad_request
  
  if not await modify_specific_production_line(update):
    raise bad_request


@router.delete("/{pl_id}")
async def delete_pl(pl_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of deleting production line"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await get_spec_pl(pl_id, current_user):
    raise no_such_pl
  
  if not await delete_production_line(pl_id):
    raise bad_request
  