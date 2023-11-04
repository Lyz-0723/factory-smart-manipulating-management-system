from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

from Repository.TokenCRUD import generate_access_token, validate_access_token
from exception import no_such_user

router = APIRouter(prefix="/token", tags=["Token"])


@router.post("/")
async def create_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> dict[str, str | bool]:
    """The endpoint of generating new access_token"""

    data = {
        "name": form_data.username,
        "password": form_data.password
    }

    token = await generate_access_token(data)

    if not token:
        raise no_such_user

    return {"access_token": token}


@router.post("/validate_access_token")
async def validate_the_access_token(token: str) -> None:
    """The endpoint of validate the access_token's availability"""

    return await validate_access_token(token)