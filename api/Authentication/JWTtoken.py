from fastapi import Depends
from datetime import timedelta, datetime
from jose import jwt, JWTError

from Repository.CommonCRUD import check_user
from Authentication.hashing import verify_password
from Authentication.OAuth2 import oauth2_token_scheme
from Authentication.config import ACCESS_TOKEN_SECRET_KEY, ALGORITHM
from exception import no_such_user, token_expired

ACCESS_TOKEN_EXPIRE_DAYS = 10


def generate_access_token(data: dict):
    """Generate access_token"""

    data["exp"] = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    token = jwt.encode(data, ACCESS_TOKEN_SECRET_KEY, algorithm=ALGORITHM)

    return token


async def get_current_user(token=Depends(oauth2_token_scheme)):
    """Get the current user's info, also used for authenticate JWT"""

    try:
        payload = jwt.decode(
            token, ACCESS_TOKEN_SECRET_KEY, algorithms=ALGORITHM)

        user = await check_user(payload["id"])

        if user:
            if verify_password(payload["password"], user.password):
                return user

        raise no_such_user

    except JWTError:
        raise token_expired