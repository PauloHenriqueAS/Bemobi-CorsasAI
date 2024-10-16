from fastapi import APIRouter
from app.models import InfosData
from app.services import dash_service

router = APIRouter()

@router.get("/GetBasicInfoDash")
async def get_basic_info_dash():
    return await dash_service.get_basic_info_dash()

@router.get("/GetDashRiskClient")
async def get_dash_risk_client():
    return await dash_service.get_dash_risk_client()

@router.get("/GetDashRiskContract")
async def get_dash_risk_contract():
    return await dash_service.get_dash_risk_contract()

@router.get("/GetDashRiskClientMonth")
async def get_dash_risk_client_month():
    return await dash_service.get_dash_risk_client_month()

@router.get("/GetDashRiskContractMonth")
async def get_dash_risk_contract_month():
    return await dash_service.get_dash_risk_contract_month()

@router.get("/GetDashRiskMoneyClientMonth")
async def get_dash_risk_money_client_month():
    return await dash_service.get_dash_risk_money_client_month()

@router.get("/GetDashRiskMoneyContractMonth")
async def get_dash_risk_money_contract_month():
    return await dash_service.get_dash_risk_money_contract_month()
