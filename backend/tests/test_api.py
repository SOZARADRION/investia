from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_contract():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    assert response.json() == {"status": "ok", "service": "investia-api"}


def test_health_does_not_accept_writes():
    assert client.post("/health", json={"status": "changed"}).status_code == 405


def test_no_profile_api_exposed():
    assert client.get("/users/example").status_code == 404
