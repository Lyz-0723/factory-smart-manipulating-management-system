from pydantic import BaseModel

# ----- Schemas for User table -----
class BaseUser(BaseModel):
  name: str
  is_admin: int
  company_info: str
  contact_info: str

  class Config:
    from_attributes = True


class GetUser(BaseUser):
  id: int


class CreateUser(BaseUser):
  password: str


