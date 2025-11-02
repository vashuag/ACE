"""
Chat API endpoints: single endpoint to send a user message and get assistant reply
"""

from fastapi import APIRouter, HTTPException
from app.models.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService
from app.services.ai_service import AIService
import uuid


router = APIRouter()
chat_service = ChatService()
ai_service = AIService()


@router.post("/chat/send", response_model=ChatResponse)
async def chat_send(req: ChatRequest):
    try:
        conversation_id = req.conversation_id or str(uuid.uuid4())

        # Ensure conversation row exists
        await chat_service.ensure_conversation(req.user_id, conversation_id)

        # Append user message (memory + DB)
        user_msg = chat_service.append_message(req.user_id, conversation_id, "user", req.message)
        await chat_service.persist_message(conversation_id, user_msg)

        # One conversation == one goal. If no meta yet, set it from first message.
        meta = chat_service.get_meta(req.user_id, conversation_id)
        if meta is None:
            structured = await ai_service.understand_goal(req.message)
            chat_service.set_meta(req.user_id, conversation_id, {
                "initial_description": req.message,
                "structured": structured,
            })
            await chat_service.persist_meta(conversation_id, req.message, structured)
        else:
            structured = meta.get("structured", {})

        # Propose steps based on the fixed goal context; allow message to steer focus
        plan = await ai_service.propose_concrete_steps(req.message, structured)

        # Build assistant reply
        steps_str = "\n".join([f"- {s}" for s in plan.get("steps", [])]) or "(no steps)"
        autos = plan.get("automations", [])
        autos_str = "\n".join([
            f"- {a.get('name','Automation')} [{a.get('action_type')} -> {a.get('target')}]" for a in autos
        ]) or "(no automations)"

        # Build header using the fixed goal context
        header = (
            f"Goal type: {structured.get('goal_type')} | "
            f"Priority: {structured.get('priority')} | "
            f"Timeframe: {structured.get('time_frame')}"
        )

        reply_text = (
            f"{header}\n\n"
            f"Suggested plan:\n{steps_str}\n\n"
            f"Proposed automations:\n{autos_str}"
        )

        assistant_msg = chat_service.append_message(req.user_id, conversation_id, "assistant", reply_text)
        await chat_service.persist_message(conversation_id, assistant_msg)

        return ChatResponse(
            user_id=req.user_id,
            conversation_id=conversation_id,
            messages=chat_service.get_messages(req.user_id, conversation_id),
            assistant_message=assistant_msg,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")


