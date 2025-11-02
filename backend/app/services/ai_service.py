"""
AI service for goal understanding and environment control
"""

from typing import Dict, Any, List
from app.config import settings
import json
import os

try:
    from openai import OpenAI  # type: ignore
    _HAS_OPENAI = True
except Exception:
    _HAS_OPENAI = False

class AIService:
    """Service for AI-powered goal understanding and environment control"""
    
    async def understand_goal(self, description: str) -> Dict[str, Any]:
        """Convert natural language goal into structured data"""
        # If OpenAI is configured, attempt a lightweight classification
        if _HAS_OPENAI and os.getenv("OPENAI_API_KEY"):
            try:
                client = OpenAI()
                prompt = (
                    "Classify the user's goal. Return compact JSON with keys: "
                    "goal_type, priority (high|medium|low), time_frame, environment_requirements (array), "
                    "success_metrics (array), estimated_difficulty (easy|medium|hard).\n\n"
                    f"Goal: {description}"
                )
                resp = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.2,
                )
                text = resp.choices[0].message.content or "{}"
                data = json.loads(text)
                # Basic validation with fallbacks
                return {
                    "goal_type": data.get("goal_type", self._classify_goal_type(description)),
                    "priority": data.get("priority", self._extract_priority(description)),
                    "time_frame": data.get("time_frame", self._extract_timeframe(description)),
                    "environment_requirements": data.get("environment_requirements", self._identify_environment_needs(description)),
                    "success_metrics": data.get("success_metrics", self._define_success_metrics(description)),
                    "estimated_difficulty": data.get("estimated_difficulty", self._assess_difficulty(description)),
                }
            except Exception:
                # fall back to heuristic below
                pass
        
        structured_goal = {
            "goal_type": self._classify_goal_type(description),
            "priority": self._extract_priority(description),
            "time_frame": self._extract_timeframe(description),
            "environment_requirements": self._identify_environment_needs(description),
            "success_metrics": self._define_success_metrics(description),
            "estimated_difficulty": self._assess_difficulty(description)
        }
        
        return structured_goal
    
    async def generate_environment_actions(self, goal: Any) -> List[Dict[str, Any]]:
        """Generate environment control actions for a goal"""
        # Supports either a dict with fields or a GoalResponse with structured_data
        actions: List[Dict[str, Any]] = []

        # Extract goal_type from structured_data when goal is an object
        goal_type = "general"
        try:
            if isinstance(goal, dict):
                goal_type = goal.get("goal_type", "general")
            else:
                data = getattr(goal, "structured_data", None)
                if isinstance(data, dict):
                    goal_type = data.get("goal_type", "general")
        except Exception:
            goal_type = "general"
        
        if goal_type == "fitness":
            actions = [
                {
                    "action_type": "device_control",
                    "target": "smart_lights",
                    "parameters": {"brightness": 100, "color": "blue"},
                    "description": "Brighten lights for morning workout"
                },
                {
                    "action_type": "app_control",
                    "target": "fitness_app",
                    "parameters": {"open": True, "track_workout": True},
                    "description": "Open fitness tracking app"
                }
            ]
        elif goal_type == "focus":
            actions = [
                {
                    "action_type": "app_block",
                    "target": "social_media",
                    "parameters": {"duration": 60, "block": True},
                    "description": "Block distracting apps for focus session"
                },
                {
                    "action_type": "device_control",
                    "target": "smart_lights",
                    "parameters": {"brightness": 80, "color": "warm"},
                    "description": "Set optimal lighting for focus"
                }
            ]
        
        return actions

    async def propose_concrete_steps(self, description: str, structured: Dict[str, Any]) -> Dict[str, Any]:
        """Return a concrete step-by-step plan and optional automations for the goal.

        Response format:
        {
          "steps": ["...", "..."],
          "automations": [
             {"name": "Focus Session", "action_type": "app_block", "target": "social_media", "parameters": {...}}
          ]
        }
        """
        if _HAS_OPENAI and os.getenv("OPENAI_API_KEY"):
            try:
                client = OpenAI()
                sys = (
                    "You generate concise, actionable plans. "
                    "Return compact JSON with keys: steps (array of strings), automations (array of objects). "
                    "Automations should be optional and map to action_type/target/parameters."
                )
                user = (
                    "Goal Description: " + description + "\n" +
                    "Structured: " + json.dumps(structured)
                )
                resp = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": sys},
                        {"role": "user", "content": user},
                    ],
                    temperature=0.3,
                )
                text = resp.choices[0].message.content or "{}"
                data = json.loads(text)
                return {
                    "steps": data.get("steps", []),
                    "automations": data.get("automations", []),
                }
            except Exception:
                pass

        # Heuristic fallback by goal_type
        goal_type = structured.get("goal_type", "general")
        if goal_type == "fitness":
            return {
                "steps": [
                    "Define target weight and timeframe.",
                    "Set daily calorie surplus and protein goal.",
                    "Schedule 3x/week strength training.",
                    "Track meals and weekly progress in an app.",
                ],
                "automations": [
                    {
                        "name": "Open Fitness App",
                        "action_type": "app_control",
                        "target": "fitness_app",
                        "parameters": {"open": True},
                    }
                ],
            }
        if goal_type == "focus":
            return {
                "steps": [
                    "Define a 50-minute focus session objective.",
                    "Silence phone and close distracting tabs.",
                    "Start a 50/10 Pomodoro cycle.",
                    "Log outcomes and blockers after session.",
                ],
                "automations": [
                    {
                        "name": "Block Social Apps 60m",
                        "action_type": "app_block",
                        "target": "social_media",
                        "parameters": {"duration": 60, "block": True},
                    }
                ],
            }
        if goal_type == "sleep":
            return {
                "steps": [
                    "Set fixed bedtime and wake time.",
                    "Avoid screens 60 minutes before bed.",
                    "Create a wind-down routine (reading, dim lights).",
                    "Track sleep quality and adjust.",
                ],
                "automations": [
                    {
                        "name": "Dim Lights",
                        "action_type": "device_control",
                        "target": "smart_lights",
                        "parameters": {"brightness": 30, "color": "warm"},
                    }
                ],
            }

        # General
        return {
            "steps": [
                "Clarify desired outcome and measurable success.",
                "Break into weekly milestones and daily tasks.",
                "Allocate time on calendar and set reminders.",
                "Review weekly and iterate on the plan.",
            ],
            "automations": [],
        }
    
    def _classify_goal_type(self, description: str) -> str:
        """Classify the type of goal"""
        description_lower = description.lower()
        
        if any(word in description_lower for word in ["fitness", "exercise", "workout", "gym"]):
            return "fitness"
        elif any(word in description_lower for word in ["focus", "concentration", "work", "study"]):
            return "focus"
        elif any(word in description_lower for word in ["sleep", "rest", "bedtime"]):
            return "sleep"
        elif any(word in description_lower for word in ["learn", "study", "education"]):
            return "learning"
        else:
            return "general"
    
    def _extract_priority(self, description: str) -> str:
        """Extract priority level from description"""
        description_lower = description.lower()
        
        if any(word in description_lower for word in ["urgent", "important", "critical"]):
            return "high"
        elif any(word in description_lower for word in ["soon", "quickly", "fast"]):
            return "medium"
        else:
            return "low"
    
    def _extract_timeframe(self, description: str) -> str:
        """Extract timeframe from description"""
        description_lower = description.lower()
        
        if any(word in description_lower for word in ["daily", "every day", "routine"]):
            return "daily"
        elif any(word in description_lower for word in ["weekly", "week", "monthly"]):
            return "weekly"
        elif any(word in description_lower for word in ["long term", "yearly", "annual"]):
            return "long_term"
        else:
            return "flexible"
    
    def _identify_environment_needs(self, description: str) -> List[str]:
        """Identify what environment modifications are needed"""
        needs = []
        description_lower = description.lower()
        
        if any(word in description_lower for word in ["morning", "wake up", "early"]):
            needs.append("lighting_control")
        if any(word in description_lower for word in ["focus", "concentration", "quiet"]):
            needs.append("noise_control")
        if any(word in description_lower for word in ["exercise", "fitness", "workout"]):
            needs.append("space_preparation")
        if any(word in description_lower for word in ["sleep", "rest", "bedtime"]):
            needs.append("sleep_environment")
        
        return needs
    
    def _define_success_metrics(self, description: str) -> List[str]:
        """Define how to measure success"""
        return ["completion_rate", "consistency", "user_satisfaction"]
    
    def _assess_difficulty(self, description: str) -> str:
        """Assess goal difficulty"""
        description_lower = description.lower()
        
        if any(word in description_lower for word in ["simple", "easy", "basic"]):
            return "easy"
        elif any(word in description_lower for word in ["complex", "difficult", "challenging"]):
            return "hard"
        else:
            return "medium"
