from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Repository.CommonCRUD import check_user, check_order_belonger, check_order_existence, check_order_values, check_item
from Repository.OrderCRUD import get_all_orders, get_self_orders, get_self_spec_order, get_self_spec_status_orders, make_self_new_order, modify_self_spec_order, withdraw_spec_order  
from exception import no_such_user, no_such_order, action_forbidden, bad_request, no_such_item

from Schema.user import GetUser
from Schema.order import BaseOrder, GetOrder

router = APIRouter(prefix="/order", tags=["Order"])

@router.get("/all")
async def get_orders(current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetOrder]:
  """The endpoint of getting self orders"""
  if not current_user.is_admin:
    raise action_forbidden
  
  return await get_all_orders()


@router.get("/")
async def get_orders(current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetOrder]:
  """The endpoint of getting self orders"""
  if not await check_user(current_user.user_id):
    raise no_such_user
  
  return await get_self_orders(current_user.user_id)


@router.get("/spec/{order_id}")
async def get_spec_order(order_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> GetOrder:
  """The endpoint of getting self specific order"""
  if not await check_order_existence(order_id):
    raise no_such_order
  
  if not await check_order_belonger(current_user.user_id, order_id):
    raise action_forbidden
  
  return await get_self_spec_order(order_id)


@router.get("/status/{order_status}")
async def get_spec_status_orders(order_status, current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetOrder]:
  """The endpoint of getting self specific status orders"""
  return await get_self_spec_status_orders(current_user.user_id, order_status)


@router.post("/")
async def make_order(new_order: BaseOrder, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of making new order"""
  if not new_order.ordered_user_id == current_user.user_id:
    raise action_forbidden
  
  if not await check_item(new_order.ordered_item_id):
    raise no_such_item
  
  if not await check_order_values(new_order, 0):
    raise bad_request
  
  if not await make_self_new_order(new_order):
    raise bad_request
  

@router.patch("/")
async def modify_order(modify_order: GetOrder, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of modifying the order"""
  order = await get_self_spec_order(modify_order.order_id)

  if (modify_order.order_id <= 0) or (order.ordered_user_id != current_user.user_id) or (modify_order.ordered_user_id != None):
    raise action_forbidden
  
  if modify_order.ordered_item_id and not await check_item(modify_order.ordered_item_id):
    raise no_such_item
  
  if not await check_order_values(modify_order, 1):
    raise bad_request
  
  update_data = modify_order.model_dump(exclude_unset=True, exclude_none=True)
  update = GetOrder.model_validate(order).model_copy(update=update_data)
  
  if not await modify_self_spec_order(update):
    raise bad_request
  

@router.delete("/{order_id}")
async def withdraw_order(order_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of withdrawing the order"""
  if not await check_order_existence(order_id):
    raise no_such_order
  
  if not await check_order_belonger(current_user.user_id, order_id):
    raise action_forbidden
  
  if not await withdraw_spec_order(order_id):
    raise bad_request