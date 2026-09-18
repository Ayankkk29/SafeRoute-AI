import os
from typing import Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from backend.database import init_db
from backend.schemas import PredictionRequest, PredictionResponse, HealthResponse, AnalyticsSummary
from backend.services.prediction import run_prediction
from backend.services.analytics import get_analytics_summary, get_accident_records, get_model_metrics

app = FastAPI(
    title="SafeRoute AI Backend",
    description="Road Accident Risk & Severity Analysis System API",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "message": "SafeRoute AI Backend API is running smoothly."
    }

@app.post("/api/predict", response_model=PredictionResponse)
def predict_accident_severity(payload: PredictionRequest):
    try:
        data_dict = payload.model_dump()
        result = run_prediction(data_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/api/analytics")
def get_analytics(
    city: Optional[str] = Query(None),
    weather: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    road_type: Optional[str] = Query(None)
):
    try:
        summary = get_analytics_summary(
            city=city, weather=weather, severity=severity, road_type=road_type
        )
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analytics error: {str(e)}")

@app.get("/api/accidents")
def get_accidents(
    limit: int = Query(500, ge=1, le=5000),
    city: Optional[str] = Query(None),
    weather: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    road_type: Optional[str] = Query(None)
):
    try:
        records = get_accident_records(
            limit=limit, city=city, weather=weather, severity=severity, road_type=road_type
        )
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching accident records: {str(e)}")

@app.get("/api/model-performance")
def get_performance():
    try:
        metrics = get_model_metrics()
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching model performance: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
