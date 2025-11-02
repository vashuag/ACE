"""
Goal-related models
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class GoalStatus(str, Enum):
    """Goal status enumeration"""
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"
    FAILED = "failed"

class GoalPriority(str, Enum):
    """Goal priority enumeration"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class GoalCreate(BaseModel):
    """Model for creating a new goal"""
    user_id: str = Field(..., description="User ID who owns the goal")
    description: str = Field(..., description="Natural language description of the goal")
    priority: GoalPriority = Field(default=GoalPriority.MEDIUM, description="Goal priority")
    deadline: Optional[datetime] = Field(None, description="Goal deadline")

class GoalUpdate(BaseModel):
    """Model for updating a goal"""
    description: Optional[str] = Field(None, description="Updated goal description")
    priority: Optional[GoalPriority] = Field(None, description="Updated priority")
    status: Optional[GoalStatus] = Field(None, description="Updated status")
    deadline: Optional[datetime] = Field(None, description="Updated deadline")

class GoalResponse(BaseModel):
    """Model for goal response"""
    id: str = Field(..., description="Unique goal ID")
    user_id: str = Field(..., description="User ID who owns the goal")
    description: str = Field(..., description="Goal description")
    structured_data: Dict[str, Any] = Field(..., description="AI-structured goal data")
    priority: GoalPriority = Field(..., description="Goal priority")
    status: GoalStatus = Field(..., description="Goal status")
    deadline: Optional[datetime] = Field(None, description="Goal deadline")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

class EnvironmentAction(BaseModel):
    """Model for environment action"""
    action_type: str = Field(..., description="Type of action (device_control, app_block, etc.)")
    target: str = Field(..., description="Target device or service")
    parameters: Dict[str, Any] = Field(..., description="Action parameters")
    priority: int = Field(default=1, description="Action priority")

class EnvironmentControl(BaseModel):
    """Model for environment control request"""
    goal_id: str = Field(..., description="Associated goal ID")
    actions: List[EnvironmentAction] = Field(..., description="List of actions to execute")
    user_consent: bool = Field(..., description="User consent for actions")

class AgentStatus(BaseModel):
    """Model for agent status"""
    agent_id: str = Field(..., description="Agent identifier")
    name: str = Field(..., description="Agent name")
    status: str = Field(..., description="Agent status")
    capabilities: List[str] = Field(..., description="Agent capabilities")
    last_active: datetime = Field(..., description="Last activity timestamp")
