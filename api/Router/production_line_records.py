from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Repository.ProductionLineRecordCRUD import get_all_production_line_records, get_specific_production_line_records, add_new_production_line_record, delete_production_line_record
from Repository.CommonCRUD import check_pl_record_values, check_production_line, check_pl_record
from exception import no_such_pl, action_forbidden, bad_request, no_such_pl_record

from Schema.pl_record import BasePLRecord, GetPLRecord
from Schema.user import GetUser

router = APIRouter(prefix="/pl_record", tags=["Production_Line_Records"])

@router.get("/")
async def get_all_pl_records(current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetPLRecord]:
  """The endpoint of getting all production line records"""
  if not current_user.is_admin:
    raise action_forbidden
  
  return await get_all_production_line_records()


@router.get("/{pl_id}")
async def get_all_pl_records(pl_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetPLRecord]:
  """The endpoint of getting specific production line record"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_production_line(pl_id):
    raise no_such_pl

  return await get_specific_production_line_records(pl_id)


@router.post("/")
async def add_new_pl_record(pl_record: BasePLRecord, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of adding new production line record"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_pl_record_values(pl_record):
    raise bad_request
  
  if not await add_new_production_line_record(pl_record):
    raise bad_request


@router.delete("/{pl_record_id}")
async def delete_pl_record(pl_record_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of deleting specific production line record"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_pl_record(pl_record_id):
    raise no_such_pl_record
  
  if not await delete_production_line_record(pl_record_id):
    raise bad_request
