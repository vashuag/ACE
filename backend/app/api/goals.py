"""
Goals API endpoints for EnviroAgent
Handles goal creation, understanding, and management
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from app.models.goals import GoalCreate, GoalResponse, GoalUpdate
from app.services.goal_service import GoalService
from app.services.ai_service import AIService

router = APIRouter()
goal_service = GoalService()  # persist goals in-memory across requests for this process

@router.post("/goals", response_model=GoalResponse)
async def create_goal(goal_data: GoalCreate):
    """Create and understand a new goal"""
    try:
        ai_service = AIService()
        
        # Use AI to understand and structure the goal
        structured_goal = await ai_service.understand_goal(goal_data.description)
        
        # Create goal in database
        goal = await goal_service.create_goal(
            user_id=goal_data.user_id,
            description=goal_data.description,
            structured_data=structured_goal
        )
        
        return goal
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create goal: {str(e)}")

@router.get("/goals/{user_id}", response_model=List[GoalResponse])
async def get_user_goals(user_id: str):
    """Get all goals for a user"""
    try:
        goals = await goal_service.get_user_goals(user_id)
        return goals
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get goals: {str(e)}")

@router.get("/goals/{goal_id}", response_model=GoalResponse)
async def get_goal(goal_id: str):
    """Get a specific goal by ID"""
    try:
        goal = await goal_service.get_goal(goal_id)
        if not goal:
            raise HTTPException(status_code=404, detail="Goal not found")
        return goal
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get goal: {str(e)}")

@router.put("/goals/{goal_id}", response_model=GoalResponse)
async def update_goal(goal_id: str, goal_update: GoalUpdate):
    """Update a goal"""
    try:
        goal = await goal_service.update_goal(goal_id, goal_update)
        if not goal:
            raise HTTPException(status_code=404, detail="Goal not found")
        return goal
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update goal: {str(e)}")

@router.delete("/goals/{goal_id}")
async def delete_goal(goal_id: str):
    """Delete a goal"""
    try:
        success = await goal_service.delete_goal(goal_id)
        if not success:
            raise HTTPException(status_code=404, detail="Goal not found")
        return {"message": "Goal deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete goal: {str(e)}")

@router.post("/goals/{goal_id}/execute")
async def execute_goal(goal_id: str):
    """Execute environment modifications for a goal"""
    try:
        ai_service = AIService()
        
        # Get goal details
        goal = await goal_service.get_goal(goal_id)
        if not goal:
            raise HTTPException(status_code=404, detail="Goal not found")
        
        # Generate environment actions
        actions = await ai_service.generate_environment_actions(goal)
        
        # Execute actions (this would integrate with environment APIs)
        results = await goal_service.execute_environment_actions(goal_id, actions)
        
        return {
            "message": "Goal execution started",
            "actions": actions,
            "results": results
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to execute goal: {str(e)}")
