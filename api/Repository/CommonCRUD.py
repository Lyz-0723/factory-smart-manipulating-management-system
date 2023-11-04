from Model.Users import Users
from Schema.user import GetUser
from database import db


async def check_user(user_id: int) -> GetUser:
    stmt = Users.select().where(Users.c.user_id == user_id)
    return await db.fetch_one(stmt)