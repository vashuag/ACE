"""
Health check models
"""

from pydantic import BaseModel
from typing import Optional, Dict, Any

class HealthResponse(BaseModel):
    """Model for health check response"""
    status: str
    message: str
    version: str

class ServiceStatus(BaseModel):
    """Model for individual service status"""
    name: str
    status: str
    response_time: Optional[float] = None
    error: Optional[str] = None
