import sqlite3
from typing import Dict, Any
from ml.predict import predict_severity
from backend.database import get_db_connection

def run_prediction(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run ML prediction logic and persist prediction to SQLite database.
    """
    result = predict_severity(data)
    
    # Save to SQLite
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO predictions (
                city, road_type, lanes, traffic_signal, weather, visibility,
                temperature, traffic_density, hour, day_of_week, is_weekend,
                is_peak_hour, festival, predicted_severity, confidence_percentage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('city'),
            data.get('road_type'),
            data.get('lanes'),
            data.get('traffic_signal'),
            data.get('weather'),
            data.get('visibility'),
            data.get('temperature'),
            data.get('traffic_density'),
            data.get('hour'),
            data.get('day_of_week'),
            data.get('is_weekend'),
            data.get('is_peak_hour'),
            data.get('festival', 'None'),
            result['predicted_severity'],
            result['confidence_percentage']
        ))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error persisting prediction record to SQLite: {e}")
        
    return result
