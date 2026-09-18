import io
import pytest
import numpy as np
from PIL import Image
from ml.vision_analyzer import analyze_road_image
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_computer_vision_image_analyzer():
    # Create a synthetic image
    img = Image.fromarray(np.uint8(np.random.rand(200, 200, 3) * 255))
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    image_bytes = buf.getvalue()
    
    res = analyze_road_image(image_bytes)
    assert "vision_metrics" in res
    assert "detected_features" in res
    assert "ml_severity_prediction" in res
    assert res["ml_severity_prediction"] in ["Minor", "Major", "Fatal"]
    assert "brightness_index" in res["vision_metrics"]
    assert "contrast_index" in res["vision_metrics"]

def test_analyze_image_api_endpoint():
    img = Image.fromarray(np.uint8(np.random.rand(150, 150, 3) * 255))
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    buf.seek(0)
    
    files = {"file": ("test_road.jpg", buf, "image/jpeg")}
    response = client.post("/api/analyze-image", files=files)
    assert response.status_code == 200
    data = response.json()
    assert "vision_metrics" in data
    assert "ml_severity_prediction" in data
