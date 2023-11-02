import sqlalchemy
from sqlalchemy import Column, ForeignKey
from database import metadata
from Model.ProductionLine import Production_Lines

Machine_Status = sqlalchemy.Table(
  "Machine_Status",
  metadata,
  Column("status_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("status", sqlalchemy.VARCHAR(9), nullable=False)
)


Machines = sqlalchemy.Table(
  "Machines",
  metadata,
  Column("machine_id", sqlalchemy.INTEGER, primary_key=True, nullable=False),
  Column("serial_number", sqlalchemy.VARCHAR(30), nullable=False),
  Column("machine_usage", sqlalchemy.VARCHAR(30), nullable=False),
  Column("position", sqlalchemy.INTEGER, nullable=False),
  Column("status", sqlalchemy.INTEGER, ForeignKey("Machine_Status.status_id"), nullable=False),
  Column("script", sqlalchemy.VARCHAR(120), nullable=False),
  Column("pl_id", sqlalchemy.INTEGER, ForeignKey(Production_Lines.c.pl_id), nullable=False)
)
