from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Repository.ItemCRUD import get_all_items, get_spec_item, add_new_item, modify_spec_item, delete_spec_item
from Repository.CommonCRUD import check_item_name, check_item, check_item_values
from exception import no_such_item, action_forbidden, bad_request, duplicate_data

from Schema.user import GetUser
from Schema.item import BaseItem, GetItem

router = APIRouter(prefix="/item", tags=["Item"])

@router.get("/")
async def get_items(_: Annotated[GetUser, Depends(get_current_user)]) -> list[GetItem]:
  """The endpoint of getting all items"""
  
  return await get_all_items()


@router.get("/{item_id}")
async def get_item(item_id: int, _: Annotated[GetUser, Depends(get_current_user)]) -> GetItem:
  """The endpoint of getting specific item"""

  item = await get_spec_item(item_id)

  if not item:
    raise no_such_item
  
  return item


@router.post("/")
async def add_item(new_item: BaseItem, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of adding new item"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_item_name(new_item.item_name):
    raise duplicate_data
  
  if not await check_item_values(new_item):
    raise bad_request
  
  if not await add_new_item(new_item):
    raise bad_request


@router.patch("/")
async def modify_item(modify_item: GetItem, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of modifying item detail"""
  item = await get_spec_item(modify_item.item_id)
  if not current_user.is_admin:
    raise action_forbidden
  
  if not item:
    raise no_such_item
  
  if (modify_item.item_name and 
      not (await check_item_name(modify_item.item_name)).item_id == modify_item.item_id or 
      not await check_item_values(modify_item)):
    raise bad_request
  
  update_data = modify_item.model_dump(exclude_unset=True, exclude_none=True)
  update = GetItem.model_validate(item).model_copy(update=update_data)
  
  if not await modify_spec_item(update):
    raise bad_request


@router.delete("/{item_id}")
async def delete_item(item_id: int, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of deleting an item"""
  if not current_user.is_admin:
    raise action_forbidden
  
  if not await check_item(item_id):
    raise no_such_item
  
  if not await delete_spec_item(item_id):
    raise bad_request
