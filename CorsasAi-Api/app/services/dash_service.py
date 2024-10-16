from app.models import InfosData, RiskDash, RiskDashMonth, RiskDashMonthMoney, InfoPortal
from app.repositorys.dataInfo_repository import dataInfo_repository
from itertools import groupby
from typing import List

class DashService:

   async def get_basic_info_dash(self) -> InfoPortal:
      dataInfo = await dataInfo_repository.carregar_data_info()
      groupedData = await group_by_month(dataInfo)
      ultimo_mes = groupedData[len(groupedData)]
      clientes_unicos = {cliente.cpf_cnpj for cliente in ultimo_mes}
      contratos_unicos = {cliente.numero_contrato for cliente in ultimo_mes}

      infoPortal = InfoPortal(total_aberto=0.0, total_recebido=0.0, sentimento_geral=0, contratos_ativos=len(contratos_unicos), clientes_ativos=len(clientes_unicos))

      for item in dataInfo:
         if item.status_contrato == 'Pendente':
               infoPortal.total_aberto += item.valor_contrato
               infoPortal.sentimento_geral -= 1
         else:
               infoPortal.total_recebido += item.valor_contrato
               infoPortal.sentimento_geral += 1
      
      infoPortal.total_aberto = round(infoPortal.total_aberto, 2)
      infoPortal.total_recebido = round(infoPortal.total_recebido, 2)
      
      return infoPortal
       
   async def get_dash_risk_client(self) -> RiskDash:
      datainfos = await dataInfo_repository.carregar_data_info()

      dataDash = RiskDash(qtde_baixo=0, qtde_medio=0, qtde_alto=0)
      for datainfo in datainfos:
         if datainfo.risco_cliente == 'Alto':
            dataDash.qtde_alto += 1
         if datainfo.risco_cliente == 'Médio':
            dataDash.qtde_medio += 1
         if datainfo.risco_cliente == 'Baixo':
            dataDash.qtde_baixo += 1
        
      return dataDash

   async def get_dash_risk_contract(self) -> RiskDash:
      datainfos = await dataInfo_repository.carregar_data_info()

      dataDash = RiskDash(qtde_baixo=0, qtde_medio=0, qtde_alto=0)
      for datainfo in datainfos:
         if datainfo.risco_contrato == 'Alto':
            dataDash.qtde_alto += 1
         if datainfo.risco_contrato == 'Médio':
            dataDash.qtde_medio += 1
         if datainfo.risco_contrato == 'Baixo':
            dataDash.qtde_baixo += 1
        
      return dataDash

   async def get_dash_risk_client_month(self) -> List[RiskDashMonth]:
      datainfos = await dataInfo_repository.carregar_data_info()
      dataSorted = await group_by_month(datainfos)

      dataDashComplete = []

      for month, items in dataSorted.items():
         dataDashMonth = RiskDashMonth(month=0, qtde_baixo=0, qtde_medio=0, qtde_alto=0)
         dataDashMonth.month = items[0].data.month
         for item in items:
            if item.risco_cliente == 'Alto':
               dataDashMonth.qtde_alto += 1
            if item.risco_cliente == 'Médio':
               dataDashMonth.qtde_medio += 1
            if item.risco_cliente == 'Baixo':
               dataDashMonth.qtde_baixo += 1
         dataDashComplete.append(dataDashMonth)

      return dataDashComplete

   async def get_dash_risk_contract_month(self) -> List[RiskDashMonth]:
      datainfos = await dataInfo_repository.carregar_data_info()
      dataSorted = await group_by_month(datainfos)

      dataDashComplete = []

      for month, items in dataSorted.items():
         dataDashMonth = RiskDashMonth(month=0, qtde_baixo=0, qtde_medio=0, qtde_alto=0)
         dataDashMonth.month = items[0].data.month
         for item in items:
            if item.risco_contrato == 'Alto':
               dataDashMonth.qtde_alto += 1
            if item.risco_contrato == 'Médio':
               dataDashMonth.qtde_medio += 1
            if item.risco_contrato == 'Baixo':
               dataDashMonth.qtde_baixo += 1
         dataDashComplete.append(dataDashMonth)

      return dataDashComplete

   async def get_dash_risk_money_client_month(self) -> List[RiskDashMonthMoney]:
      datainfos = await dataInfo_repository.carregar_data_info()
      dataSorted = await group_by_month(datainfos)

      dataDashComplete = []

      for month, items in dataSorted.items():
         dataDashMonth = RiskDashMonthMoney(month=0, qtde_baixo=0, qtde_medio=0, qtde_alto=0)
         dataDashMonth.month = items[0].data.month
         for item in items:
            if item.risco_cliente == 'Alto':
               dataDashMonth.qtde_alto += item.valor_contrato
            if item.risco_cliente == 'Médio':
               dataDashMonth.qtde_medio += item.valor_contrato
            if item.risco_cliente == 'Baixo':
               dataDashMonth.qtde_baixo += item.valor_contrato
         
         dataDashMonth.qtde_baixo = round(dataDashMonth.qtde_baixo, 2)
         dataDashMonth.qtde_medio = round(dataDashMonth.qtde_medio, 2)
         dataDashMonth.qtde_alto = round(dataDashMonth.qtde_alto, 2)
         dataDashComplete.append(dataDashMonth)

      return dataDashComplete

   async def get_dash_risk_money_contract_month(self) -> List[RiskDashMonthMoney]:
      datainfos = await dataInfo_repository.carregar_data_info()
      dataSorted = await group_by_month(datainfos)

      dataDashComplete = []

      for month, items in dataSorted.items():
         dataDashMonth = RiskDashMonthMoney(month=0, qtde_baixo=0, qtde_medio=0, qtde_alto=0)
         dataDashMonth.month = items[0].data.month
         for item in items:
            if item.risco_contrato == 'Alto':
               dataDashMonth.qtde_alto += item.valor_contrato
            if item.risco_contrato == 'Médio':
               dataDashMonth.qtde_medio += item.valor_contrato
            if item.risco_contrato == 'Baixo':
               dataDashMonth.qtde_baixo += item.valor_contrato
            
         dataDashMonth.qtde_baixo = round(dataDashMonth.qtde_baixo, 2)
         dataDashMonth.qtde_medio = round(dataDashMonth.qtde_medio, 2)
         dataDashMonth.qtde_alto = round(dataDashMonth.qtde_alto, 2)
         dataDashComplete.append(dataDashMonth)

      return dataDashComplete
async def group_by_month(lista: List[InfosData]):
   lista.sort(key=lambda x: x.data.month)
   grupos = groupby(lista, key=lambda x: x.data.month)
   grupos_agrupados = {mes: list(grupo) for mes, grupo in grupos}

   return grupos_agrupados

dash_service = DashService()