from Model.Users import Users
from database import db, execute_stmt_in_tran
from Schema.user import GetUser, BaseUser
from Authentication.hashing import hashing_password

async def get_all_users() -> list[GetUser]:
  """Get all users actions with db"""
  stmt = Users.select()

  return await db.fetch_all(stmt)


async def create_new_user(user: BaseUser):
  """Create new user actions with db"""
  stmt = Users.insert().values(user_name=user.user_name,
                               password=hashing_password(user.password),
                               company_info=user.company_info,
                               contact_info=user.contact_info,
                               is_admin=0
                              )
  return await execute_stmt_in_tran([stmt])


async def get_spec_user(user_id: int):
  """Get self user detail actions with db"""
  stmt = Users.select().where(Users.c.user_id == user_id)
  return await db.fetch_one(stmt)


async def modify_spec_user(user: GetUser):
  """Modify user detial actions with db"""

  stmt = Users.update().where(Users.c.user_id == user.user_id).values(user_name=user.user_name,
                                                                      password=user.password,
                                                                      company_info=user.company_info,
                                                                      contact_info=user.contact_info,
                                                                      )
  return await execute_stmt_in_tran([stmt])