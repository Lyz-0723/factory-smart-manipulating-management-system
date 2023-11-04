from fastapi import APIRouter, Depends
from typing import Annotated
from Authentication.JWTtoken import get_current_user
from Authentication.hashing import hashing_password
from Repository.UserCRUD import get_spec_user, create_new_user, modify_spec_user
from Repository.CommonCRUD import check_user

from Schema.user import BaseUser, GetUser
from exception import duplicate_data, bad_request

router = APIRouter(prefix="/user", tags=["User"])

@router.post("/")
async def create_user(user: BaseUser) -> None:
  """The endpoint of creating new user"""

  if await check_user(user.user_name):
    raise duplicate_data

  if not await create_new_user(user):
    raise bad_request


@router.get("/")
async def get_user(current_user: Annotated[GetUser, Depends(get_current_user)]) -> GetUser:
  """The endpoint of getting self user detail"""

  return await get_spec_user(current_user.user_id)


@router.patch("/")
async def modify_user(user: BaseUser, current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
  """The endpoint of modifying user detail"""

  update_data = user.model_dump(exclude_unset=True, exclude_none=True)
  if update_data.get("password"):
        update_data["password"] = hashing_password(update_data["password"])
  update = GetUser.model_validate(current_user).model_copy(update=update_data)

  if not await modify_spec_user(update):
        raise bad_request