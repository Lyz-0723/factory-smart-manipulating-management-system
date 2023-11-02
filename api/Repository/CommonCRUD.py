from Model.User import User
from Schema.user import GetUser
from database import db


async def check_user(user_id: int) -> GetUser:
    stmt = User.select().where(User.c.user_id == user_id)
    return await db.fetch_one(stmt)