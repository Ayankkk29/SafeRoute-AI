from typing import Dict, Any
import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report
)

def evaluate_model(model, X_test, y_test, class_names=None) -> Dict[str, Any]:
    """
    Evaluate a classification model and return clean performance metrics.
    """
    y_pred = model.predict(X_test)
    
    if class_names is None:
        class_names = sorted(list(set(y_test)))
        
    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred, average='weighted', zero_division=0))
    rec = float(recall_score(y_test, y_pred, average='weighted', zero_division=0))
    f1 = float(f1_score(y_test, y_pred, average='weighted', zero_division=0))
    
    cm = confusion_matrix(y_test, y_pred, labels=class_names)
    
    report_dict = classification_report(
        y_test, y_pred, labels=class_names, output_dict=True, zero_division=0
    )
    
    return {
        "accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1": round(f1, 4),
        "confusion_matrix": cm.tolist(),
        "labels": class_names,
        "classification_report": report_dict
    }
