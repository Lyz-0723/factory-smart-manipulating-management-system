from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Repository.StatusAndRatingCRUD import get_all_production_line_status, get_all_machine_status, get_all_order_status, get_all_production_line_record_ratings

from Schema.user import GetUser
from Schema.status_and_rating import Status, Rating

router = APIRouter(prefix="/status_and_rating", tags=["Status_And_Rating"])

@router.get("/production_line_status")
async def get_pl_status(_: Annotated[GetUser, Depends(get_current_user)]) -> list[Status]:
  """The endpoint of getting all production line status"""

  return await get_all_production_line_status()


@router.get("/machine_status")
async def get_machine_status(_: Annotated[GetUser, Depends(get_current_user)]) -> list[Status]:
  """The endpoint of getting all machine status"""

  return await get_all_machine_status()


@router.get("/order_status")
async def get_order_status(_: Annotated[GetUser, Depends(get_current_user)]) -> list[Status]:
  """The endpoint of getting all order status"""

  return await get_all_order_status()


@router.get("/production_line_record_ratings")
async def get_order_status(_: Annotated[GetUser, Depends(get_current_user)]) -> list[Rating]:
  """The endpoint of getting all production line record ratings"""

  return await get_all_production_line_record_ratings()
