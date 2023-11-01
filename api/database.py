from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import MetaData
from sqlalchemy.sql.elements import ClauseElement
from sshtunnel import SSHTunnelForwarder
import databases
import config

# In case someday the API and the database are in different server
server = SSHTunnelForwarder(
    ('122.116.20.182', 22),
    ssh_username=config.ssh_username,
    ssh_password=config.ssh_password,
    remote_bind_address=('localhost', 3306)
)

server.start()
DATABASE_URL = f"mysql+asyncmy://fsmmsRoot:{config.db_password}@localhost:{str(server.local_bind_port)}/fsmms"

db = databases.Database(DATABASE_URL)

metadata = MetaData()
engine = create_async_engine(DATABASE_URL)


async def execute_stmt_in_tran(stmt_list: list[ClauseElement]) -> bool:
    tran = db.transaction()

    try:
        await tran.start()
        for stmt in stmt_list:
            await db.execute(stmt)
        await tran.commit()
        return True

    except:
        await tran.rollback()
        return False