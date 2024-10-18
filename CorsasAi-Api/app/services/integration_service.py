import os
import json
from fastapi import HTTPException
from openai import OpenAI

class IntegrationService:

    async def get_data_integration(self, mensagem: str):
        print(mensagem)
        with open('../config.json', 'r') as config_file:
            config_data = json.load(config_file)
        
        token = config_data["token_gpt"]
        client = OpenAI(api_key=token)

        regras_resposta = [ 
            {'role': 'system', 'content': 'Objetivo: Você terá a tarefa de responder de duas maneiras e nada mais.'},
            {'role': 'system', 'content': 'A primeira é quando o usuário digitar um termo relacionado a palavra "BOLETO" ou sinônimo, para montar a estrutura [BOLETO].'},
            {'role': 'system', 'content': 'A Segunda é quando o usuário digitar um cpf cnpj ou número do contrato e um mês, para montar a estrutura [KEY: CPF OU CNPJ OU NUMERO DO CONTRATO IDENTIFICADO,MONTH: MÊS IDENTIFICADO].'},
            {'role': 'system', 'content': 'Relacionado a intenção de indicador se o segmento e diretoria não for especificado, a resposta deve incluir Segment: e Director:'},
            {'role': 'system', 'content': 'Relacionado a intenção da key: o Mês é obrigatório, se não possuir a resposta deve ser uma string vazia.'},
            {'role': 'system', 'content': 'Se a frase estiver fora do escopo, a resposta deve ser vazia.'},
            {'role': 'system', 'content': 'SEMPRE RESPEITE AS REGRAS'},
            {'role': 'system', 'content': '1- Caso seja uma pergunta de saudação, responda com um "Olá como posso te ajudar?"'},
            {'role': 'system', 'content': '2- Caso seja uma pergunta de despedida ou agradecimento, responda com um "Espero ter te ajudado!"'},
            {'role': 'system', 'content': '3- CASO NÃO SEJA NENHUM CASO ACIMA, RESPONDA NADA, COM UMA STRING VAZIA!'}
        ]

        mensagens = regras_resposta + [
            {'role': 'user', 'content': mensagem}
        ]

        resposta = client.chat.completions.create(
            model="gpt-4o-mini",  
            messages=mensagens
        )

        respostaGpt = resposta.choices[0].message.content
        if 'boleto' or 'BOLETO' in respostaGpt:
            return "Nada"# retorna a mensagem e o pdf 
        else: 
            return respostaGpt

integration_service = IntegrationService()