import pytest
import pandas as pd
from ml.data_loader import load_accident_data
from ml.preprocessing import clean_data, get_preprocessor, FEATURE_COLUMNS, TARGET_COLUMN
from ml.predict import predict_severity, get_model

def test_dataset_loading():
    df = load_accident_data()
    assert isinstance(df, pd.DataFrame)
    assert not df.empty
    assert 'accident_severity' in df.columns
    assert len(df) >= 1000

def test_preprocessing_pipeline():
    df_raw = load_accident_data()
    df_clean = clean_data(df_raw)
    assert df_clean['festival'].isna().sum() == 0
    assert df_clean[TARGET_COLUMN].isin(['Minor', 'Major', 'Fatal']).all()
    
    preprocessor = get_preprocessor()
    X = df_clean[FEATURE_COLUMNS]
    transformed = preprocessor.fit_transform(X)
    assert transformed.shape[0] == len(df_clean)
    assert transformed.shape[1] > len(FEATURE_COLUMNS)

def test_model_loading_and_predict():
    model = get_model()
    assert model is not None
    
    valid_input = {
        'city': 'Pune',
        'road_type': 'highway',
        'lanes': 3,
        'traffic_signal': 1,
        'weather': 'clear',
        'visibility': 'high',
        'temperature': 28.0,
        'traffic_density': 'high',
        'hour': 17,
        'day_of_week': 'Friday',
        'is_weekend': 0,
        'is_peak_hour': 1,
        'festival': 'None'
    }
    
    result = predict_severity(valid_input)
    assert 'predicted_severity' in result
    assert result['predicted_severity'] in ['Minor', 'Major', 'Fatal']
    assert 0.0 <= result['confidence_percentage'] <= 100.0
    assert len(result['class_probabilities']) == 3

def test_predict_invalid_or_missing_fields():
    # Should handle missing fields gracefully by defaulting
    sparse_input = {
        'city': 'Delhi',
        'weather': 'rain'
    }
    result = predict_severity(sparse_input)
    assert result['predicted_severity'] in ['Minor', 'Major', 'Fatal']
