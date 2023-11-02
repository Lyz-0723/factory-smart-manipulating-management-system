import sqlalchemy
from sqlalchemy import Column, ForeignKey
from database import metadata

Items = sqlalchemy.Table(
  "Items",
  metadata,
  Column("item_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("item_name", sqlalchemy.VARCHAR(50), nullable=False),
  Column("item_description", sqlalchemy.VARCHAR(60), nullable=False),
  Column("unit_price", sqlalchemy.INTEGER, nullable=False)
)

Production_Line_Status = sqlalchemy.Table(
  "Production_Line_Status",
  metadata,
  Column("status_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("status", sqlalchemy.VARCHAR(9), nullable=False)
)

Production_Lines = sqlalchemy.Table(
  "Production_Lines",
  metadata,
  Column("pl_id", sqlalchemy.INTEGER, primary_key=True, index=True),
  Column("pl_name", sqlalchemy.VARCHAR(60), nullable=False, unique=True),
  Column("pl_description", sqlalchemy.VARCHAR(60), nullable=False),
  Column("status", sqlalchemy.INTEGER, ForeignKey("Production_Line_Status.status_id"), nullable=False),
  Column("item_id", sqlalchemy.INTEGER, ForeignKey("Items.item_id"), nullable=False)
)

Production_Line_Record_Ratings = sqlalchemy.Table(
  "Production_Line_Record_Ratings",
  metadata,
  Column("rating_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("rating", sqlalchemy.VARCHAR(9), nullable=False)
)

Production_Line_Records = sqlalchemy.Table(
  "Production_Line_Records",
  metadata,
  Column("pl_record_id", sqlalchemy.INTEGER, primary_key=True, index=True),
  Column("rating", sqlalchemy.INTEGER, ForeignKey("Production_Line_Record_Ratings.rating_id"), nullable=False),
  Column("production_output", sqlalchemy.FLOAT, nullable=False),
  Column("energy_consumption", sqlalchemy.FLOAT, nullable=False),
  Column("record_time", sqlalchemy.DateTime, nullable=False),
  Column("pl_id", sqlalchemy.INTEGER, ForeignKey("Production_Lines.pl_id"), nullable=False),
)