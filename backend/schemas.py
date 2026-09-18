from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional

class PredictionRequest(BaseModel):
    city: str = Field(..., example="Pune")
    road_type: str = Field(..., example="highway")
    lanes: int = Field(..., ge=1, le=10, example=3)
    traffic_signal: int = Field(..., ge=0, le=1, example=1)
    weather: str = Field(..., example="clear")
    visibility: str = Field(..., example="high")
    temperature: float = Field(..., example=30.0)
    traffic_density: str = Field(..., example="high")
    hour: int = Field(..., ge=0, le=23, example=18)
    day_of_week: str = Field(..., example="Friday")
    is_weekend: int = Field(..., ge=0, le=1, example=0)
    is_peak_hour: int = Field(..., ge=0, le=1, example=1)
    festival: Optional[str] = Field(default="None", example="None")

class PredictionResponse(BaseModel):
    predicted_severity: str
    confidence_percentage: float
    class_probabilities: Dict[str, float]
    input_summary: Dict[str, Any]

class HealthResponse(BaseModel):
    status: str
    version: str
    message: str

class AnalyticsSummary(BaseModel):
    total_accidents: int
    average_risk_score: float
    fatal_accidents: int
    most_common_weather: str
    highest_accident_city: str
    best_ml_model: str
    best_model_f1: float
    risk_categories: Dict[str, int]
    severity_distribution: List[Dict[str, Any]]
    weather_distribution: List[Dict[str, Any]]
    road_type_distribution: List[Dict[str, Any]]
    traffic_density_distribution: List[Dict[str, Any]]
    day_of_week_distribution: List[Dict[str, Any]]
    hour_distribution: List[Dict[str, Any]]
    city_distribution: List[Dict[str, Any]]
