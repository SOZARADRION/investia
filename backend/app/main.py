from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="InvestIA API", version="0.1.0")


class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: Literal["investia-api"]


@app.get("/health", response_model=HealthResponse, tags=["Status"])
def health() -> HealthResponse:
    """Indica que a API responde; não verifica serviços externos."""
    return HealthResponse(status="ok", service="investia-api")
