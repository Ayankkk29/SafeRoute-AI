import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_predict_endpoint_valid():
    payload = {
        "city": "Mumbai",
        "road_type": "urban",
        "lanes": 2,
        "traffic_signal": 0,
        "weather": "fog",
        "visibility": "low",
        "temperature": 18.0,
        "traffic_density": "high",
        "hour": 23,
        "day_of_week": "Saturday",
        "is_weekend": 1,
        "is_peak_hour": 0,
        "festival": "Diwali"
    }
    response = client.post("/api/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "predicted_severity" in data
    assert data["predicted_severity"] in ["Minor", "Major", "Fatal"]
    assert "confidence_percentage" in data

def test_predict_endpoint_validation_error():
    # Sending invalid data types (e.g. string for hour or invalid range)
    invalid_payload = {
        "city": "Mumbai",
        "hour": 99  # Invalid hour > 23
    }
    response = client.post("/api/predict", json=invalid_payload)
    assert response.status_code == 422  # Unprocessable Entity (validation error)

def test_analytics_endpoint():
    response = client.get("/api/analytics")
    assert response.status_code == 200
    data = response.json()
    assert data["total_accidents"] > 0
    assert "risk_categories" in data
    assert "severity_distribution" in data

def test_accidents_endpoint():
    response = client.get("/api/accidents?limit=10")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 10
    assert "latitude" in data[0]
    assert "longitude" in data[0]

def test_model_performance_endpoint():
    response = client.get("/api/model-performance")
    assert response.status_code == 200
    data = response.json()
    assert "best_model" in data
    assert "models" in data
