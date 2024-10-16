import hashlib
from app.models import InfosData, InfoPortal
from app.repositorys.dataInfo_repository import dataInfo_repository

class IntegrationService:

    async def get_data_integration(self):
        return await dataInfo_repository.carregar_data_info()

integration_service = IntegrationService()