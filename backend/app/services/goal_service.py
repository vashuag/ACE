"""
Goal service for managing user goals
"""

from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from app.models.goals import GoalCreate, GoalResponse, GoalUpdate, GoalStatus

class GoalService:
    """Service for managing user goals"""
    
    def __init__(self):
        # In a real implementation, this would connect to the database
        self.goals_db = {}  # Mock database
    
    async def create_goal(self, user_id: str, description: str, structured_data: Dict[str, Any]) -> GoalResponse:
        """Create a new goal"""
        goal_id = str(uuid.uuid4())
        now = datetime.now()
        
        goal = GoalResponse(
            id=goal_id,
            user_id=user_id,
            description=description,
            structured_data=structured_data,
            priority=structured_data.get("priority", "medium"),
            status=GoalStatus.ACTIVE,
            deadline=None,
            created_at=now,
            updated_at=now
        )
        
        self.goals_db[goal_id] = goal
        return goal
    
    async def get_user_goals(self, user_id: str) -> List[GoalResponse]:
        """Get all goals for a user"""
        user_goals = [
            goal for goal in self.goals_db.values() 
            if goal.user_id == user_id
        ]
        return sorted(user_goals, key=lambda x: x.created_at, reverse=True)
    
    async def get_goal(self, goal_id: str) -> Optional[GoalResponse]:
        """Get a specific goal by ID"""
        return self.goals_db.get(goal_id)
    
    async def update_goal(self, goal_id: str, goal_update: GoalUpdate) -> Optional[GoalResponse]:
        """Update a goal"""
        if goal_id not in self.goals_db:
            return None
        
        goal = self.goals_db[goal_id]
        
        # Update fields if provided
        if goal_update.description is not None:
            goal.description = goal_update.description
        if goal_update.priority is not None:
            goal.priority = goal_update.priority
        if goal_update.status is not None:
            goal.status = goal_update.status
        if goal_update.deadline is not None:
            goal.deadline = goal_update.deadline
        
        goal.updated_at = datetime.now()
        
        return goal
    
    async def delete_goal(self, goal_id: str) -> bool:
        """Delete a goal"""
        if goal_id in self.goals_db:
            del self.goals_db[goal_id]
            return True
        return False
    
    async def execute_environment_actions(self, goal_id: str, actions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Execute environment actions for a goal"""
        # This would integrate with the environment service
        results = []
        
        for action in actions:
            result = {
                "action_id": str(uuid.uuid4()),
                "action_type": action.get("action_type"),
                "target": action.get("target"),
                "status": "executed",
                "timestamp": datetime.now().isoformat()
            }
            results.append(result)
        
        return {
            "goal_id": goal_id,
            "actions_executed": len(results),
            "results": results
        }
