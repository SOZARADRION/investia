# API InvestIA — C01

Primeira etapa local: FastAPI e GET /health. Não acessa Firebase, dados
pessoais ou mercado. O aplicativo ainda não chama esta API.
O status confirma apenas que o processo responde, sem testar dependências.

## Windows (PowerShell)

Abra o terminal nesta pasta. Não é preciso ativar o ambiente virtual:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-lock.txt
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Abra http://127.0.0.1:8000/health no navegador do notebook.
Resposta esperada: `{"status":"ok","service":"investia-api"}`.
Documentação interativa: http://127.0.0.1:8000/docs.
Para encerrar o servidor, pressione Ctrl+C no terminal.

O servidor usa apenas o endereço local do notebook nesta etapa. Nenhuma
hospedagem ou serviço pago é necessário. A conexão Android será outra etapa.

requirements.txt contém as dependências de execução; requirements-dev.txt
inclui testes; requirements-lock.txt registra todas as versões validadas.

Referências: [primeiros passos](https://fastapi.tiangolo.com/tutorial/first-steps/),
[testes](https://fastapi.tiangolo.com/tutorial/testing/) e
[servidor](https://fastapi.tiangolo.com/deployment/manually/).
