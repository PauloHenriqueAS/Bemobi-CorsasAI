# CorsasAI - API

<p align="center">
<img src="https://img.shields.io/badge/STATUS-EM DESENVOLVIMENTO-green"/>
</p>


## ⚙️ Tecnologias Utilizadas

<div align="center">
    <div style="display: inline_block"><br>
        <img align="center" alt="FastAPI" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg">
         <img align="center" alt="Json" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg">
          <img align="center" alt="Swagger" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg">
    </div>
</div>

## 🗒️ Descrição do Portal 

1. HealthCheck da API.
2. Métodos de Dashboard.
3. Métodos de Informações da Base
4. Métodos de Integração

## ⚠️ Comandos Importantes

- Executar a API usando Uvicorn:
- Para iniciar a API localmente com Uvicorn, utilize o seguinte comando no terminal:
- Isso ativará o modo de recarregamento automático, ideal para desenvolvimento, onde a aplicação será recarregada sempre que houver mudanças no código.
  
```
    uvicorn main:app --reload
```

  
- Acessar a documentação Swagger:
- A documentação interativa da API estará disponível automaticamente via Swagger. Para acessá-la, basta adicionar /docs ao final da URL padrão do Uvicorn:
  
```
    http://127.0.0.1:8000/docs
```

- Execução da API em modo de depuração no [Visual Studio Code](https://code.visualstudio.com/)
- Para rodar a API em modo de depuração (debug) no Visual Studio Code, utilize o seguinte comando no terminal do VSCode. Esse comando conecta o debugger ao Uvicorn, facilitando o rastreamento de erros durante o desenvolvimento:
  
```
 c:; cd 'c:\Users\NomeUser\Desktop\Projetos\CorsasApi'; & 'c:\Python311\python.exe' 'c:\Users\NomeUser\.vscode\extensions\ms-python.debugpy-2024.10.0-win32-x64\bundled\libs\debugpy\adapter/../..\debugpy\launcher' '58635' '--' '-m' 'uvicorn' 'main:app' '--reload' 
```

- Download das Bibliotecas
  
```
    pip install -r .\requirements.txt
```

<div align="center">
    <h1> 🏗️ Padrões de Commits </h1>

| Tag | Descrição |
| --- | --- |
| FIX | Correções de bug localizados sendo  Hotfix ou Bugfix |
| FEAT | Inicio de implementação de funcionalidade/task |
| CHORE | Desenvolvimento de funcionalidade/task  |
| DONE | Finalização do desenvolvimento de funcionalidade/task |
| REFACTOR | Refatoração do código ou formatação |
| MERGE | Realização de merge e correções de conflitos do mesmo  |
| TEST | Implementação/Execução de testes |
| BUILD | Correções/ajustes/criação de build ou projeto base |
| RELEASE | Liberação de fontes |
| SYNC | Sincronização de modificações liberadas |

</div>

<hr>

<div align="center">
    <h1> 🚀 Participantes do projeto </h1>

| [<img src="https://avatars.githubusercontent.com/u/65378419?v=4" width="100"><br><sub>@PauloHenriqueAS</sub>](https://github.com/PauloHenriqueAS) | [<img src="https://avatars.githubusercontent.com/u/70163650?v=4" width="100"><br><sub>@zGummy</sub>](https://github.com/zGummy) | [<img src="https://avatars.githubusercontent.com/u/62945890?v=4" width="100"><br><sub>@newGabriel</sub>](https://github.com/newGabriel) | [<img src="https://avatars.githubusercontent.com/u/96802764?v=4" width="100"><br><sub>@Pedro-Pires</sub>](https://github.com/Pedro-Pires) |
| ------------ | ------------ | ------------ | ------------ |

</div>