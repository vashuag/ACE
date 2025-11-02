"""
Health check endpoints for EnviroAgent API
"""

from fastapi import APIRouter, Depends
from app.models.health import HealthResponse, ServiceStatus
from app.services.health_service import HealthService

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Basic health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="EnviroAgent API is running",
        version="1.0.0"
    )

@router.get("/health/detailed", response_model=dict)
async def detailed_health_check():
    """Detailed health check with service status"""
    health_service = HealthService()
    
    return {
        "status": "healthy",
        "message": "EnviroAgent API detailed health check",
        "version": "1.0.0",
        "services": {
            "database": await health_service.check_database(),
            "redis": await health_service.check_redis(),
            "openai": await health_service.check_openai(),
            "environment_apis": await health_service.check_environment_apis()
        },
        "timestamp": health_service.get_timestamp()
    }
