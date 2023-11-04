import sqlalchemy
from sqlalchemy import Column
from database import metadata

Users = sqlalchemy.Table(
    "Users",
    metadata,
    Column("user_id", sqlalchemy.INTEGER, primary_key=True, index=True),
    Column("user_name", sqlalchemy.VARCHAR(60), nullable=False, unique=True),
    Column("password", sqlalchemy.CHAR(64), nullable=False),
    Column("company_info", sqlalchemy.VARCHAR(90), nullable=False),
    Column("contact_info", sqlalchemy.VARCHAR(90), nullable=False),
    Column("is_admin", sqlalchemy.INTEGER, nullable=False)
)
