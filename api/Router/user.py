from fastapi import APIRouter, Depends
from typing import Annotated

from Schema.user import BaseUser, GetUser, CreateUser

router = APIRouter(prefix="/user", tags=["User"])

@router.patch("/")
async def get_user(user: BaseUser) -> GetUser:
  print("...")