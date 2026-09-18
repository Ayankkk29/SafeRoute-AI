import os
import json
import pandas as pd
from typing import Dict, Any, List, Optional
from ml.data_loader import load_accident_data

def get_model_metrics() -> Dict[str, Any]:
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    metrics_path = os.path.join(base_dir, "ml", "model_metrics.json")
    if not os.path.exists(metrics_path):
        return {
            "best_model": "N/A",
            "models": {},
            "labels": ["Fatal", "Major", "Minor"],
            "features": []
        }
    with open(metrics_path, "r") as f:
        return json.load(f)

def get_analytics_summary(
    city: Optional[str] = None,
    weather: Optional[str] = None,
    severity: Optional[str] = None,
    road_type: Optional[str] = None
) -> Dict[str, Any]:
    df = load_accident_data()
    
    # Filter data if parameters provided
    if city and city.lower() != 'all':
        df = df[df['city'].astype(str).str.lower() == city.lower()]
    if weather and weather.lower() != 'all':
        df = df[df['weather'].astype(str).str.lower() == weather.lower()]
    if severity and severity.lower() != 'all':
        df = df[df['accident_severity'].astype(str).str.lower() == severity.lower()]
    if road_type and road_type.lower() != 'all':
        df = df[df['road_type'].astype(str).str.lower() == road_type.lower()]
        
    total_accidents = int(len(df))
    if total_accidents == 0:
        return {
            "total_accidents": 0,
            "average_risk_score": 0.0,
            "fatal_accidents": 0,
            "most_common_weather": "N/A",
            "highest_accident_city": "N/A",
            "best_ml_model": "N/A",
            "best_model_f1": 0.0,
            "risk_categories": {"low": 0, "medium": 0, "high": 0},
            "severity_distribution": [],
            "weather_distribution": [],
            "road_type_distribution": [],
            "traffic_density_distribution": [],
            "day_of_week_distribution": [],
            "hour_distribution": [],
            "city_distribution": []
        }
        
    avg_risk_score = round(float(df['risk_score'].mean()), 2) if 'risk_score' in df.columns else 0.0
    fatal_accidents = int((df['accident_severity'].str.lower() == 'fatal').sum())
    
    # Mode weather and city
    most_common_weather = df['weather'].astype(str).str.title().mode()[0] if not df['weather'].empty else "N/A"
    highest_accident_city = df['city'].astype(str).mode()[0] if not df['city'].empty else "N/A"
    
    # Risk categories (0.00-0.33 low, 0.34-0.66 medium, 0.67-1.00 high)
    low_risk = int((df['risk_score'] <= 0.33).sum())
    med_risk = int(((df['risk_score'] > 0.33) & (df['risk_score'] <= 0.66)).sum())
    high_risk = int((df['risk_score'] > 0.66).sum())
    
    # ML model metrics
    metrics_info = get_model_metrics()
    best_model_name = metrics_info.get("best_model", "Decision Tree")
    best_model_f1 = 0.0
    if best_model_name in metrics_info.get("models", {}):
        best_model_f1 = metrics_info["models"][best_model_name].get("f1", 0.0)
        
    def to_dist_list(series, title_case=True):
        vc = series.value_counts()
        result = []
        for name, count in vc.items():
            name_str = str(name).title() if title_case else str(name)
            result.append({"name": name_str, "value": int(count)})
        return result
        
    # Distributions
    sev_dist = to_dist_list(df['accident_severity'])
    weather_dist = to_dist_list(df['weather'])
    road_dist = to_dist_list(df['road_type'])
    traffic_dist = to_dist_list(df['traffic_density'])
    day_dist = to_dist_list(df['day_of_week'], title_case=False)
    
    # Hour distribution (sorted 0..23)
    hour_vc = df['hour'].value_counts().sort_index()
    hour_dist = [{"hour": int(h), "count": int(c)} for h, c in hour_vc.items()]
    
    city_dist = to_dist_list(df['city'], title_case=False)
    
    return {
        "total_accidents": total_accidents,
        "average_risk_score": avg_risk_score,
        "fatal_accidents": fatal_accidents,
        "most_common_weather": most_common_weather,
        "highest_accident_city": highest_accident_city,
        "best_ml_model": best_model_name,
        "best_model_f1": best_model_f1,
        "risk_categories": {
            "low": low_risk,
            "medium": med_risk,
            "high": high_risk
        },
        "severity_distribution": sev_dist,
        "weather_distribution": weather_dist,
        "road_type_distribution": road_dist,
        "traffic_density_distribution": traffic_dist,
        "day_of_week_distribution": day_dist,
        "hour_distribution": hour_dist,
        "city_distribution": city_dist
    }

def get_accident_records(
    limit: int = 500,
    city: Optional[str] = None,
    weather: Optional[str] = None,
    severity: Optional[str] = None,
    road_type: Optional[str] = None
) -> List[Dict[str, Any]]:
    df = load_accident_data()
    
    if city and city.lower() != 'all':
        df = df[df['city'].astype(str).str.lower() == city.lower()]
    if weather and weather.lower() != 'all':
        df = df[df['weather'].astype(str).str.lower() == weather.lower()]
    if severity and severity.lower() != 'all':
        df = df[df['accident_severity'].astype(str).str.lower() == severity.lower()]
    if road_type and road_type.lower() != 'all':
        df = df[df['road_type'].astype(str).str.lower() == road_type.lower()]
        
    df_sample = df.head(limit)
    
    records = []
    for _, row in df_sample.iterrows():
        rs = float(row.get('risk_score', 0.0))
        if rs <= 0.33:
            risk_cat = "Low Risk"
        elif rs <= 0.66:
            risk_cat = "Medium Risk"
        else:
            risk_cat = "High Risk"
            
        records.append({
            "accident_id": str(row.get('accident_id', '')),
            "city": str(row.get('city', '')),
            "latitude": float(row.get('latitude', 0.0)),
            "longitude": float(row.get('longitude', 0.0)),
            "severity": str(row.get('accident_severity', '')).title(),
            "weather": str(row.get('weather', '')).title(),
            "road_type": str(row.get('road_type', '')).title(),
            "traffic_density": str(row.get('traffic_density', '')).title(),
            "risk_score": rs,
            "risk_category": risk_cat,
            "hour": int(row.get('hour', 0)),
            "day_of_week": str(row.get('day_of_week', ''))
        })
    return records
