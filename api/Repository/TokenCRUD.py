from Authentication import JWTtoken, hashing
from Model.Users import Users
from database import db


async def generate_access_token(data: dict) -> str | bool:
    stmt = Users.select().where(Users.c.user_name == data["name"])
    user = await db.fetch_one(stmt)

    if user:
        if hashing.verify_password(data["password"], user.password):
            data["user_id"] = user.user_id
            return JWTtoken.generate_access_token(data)

    return False


async def validate_access_token(token: str):
    await JWTtoken.get_current_user(token)