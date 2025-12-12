"""
Health Check API
"""
from fastapi import APIRouter
from app.config import settings

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION
    }


@router.get("/health/ready")
async def readiness_check():
    """
    Readiness check - verifies all dependencies are available
    """
    # TODO: Add database and external service checks
    return {
        "status": "ready",
        "gemini_model": settings.GEMINI_MODEL,
        "services": {
            "api": True,
            "gemini": True,  # Will be checked in generate service
        }
    }

