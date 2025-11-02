"""
Environment control API endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.models.goals import EnvironmentControl, EnvironmentAction
from app.services.environment_service import EnvironmentService

router = APIRouter()

@router.get("/environment/devices")
async def get_connected_devices():
    """Get list of connected devices and services"""
    try:
        env_service = EnvironmentService()
        devices = await env_service.get_connected_devices()
        return {"devices": devices}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get devices: {str(e)}")

@router.post("/environment/control")
async def control_environment(control_request: EnvironmentControl):
    """Execute environment control actions"""
    try:
        env_service = EnvironmentService()
        
        if not control_request.user_consent:
            raise HTTPException(status_code=400, detail="User consent required for environment control")
        
        results = await env_service.execute_actions(control_request.actions)
        
        return {
            "message": "Environment control executed",
            "results": results,
            "actions_count": len(control_request.actions)
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to control environment: {str(e)}")

@router.get("/environment/status")
async def get_environment_status():
    """Get current environment status"""
    try:
        env_service = EnvironmentService()
        status = await env_service.get_environment_status()
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get environment status: {str(e)}")

@router.post("/environment/integrations/{integration_type}")
async def add_integration(integration_type: str, config: Dict[str, Any]):
    """Add new environment integration"""
    try:
        env_service = EnvironmentService()
        result = await env_service.add_integration(integration_type, config)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add integration: {str(e)}")

@router.delete("/environment/integrations/{integration_id}")
async def remove_integration(integration_id: str):
    """Remove environment integration"""
    try:
        env_service = EnvironmentService()
        success = await env_service.remove_integration(integration_id)
        if not success:
            raise HTTPException(status_code=404, detail="Integration not found")
        return {"message": "Integration removed successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove integration: {str(e)}")
