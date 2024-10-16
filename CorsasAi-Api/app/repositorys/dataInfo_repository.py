from datetime import datetime
import pandas as pd
from typing import List
from app.models import InfosData

class DataInfoRepository:

    async def carregar_data_info(self) -> List[InfosData]:
      
        df = pd.read_csv('app/repositorys/BASE_DE_DADOS_API.csv', encoding='utf-8')

        infosCsv = []
        for index, row in df.iterrows():
            try:
                # Converter a data do formato 'dd/mm/yy' para datetime
                data_convertida = datetime.strptime(row['DATA'], '%d/%m/%y').date()
                
                info_data = InfosData(
                    cpf_cnpj=row['CPF_CNPJ'],
                    nome_cliente=row['NOME_CLIENTE'],
                    risco_cliente=row['RISCO_CLIENTE'],
                    numero_contrato=int(row['NUMERO_CONTRATO']),
                    risco_contrato=row['RISCO_CONTRATO'],
                    valor_contrato=float(row['VALOR_CCONTRATO']),
                    status_contrato=row['STATUS'],
                    data=data_convertida
                )
                infosCsv.append(info_data)
            except Exception as e:
                print(f"Erro ao processar a linha {index}: {e}")

        return infosCsv

dataInfo_repository = DataInfoRepository()