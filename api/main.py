from fastapi import FastAPI
import Router
from database import db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(Router.user)
app.include_router(Router.machine)
app.include_router(Router.environment)
app.include_router(Router.order)
app.include_router(Router.item)
# app.include_router(Router.production_line)
app.include_router(Router.token)

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