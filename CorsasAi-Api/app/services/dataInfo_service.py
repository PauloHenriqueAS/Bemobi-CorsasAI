import hashlib
from app.models import InfosData, InfoPortal
from app.repositorys.dataInfo_repository import dataInfo_repository

class DataInfoService:

    async def get_all_data(self):
        return await dataInfo_repository.carregar_data_info()

dataInfo_service = DataInfoService()