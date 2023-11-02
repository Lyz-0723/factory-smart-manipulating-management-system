from fastapi.security import OAuth2PasswordBearer

oauth2_token_scheme = OAuth2PasswordBearer(tokenUrl='/token')