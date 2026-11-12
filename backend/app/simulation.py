"""Cenário educativo de aportes ao fim do mês, sem dados de mercado."""

from decimal import Decimal, ROUND_HALF_UP, localcontext

from pydantic import BaseModel, ConfigDict, Field


class SimulationRequest(BaseModel):
    model_config = ConfigDict(extra="forbid", json_schema_extra={"examples": [{
        "monthly_contribution": "100.00", "months": 12, "monthly_rate_percent": "0.5"
    }]})

    monthly_contribution: Decimal = Field(
        gt=0, le=1_000_000, max_digits=9, decimal_places=2, allow_inf_nan=False
    )
    months: int = Field(strict=True, ge=1, le=600)
    monthly_rate_percent: Decimal = Field(
        ge=0, le=5, max_digits=7, decimal_places=4, allow_inf_nan=False
    )


class SimulationResponse(BaseModel):
    total_contributed: str
    hypothetical_earnings: str
    final_balance: str
    contribution_timing: str = "end_of_month"
    disclaimer: str = (
        "Cenário hipotético, sem garantia de rentabilidade. "
        "Não considera impostos, taxas ou inflação."
    )


def simulate(data: SimulationRequest) -> SimulationResponse:
    with localcontext() as context:
        context.prec = 50
        balance = Decimal(0)
        factor = 1 + data.monthly_rate_percent / 100
        for _ in range(data.months):
            balance = balance * factor + data.monthly_contribution
        contributed = data.monthly_contribution * data.months

        def money(value: Decimal) -> str:
            return format(value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP), ".2f")

        return SimulationResponse(
            total_contributed=money(contributed),
            hypothetical_earnings=money(balance - contributed),
            final_balance=money(balance),
        )
