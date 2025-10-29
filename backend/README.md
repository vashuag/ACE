# EnviroAgent Python Backend

## 🚀 FastAPI Backend for AI Environment Control

This is the Python backend for EnviroAgent that handles:
- AI agent orchestration
- Environment API integrations
- Goal understanding and planning
- Real-time environment control
- Machine learning pipelines

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── models/              # Pydantic models
│   ├── api/                 # API routes
│   ├── services/            # Business logic
│   ├── agents/              # AI agent implementations
│   ├── integrations/        # External API integrations
│   └── utils/               # Utility functions
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🛠 Tech Stack

- **FastAPI**: Modern Python web framework
- **LangChain**: AI agent framework
- **CrewAI**: Multi-agent orchestration
- **PyTorch**: Machine learning models
- **PostgreSQL**: Database (shared with frontend)
- **Redis**: Caching and real-time features
- **WebSockets**: Real-time environment control

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run the server**:
   ```bash
   uvicorn app.main:app --reload
   ```

## 🔧 Features

- **Goal Understanding**: Convert natural language to structured goals
- **Environment Mapping**: Connect to smart devices and APIs
- **Adaptive Actions**: Real-time environment modifications
- **Learning Loop**: Continuous improvement based on user behavior
- **Multi-Agent System**: Specialized agents for different tasks

## 📡 API Endpoints

- `POST /api/goals` - Create and understand goals
- `GET /api/environment/devices` - List connected devices
- `POST /api/environment/control` - Control environment
- `GET /api/agents/status` - Agent status and health
- `WebSocket /ws/environment` - Real-time environment updates
