import os
import joblib
import pandas as pd
from typing import Dict, Any
from ml.preprocessing import CATEGORICAL_FEATURES, NUMERICAL_FEATURES, FEATURE_COLUMNS

_model_cache = None

def get_model():
    global _model_cache
    if _model_cache is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "model.pkl")
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}. Please run ml/train.py first.")
        _model_cache = joblib.load(model_path)
    return _model_cache

def predict_severity(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Given input features dictionary, predict accident severity and probability confidence.
    """
    model = get_model()
    
    # Standardize keys and create 1-row DataFrame
    row = {}
    for col in FEATURE_COLUMNS:
        val = input_data.get(col, None)
        if col in CATEGORICAL_FEATURES:
            val = str(val).title() if val is not None else 'None'
        elif col in NUMERICAL_FEATURES:
            val = float(val) if val is not None else 0.0
        row[col] = [val]
        
    df_input = pd.DataFrame(row)
    
    prediction = model.predict(df_input)[0]
    
    probabilities = {}
    confidence = 0.0
    
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(df_input)[0]
        classes = model.classes_
        for cls, p in zip(classes, probs):
            probabilities[str(cls)] = round(float(p), 4)
        confidence = round(float(max(probs)) * 100, 2)
        
    return {
        "predicted_severity": str(prediction),
        "confidence_percentage": confidence,
        "class_probabilities": probabilities,
        "input_summary": input_data
    }
