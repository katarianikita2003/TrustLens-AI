from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "Welcome to TrustLens AI",
        "model": settings.MODEL_NAME,
    }


@router.get("/health")
def health():
    return {
        "status": "healthy",
        "vector_db": settings.VECTOR_DB,
        "database": settings.DATABASE_URL,
    }