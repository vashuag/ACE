"""
Agent management API endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.goals import AgentStatus
from app.services.agent_service import AgentService

router = APIRouter()

@router.get("/agents", response_model=List[AgentStatus])
async def get_agents():
    """Get all available agents"""
    try:
        agent_service = AgentService()
        agents = await agent_service.get_all_agents()
        return agents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agents: {str(e)}")

@router.get("/agents/{agent_id}", response_model=AgentStatus)
async def get_agent(agent_id: str):
    """Get specific agent by ID"""
    try:
        agent_service = AgentService()
        agent = await agent_service.get_agent(agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        return agent
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agent: {str(e)}")

@router.post("/agents/{agent_id}/start")
async def start_agent(agent_id: str):
    """Start a specific agent"""
    try:
        agent_service = AgentService()
        success = await agent_service.start_agent(agent_id)
        if not success:
            raise HTTPException(status_code=404, detail="Agent not found")
        return {"message": f"Agent {agent_id} started successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to start agent: {str(e)}")

@router.post("/agents/{agent_id}/stop")
async def stop_agent(agent_id: str):
    """Stop a specific agent"""
    try:
        agent_service = AgentService()
        success = await agent_service.stop_agent(agent_id)
        if not success:
            raise HTTPException(status_code=404, detail="Agent not found")
        return {"message": f"Agent {agent_id} stopped successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to stop agent: {str(e)}")

@router.get("/agents/{agent_id}/logs")
async def get_agent_logs(agent_id: str, limit: int = 100):
    """Get agent logs"""
    try:
        agent_service = AgentService()
        logs = await agent_service.get_agent_logs(agent_id, limit)
        return {"logs": logs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get agent logs: {str(e)}")
