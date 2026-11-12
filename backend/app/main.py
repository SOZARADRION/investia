from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel
from app.simulation import SimulationRequest, SimulationResponse, simulate

app = FastAPI(title="InvestIA API", version="0.1.0")


class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: Literal["investia-api"]


@app.get("/health", response_model=HealthResponse, tags=["Status"])
def health() -> HealthResponse:
    """Indica que a API responde; não verifica serviços externos."""
    return HealthResponse(status="ok", service="investia-api")


@app.post("/simulations", response_model=SimulationResponse, tags=["Simulador"])
def create_simulation(data: SimulationRequest) -> SimulationResponse:
    """Calcula um cenário sem persistir os valores recebidos."""
    return simulate(data)
