from fastapi import APIRouter
from app.models import InfosData
from app.services import dataInfo_service

router = APIRouter()

@router.get("/GetAllDataInfo")
async def get_all_data_info():
    return await dataInfo_service.get_all_data()
