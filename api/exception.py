from fastapi import HTTPException, status

no_such_user = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail="Username or password incorrect.")

token_expired = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                              detail="Could not validate credentials.",
                              headers={"WWW-Authenticate": "Bearer"})

bad_request = HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Request failed.")

duplicate_data = HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                               detail="Data Duplicated.")
