import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

CATEGORICAL_FEATURES = [
    'city', 'road_type', 'weather', 'visibility',
    'traffic_density', 'day_of_week', 'festival'
]

NUMERICAL_FEATURES = [
    'lanes', 'traffic_signal', 'temperature', 'hour',
    'is_weekend', 'is_peak_hour'
]

FEATURE_COLUMNS = CATEGORICAL_FEATURES + NUMERICAL_FEATURES
TARGET_COLUMN = 'accident_severity'

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean raw DataFrame:
    - Replace missing festival values with 'None'
    - Normalize target severity string casing (Title Case: Minor, Major, Fatal)
    """
    df_clean = df.copy()
    
    # Fill NaN festival with 'None'
    if 'festival' in df_clean.columns:
        df_clean['festival'] = df_clean['festival'].fillna('None').astype(str).str.title()
        
    # Standardize categorical text features to title case
    for col in CATEGORICAL_FEATURES:
        if col in df_clean.columns and col != 'festival':
            df_clean[col] = df_clean[col].astype(str).str.title()
            
    # Standardize target
    if TARGET_COLUMN in df_clean.columns:
        df_clean[TARGET_COLUMN] = df_clean[TARGET_COLUMN].astype(str).str.title()
        
    return df_clean

def get_preprocessor() -> ColumnTransformer:
    """
    Construct ColumnTransformer for numerical scaling and categorical encoding.
    """
    cat_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='constant', fill_value='None')),
        ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
    ])
    
    num_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', cat_pipeline, CATEGORICAL_FEATURES),
            ('num', num_pipeline, NUMERICAL_FEATURES)
        ]
    )
    
    return preprocessor
