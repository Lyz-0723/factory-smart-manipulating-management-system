from fastapi import FastAPI
import Router
from database import db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

routers = [Router.user, Router.machine, Router.environment, Router.order, Router.item, Router.production_line, Router.production_line_records, Router.token, Router.status_and_rating]
for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.connect()


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()