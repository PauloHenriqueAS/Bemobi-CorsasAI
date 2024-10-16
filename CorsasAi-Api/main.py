from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import (
    integration_router,
    dataInfo_router,
    health_router,
    dash_router,
)

app = FastAPI(
    title="CorsasAI - Api",
    description="CorsasAI-Api - Projeto Bemobi GenAI",
    version="1.0.0",
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(integration_router, prefix="/integration", tags=["Integração"])
app.include_router(dataInfo_router, prefix="/infos", tags=["Infos"])
app.include_router(dash_router, prefix="/dash", tags=["Dashboards"])
app.include_router(health_router, tags=["HealthCheck"])