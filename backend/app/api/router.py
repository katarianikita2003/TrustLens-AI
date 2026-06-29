from fastapi import APIRouter

from app.api.endpoints import health
from app.api.endpoints import upload
from app.api.endpoints import investigation

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(upload.router)
api_router.include_router(investigation.router)