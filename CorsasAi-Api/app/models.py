from datetime import date
from typing import Optional
from pydantic import BaseModel

class InfosData(BaseModel):
    data: date
    cpf_cnpj: str
    nome_cliente: str
    risco_cliente: str
    numero_contrato: int
    risco_contrato: str
    valor_contrato: float
    status_contrato: str

class RiskDash(BaseModel):
    qtde_baixo: int = 0
    qtde_medio: int = 0
    qtde_alto: int = 0

class RiskDashMonth(BaseModel):
    month: int
    qtde_baixo: int = 0
    qtde_medio: int = 0
    qtde_alto: int = 0

class RiskDashMonthMoney(BaseModel):
    month: int
    qtde_baixo: float = 0.0
    qtde_medio: float = 0.0
    qtde_alto: float = 0.0
class InfoPortal(BaseModel):
    total_aberto: float = 0.0
    total_recebido: float = 0.0
    sentimento_geral: int = 0
    contratos_ativos: int = 0
    clientes_ativos: int = 0
