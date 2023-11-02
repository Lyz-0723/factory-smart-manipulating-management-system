import sqlalchemy
from sqlalchemy import Column
from database import metadata

Environment = sqlalchemy.Table(
  "Environment",
  metadata,
  Column("env_record_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("temperature", sqlalchemy.FLOAT, nullable=False),
  Column("humidity", sqlalchemy.FLOAT, nullable=False),
  Column("pressure", sqlalchemy.FLOAT, nullable=False),
  Column("vibration", sqlalchemy.FLOAT, nullable=False),
  Column("chemical_concentration", sqlalchemy.FLOAT, nullable=False),
  Column("noise", sqlalchemy.INTEGER, nullable=False),
  Column("record_time", sqlalchemy.DATE, nullable=False)
)