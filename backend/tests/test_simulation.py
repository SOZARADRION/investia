from decimal import Decimal

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.simulation import SimulationRequest, simulate

client = TestClient(app)
VALID = {"monthly_contribution": "100.00", "months": 12, "monthly_rate_percent": "0.5"}


@pytest.mark.parametrize("months,rate,balance,earnings", [
    (1, "5", "100.00", "0.00"),
    (12, "0", "1200.00", "0.00"),
    (2, "1", "201.00", "1.00"),
    (3, "1", "303.01", "3.01"),
    (12, "0.5", "1233.56", "33.56"),
])
def test_known_scenarios(months, rate, balance, earnings):
    result = simulate(SimulationRequest(**{**VALID, "months": months, "monthly_rate_percent": rate}))
    assert result.final_balance == balance
    assert result.hypothetical_earnings == earnings
    assert Decimal(result.total_contributed) == 100 * months


def test_round_half_up_at_final_output():
    result = simulate(SimulationRequest(monthly_contribution="1.00", months=2, monthly_rate_percent="0.5"))
    assert result.final_balance == "2.01"
    assert result.hypothetical_earnings == "0.01"


def test_api_contract_and_no_monthly_rounding():
    response = client.post("/simulations", json={**VALID, "monthly_contribution": "1.00", "months": 3})
    assert response.status_code == 200
    result = response.json()
    assert result["final_balance"] == "3.02"
    assert result["total_contributed"] == "3.00"
    assert result["contribution_timing"] == "end_of_month"
    assert "hipotético" in result["disclaimer"]


@pytest.mark.parametrize("field,value", [
    ("monthly_contribution", "0"), ("monthly_contribution", "-1"),
    ("monthly_contribution", "1000000.01"), ("monthly_contribution", "1.001"),
    ("monthly_contribution", "NaN"), ("monthly_contribution", "Infinity"),
    ("monthly_contribution", True), ("monthly_contribution", "abc"),
    ("monthly_contribution", "1,50"), ("monthly_contribution", None),
    ("months", 0), ("months", -1), ("months", 601),
    ("months", 1.5), ("months", True), ("months", "12"),
    ("monthly_rate_percent", "-0.1"), ("monthly_rate_percent", "5.0001"),
    ("monthly_rate_percent", "0.00001"), ("monthly_rate_percent", "NaN"),
])
def test_invalid_inputs(field, value):
    assert client.post("/simulations", json={**VALID, field: value}).status_code == 422


def test_missing_and_extra_fields():
    assert client.post("/simulations", json={}).status_code == 422
    assert client.post("/simulations", json={**VALID, "email": "unused"}).status_code == 422


def test_largest_supported_scenario_is_finite_and_reconciles():
    result = simulate(SimulationRequest(monthly_contribution="1000000", months=600, monthly_rate_percent="5"))
    balance = Decimal(result.final_balance)
    assert balance.is_finite()
    assert balance == Decimal(result.total_contributed) + Decimal(result.hypothetical_earnings)
