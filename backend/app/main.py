"""
EnviroAgent FastAPI Application

The main FastAPI application for EnviroAgent backend.
Handles AI agent orchestration, environment control, and goal management.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
from dotenv import load_dotenv

from app.config import settings
from app.api import goals, environment, agents, health, chat
from app.db import init_db
from fastapi import Depends
from fastapi import BackgroundTasks

# Load environment variables
load_dotenv()

# Create FastAPI application
app = FastAPI(
    title="EnviroAgent API",
    description="AI agent that shapes your environment for goal success",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(goals.router, prefix="/api", tags=["goals"])
app.include_router(environment.router, prefix="/api", tags=["environment"])
app.include_router(agents.router, prefix="/api", tags=["agents"])
app.include_router(chat.router, prefix="/api", tags=["chat"])

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "EnviroAgent API",
        "description": "The Agent That Shapes Your World for Success",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "path": str(request.url)
        }
    )

@app.on_event("startup")
async def on_startup():
    # Initialize database tables if needed
    await init_db()

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
