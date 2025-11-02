"""
Pydantic models for chat/conversation
"""

from typing import List, Literal, Optional
from pydantic import BaseModel
from datetime import datetime


Role = Literal["user", "assistant"]


class ChatMessage(BaseModel):
    id: str
    role: Role
    content: str
    timestamp: datetime


class ChatRequest(BaseModel):
    user_id: str
    conversation_id: Optional[str] = None
    message: str


class ChatResponse(BaseModel):
    user_id: str
    conversation_id: str
    messages: List[ChatMessage]
    assistant_message: ChatMessage


