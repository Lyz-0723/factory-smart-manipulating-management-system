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

no_such_order = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                              detail="Order does not exist.")

action_forbidden = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                 detail="The action is forbidden.")

no_such_item = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                             detail="Item does not exist.")

no_such_record = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                               detail="Record does not exist.")

no_such_pl = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                               detail="Production line does not exist.")

no_such_pl_record = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                               detail="Production line record does not exist.")


no_such_machine = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                               detail="Machine does not exist.")