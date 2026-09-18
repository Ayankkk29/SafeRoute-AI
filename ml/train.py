import os
import json
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

from ml.data_loader import load_accident_data
from ml.preprocessing import clean_data, get_preprocessor, FEATURE_COLUMNS, TARGET_COLUMN
from ml.evaluate import evaluate_model

def train_and_evaluate():
    print("=== SafeRoute AI - Model Training & Evaluation Pipeline ===")
    
    # 1. Load data
    df_raw = load_accident_data()
    df = clean_data(df_raw)
    
    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]
    
    # 2. Stratified Train/Test Split (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Dataset split: Training={len(X_train)} samples, Testing={len(X_test)} samples")
    class_names = sorted(y.unique().tolist())
    
    # 3. Define Models
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Decision Tree": DecisionTreeClassifier(max_depth=10, random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    results = {}
    fitted_pipelines = {}
    best_model_name = None
    best_f1 = -1.0
    
    preprocessor = get_preprocessor()
    
    for name, clf in models.items():
        print(f"\nTraining {name}...")
        pipeline = Pipeline([
            ('preprocessor', preprocessor),
            ('classifier', clf)
        ])
        
        pipeline.fit(X_train, y_train)
        fitted_pipelines[name] = pipeline
        
        metrics = evaluate_model(pipeline, X_test, y_test, class_names=class_names)
        results[name] = metrics
        
        print(f"-> {name} Results:")
        print(f"   Accuracy: {metrics['accuracy']:.4f} | Precision: {metrics['precision']:.4f} | Recall: {metrics['recall']:.4f} | F1-Score: {metrics['f1']:.4f}")
        
        if metrics['f1'] > best_f1:
            best_f1 = metrics['f1']
            best_model_name = name
            
    print(f"\nBest performing model based on Weighted F1-Score: {best_model_name} (F1 = {best_f1:.4f})")
    
    # 4. Save best pipeline to ml/model.pkl
    base_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(base_dir, "model.pkl")
    metrics_path = os.path.join(base_dir, "model_metrics.json")
    
    best_pipeline = fitted_pipelines[best_model_name]
    joblib.dump(best_pipeline, model_path)
    print(f"Saved best model pipeline to: {model_path}")
    
    # 5. Save metrics JSON for API & Frontend
    metrics_payload = {
        "best_model": best_model_name,
        "models": results,
        "labels": class_names,
        "features": FEATURE_COLUMNS
    }
    
    with open(metrics_path, "w") as f:
        json.dump(metrics_payload, f, indent=2)
    print(f"Saved evaluation metrics to: {metrics_path}")

if __name__ == "__main__":
    train_and_evaluate()
