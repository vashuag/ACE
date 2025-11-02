"""
Chat service with in-memory conversation storage
"""

from typing import Dict, List, Optional, Any
from datetime import datetime
import uuid
from app.models.chat import ChatMessage
from app.db import get_pool


class ChatService:
    """Simple in-memory chat storage per user and conversation"""

    def __init__(self) -> None:
        # user_id -> conversation_id -> List[ChatMessage]
        self._store: Dict[str, Dict[str, List[ChatMessage]]] = {}
        # user_id -> conversation_id -> metadata
        self._meta: Dict[str, Dict[str, Dict[str, Any]]] = {}

    def append_message(self, user_id: str, conversation_id: str, role: str, content: str) -> ChatMessage:
        if user_id not in self._store:
            self._store[user_id] = {}
        if conversation_id not in self._store[user_id]:
            self._store[user_id][conversation_id] = []

        message = ChatMessage(
            id=str(uuid.uuid4()),
            role=role,  # type: ignore[arg-type]
            content=content,
            timestamp=datetime.now(),
        )
        self._store[user_id][conversation_id].append(message)
        # Fire-and-forget persist (async not awaited here); API layer will persist explicitly
        return message

    def get_messages(self, user_id: str, conversation_id: str) -> List[ChatMessage]:
        return self._store.get(user_id, {}).get(conversation_id, [])

    def get_meta(self, user_id: str, conversation_id: str) -> Optional[Dict[str, Any]]:
        return self._meta.get(user_id, {}).get(conversation_id)

    def set_meta(self, user_id: str, conversation_id: str, meta: Dict[str, Any]) -> None:
        if user_id not in self._meta:
            self._meta[user_id] = {}
        self._meta[user_id][conversation_id] = meta

    # DB operations (to be called from API layer)
    async def ensure_conversation(self, user_id: str, conversation_id: str, title: str = None) -> None:
        pool = await get_pool()
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO conversations (id, user_id, title)
                VALUES ($1, $2, $3)
                ON CONFLICT (id) DO UPDATE SET updated_at = NOW()
                """,
                conversation_id, user_id, title,
            )

    async def persist_message(self, conversation_id: str, message: ChatMessage) -> None:
        pool = await get_pool()
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO messages (id, conversation_id, role, content, created_at)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (id) DO NOTHING
                """,
                message.id, conversation_id, message.role, message.content, message.timestamp,
            )

    async def persist_meta(self, conversation_id: str, initial_description: str, structured: Dict[str, Any]) -> None:
        pool = await get_pool()
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO conversation_meta (conversation_id, initial_description, structured)
                VALUES ($1, $2, $3)
                ON CONFLICT (conversation_id) DO UPDATE SET structured = EXCLUDED.structured
                """,
                conversation_id, initial_description, structured,
            )

