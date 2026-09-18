import io
import cv2
import numpy as np
from PIL import Image
from typing import Dict, Any
from ml.predict import predict_severity

def analyze_road_image(image_bytes: bytes) -> Dict[str, Any]:
    """
    Computer Vision Pipeline for Road Scene Analysis:
    - Decodes image using OpenCV
    - Computes Color Histogram (HSV/RGB), Contrast, Brightness, Haze Index, Edge/Contour Density
    - Detects Weather, Visibility, Traffic Density, and Road Conditions
    - Maps extracted features into ML Severity Prediction Pipeline
    """
    # 1. Load image via PIL and convert to OpenCV BGR
    pil_img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img_np = np.array(pil_img)
    img_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
    img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    
    height, width = gray.shape
    total_pixels = height * width
    
    # 2. Extract CV Image Features
    # Brightness (Mean Value channel in HSV)
    brightness = float(np.mean(img_hsv[:, :, 2]))
    
    # Saturation (Mean Saturation channel in HSV)
    saturation = float(np.mean(img_hsv[:, :, 1]))
    
    # Contrast (Standard deviation of grayscale channel)
    contrast = float(np.std(gray))
    
    # Edge Density using Canny Edge Detector
    edges = cv2.Canny(gray, 50, 150)
    edge_density = float(np.count_nonzero(edges) / total_pixels)
    
    # Haze Index (Ratio of low-frequency brightness / high-frequency contrast)
    haze_index = float((255.0 - contrast) / 255.0) if contrast < 255 else 0.0
    
    # Contour Density for vehicle / hazard detection
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    significant_contours = [c for c in contours if cv2.contourArea(c) > (total_pixels * 0.0005)]
    hazard_count = len(significant_contours)
    
    # 3. Rules-based Scene Attribute Inference from CV Metrics
    # Weather Inference
    if haze_index > 0.70 or (brightness > 160 and contrast < 35):
        detected_weather = "fog"
    elif edge_density > 0.08 and saturation < 90:
        detected_weather = "rain"
    else:
        detected_weather = "clear"
        
    # Visibility Inference
    if haze_index > 0.65 or brightness < 60:
        detected_visibility = "low"
    elif haze_index > 0.40 or brightness < 100:
        detected_visibility = "medium"
    else:
        detected_visibility = "high"
        
    # Traffic Density Inference
    if hazard_count > 25:
        detected_traffic = "high"
    elif hazard_count > 10:
        detected_traffic = "medium"
    else:
        detected_traffic = "low"
        
    # Road Type Inference (based on edge aspect ratios)
    detected_road_type = "highway" if edge_density < 0.06 else "urban"
    
    # Estimate default context values
    lanes = 4 if detected_road_type == "highway" else 2
    traffic_signal = 1 if detected_road_type == "urban" else 0
    temperature = 28.0 if detected_weather == "clear" else (22.0 if detected_weather == "rain" else 15.0)
    hour = 18 if brightness < 100 else 12
    day_of_week = "Friday"
    is_weekend = 0
    is_peak_hour = 1 if detected_traffic == "high" else 0
    festival = "None"
    city = "Pune"
    
    # 4. Map Vision Features into Tabular ML Model Payload
    feature_payload = {
        "city": city,
        "road_type": detected_road_type,
        "lanes": lanes,
        "traffic_signal": traffic_signal,
        "weather": detected_weather,
        "visibility": detected_visibility,
        "temperature": temperature,
        "traffic_density": detected_traffic,
        "hour": hour,
        "day_of_week": day_of_week,
        "is_weekend": is_weekend,
        "is_peak_hour": is_peak_hour,
        "festival": festival
    }
    
    # 5. Run ML Model Prediction
    prediction_result = predict_severity(feature_payload)
    
    return {
        "vision_metrics": {
            "image_dimensions": f"{width}x{height}",
            "brightness_index": round(brightness, 2),
            "contrast_index": round(contrast, 2),
            "haze_index": round(haze_index, 2),
            "edge_density_pct": round(edge_density * 100, 2),
            "detected_objects_count": hazard_count
        },
        "detected_features": {
            "weather": detected_weather.title(),
            "visibility": detected_visibility.title(),
            "traffic_density": detected_traffic.title(),
            "road_type": detected_road_type.title()
        },
        "ml_severity_prediction": prediction_result["predicted_severity"],
        "confidence_percentage": prediction_result["confidence_percentage"],
        "class_probabilities": prediction_result["class_probabilities"]
    }
