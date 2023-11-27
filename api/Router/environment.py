from typing import Annotated

from fastapi import APIRouter, Depends

from Authentication.JWTtoken import get_current_user
from Repository.CommonCRUD import check_env_record_values
from Repository.EnvironmentCRUD import get_environment_record, get_specific_environment_record, \
  create_environment_record, delete_specific_environment_record
from Schema.environment import BaseEnvironmentRecord, GetEnviromentRecord
from Schema.user import GetUser
from exception import action_forbidden, no_such_record, bad_request

router = APIRouter(prefix="/env", tags=["Environment"])


@router.get("/")
async def get_env_record(current_user: Annotated[GetUser, Depends(get_current_user)]) -> list[GetEnviromentRecord]:
    """The endpoint of getting all environment records"""
    if not current_user.is_admin:
        raise action_forbidden

    return await get_environment_record()


@router.get("/{env_record_id}")
async def get_spec_env_record(env_record_id: int,
                              current_user: Annotated[GetUser, Depends(get_current_user)]) -> GetEnviromentRecord:
    """The endpoint of getting specific environment record"""
    if not current_user.is_admin:
        raise action_forbidden

    record = await get_specific_environment_record(env_record_id)

    if not record:
        raise no_such_record

    return record


@router.post("/")
async def create_env_record(env_record: BaseEnvironmentRecord,
                            current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
    """The endpoint of making new environment record"""
    if not current_user.is_admin:
        raise action_forbidden

    if not await check_env_record_values(env_record):
        raise bad_request

    if not await create_environment_record(env_record):
        raise bad_request


@router.delete("/{env_record_id}")
async def delete_spec_env_record(env_record_id: int,
                                 current_user: Annotated[GetUser, Depends(get_current_user)]) -> None:
    """The endpoint of deleting specific environment record"""
    if not current_user.is_admin:
        raise action_forbidden

    if not await get_specific_environment_record(env_record_id):
        raise no_such_record

    if not await delete_specific_environment_record(env_record_id):
        raise bad_request
