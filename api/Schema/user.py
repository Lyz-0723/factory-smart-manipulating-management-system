from pydantic import BaseModel

# ----- Schemas for User table -----
class BaseUser(BaseModel):
  user_name: str | None = None
  password: str | None = None
  company_info: str | None = None
  contact_info: str | None = None

  class Config:
    from_attributes = True


class GetUser(BaseUser):
  is_admin: int
  user_id: int


