from fastapi import APIRouter
from app.models import InfosData
from app.services import integration_service

router = APIRouter()

@router.post("/GetDataIntegration")
async def get_data_integration(mensagem: str):
    return await integration_service.get_data_integration(mensagem)
