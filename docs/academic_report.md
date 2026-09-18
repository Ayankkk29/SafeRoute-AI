# SafeRoute AI — Academic Project Report
## Multimodal Computer Vision & Road Accident Risk Analysis System

---

### 1. COVER PAGE

| Field | Detail |
|---|---|
| **Project Title** | SafeRoute AI — Multimodal Computer Vision & Road Accident Risk Analysis System |
| **Project Type** | Capstone Academic Project (Computer Vision & Machine Learning) |
| **Domain** | Computer Vision, Artificial Intelligence, Machine Learning & Web Engineering |
| **Primary Dataset** | Indian Road Accident Dataset 2022–2025 (Kaggle) |
| **Dataset Source** | [Kaggle Dataset Link](https://www.kaggle.com/datasets/sehaj1104/indian-road-accident-dataset-20222025) |
| **Target Variable** | Multiclass Accident Severity (`Minor`, `Major`, `Fatal`) |
| **Key Technologies** | OpenCV, Python 3.10, Scikit-Learn, Pandas, NumPy, FastAPI, SQLite, React 18, Vite, Tailwind CSS, Recharts, Leaflet, Pytest |
| **Submission Date** | September 2026 |

---

### 2. INTRODUCTION

Road safety is a major public concern in India. Analyzing the severity of traffic accidents based on environmental, temporal, and road infrastructure factors enables authorities to implement targeted safety interventions. **SafeRoute AI** is a multimodal Computer Vision and Machine Learning decision-support project designed to process historical accident data, analyze uploaded road scene snapshots via OpenCV, train machine learning classifiers to predict accident severity (`Minor`, `Major`, `Fatal`), and provide interactive analytics dashboards and geospatial risk maps for academic evaluation.

---

### 3. PROBLEM STATEMENT & OBJECTIVES

#### 3.1 Problem Statement
Traffic accidents in Indian urban corridors and state/national highways result from non-linear interactions among multiple environmental variables (weather, visibility, ambient temperature), temporal factors (hour of day, day of week, weekend, peak hours, festival contexts), and road layout characteristics (road type, number of lanes, traffic signals).

Traditional traffic analysis tools rely primarily on retrospective statistical tabulations, lacking predictive decision-support capabilities, Computer Vision visual inspection tools, and interactive analytical dashboards.

#### 3.2 Objectives
1. **Computer Vision Scene Inspection**: Build an OpenCV image processing module to extract brightness, contrast, haze index, edge density, and hazard counts from uploaded road snapshots.
2. **Data Acquisition & Preprocessing**: Clean raw dataset records (20,000 samples, 24 columns), handle missing categorical values (such as `festival` NaNs), impute missing attributes, and standardize categorical text formatting.
3. **Reproducible Preprocessing Pipeline**: Build a Scikit-Learn `ColumnTransformer` applying `OneHotEncoder` (with `handle_unknown='ignore'`) to categorical features and `StandardScaler` to numerical attributes.
4. **Machine Learning Model Comparison**: Train and evaluate three distinct classifiers (Logistic Regression, Decision Tree Classifier, Random Forest Classifier).
5. **REST API Deployment**: Construct a FastAPI backend with CORS middleware, Pydantic data validation schemas, SQLite prediction logging, and endpoints for health check, analytics, image analysis (`/api/analyze-image`), model metrics, and on-demand predictions.
6. **Frontend Web Dashboard**: Develop a React 18 single-page application using Vite, Tailwind CSS, Recharts, and Leaflet rendering:
   - Summary Statistical Dashboard
   - On-Demand Severity Prediction Interface with Probability Breakdown
   - AI Vision Inspector for Road Scene Image Processing
   - Multidimensional Filterable Risk Analytics
   - Geospatial Incident Hotspot Map
   - Model Performance Matrix & Confusion Matrix Visualizer

---

### 4. FUNCTIONAL REQUIREMENTS

- **FR-1 Data Preprocessing**: Clean raw dataset, handle missing values (e.g. `festival` NaNs), encode categorical features, and split 80/20 train/test.
- **FR-2 Model Training & Selection**: Train Logistic Regression, Decision Tree, and Random Forest. Automatically select model with highest weighted F1-score.
- **FR-3 Computer Vision Analysis**: Process uploaded road scene images via OpenCV, compute image metrics (brightness, contrast, haze, edge density), infer conditions, and return severity predictions.
- **FR-4 Severity Prediction**: Accept environmental and road features via REST API and return on-demand predicted severity class and confidence %.
- **FR-5 Analytics Engine**: Serve statistical aggregations by weather, city, road type, traffic density, day, and hour.
- **FR-6 Hotspot Map**: Render historical accident points on an interactive Leaflet map color-coded by risk category.

---

### 5. NON-FUNCTIONAL REQUIREMENTS

1. **Performance**: API responses for prediction and image analysis delivered in < 100 ms under normal usage.
2. **Usability**: Intuitive dark-mode dashboard usable without specialized training.
3. **Reliability**: Input validation handled by Pydantic models and OpenCV error handling with clear error messaging.
4. **Maintainability**: Clean modular file structure separating CV, ML, API, DB, UI, and test modules.
5. **Resource Efficiency**: Optimized model loading using Joblib singleton caching.

---

### 6. SYSTEM ARCHITECTURE

The system follows a 3-tier architecture integrating Computer Vision and Machine Learning pipelines:

```
React Frontend (Vite + AI Vision Inspector)
       │
       ▼ (REST API calls)
FastAPI Backend (/api/predict & /api/analyze-image)
 ┌─────┴────────────────────────┐
 ▼                              ▼
OpenCV Vision Analyzer        ML Model (model.pkl) & SQLite DB
```

---

### 7. DESIGN DIAGRAMS

#### 7.1 System Architecture Diagram
![Architecture Diagram](assets/arch_diagram.png)

#### 7.2 Workflow Diagram
![Workflow Diagram](assets/workflow_diagram.png)

#### 7.3 Use Case Diagram
![Use Case Diagram](assets/usecase_diagram.png)

#### 7.4 Sequence Diagram
![Sequence Diagram](assets/sequence_diagram.png)

#### 7.5 Class / Component Diagram
![Class Diagram](assets/class_diagram.png)

#### 7.6 ER Diagram
![ER Diagram](assets/er_diagram.png)

---

### 8. DESIGN DECISIONS & RATIONALE

1. **Computer Vision Feature Extractor (`ml/vision_analyzer.py`)**:
   - OpenCV computes color space statistics (HSV Brightness/Saturation), Grayscale Contrast, Haze Index, and Canny Edge Density.
   - Converts visual metrics into environmental feature representations (`weather`, `visibility`, `traffic_density`) to feed into the trained ML severity classifier.
2. **Multiclass Target (`accident_severity`)**: Framed as multiclass classification (`Minor`, `Major`, `Fatal`).
3. **Preventing Data Leakage**: Post-accident outcome variables such as `casualties` and `vehicles_involved` are excluded from model training features.
4. **FastAPI Framework Choice**: Chosen for native async execution, multipart form image upload handling (`UploadFile`), and Pydantic schema validation.

---

### 9. IMPLEMENTATION DETAILS

The codebase is structured into clean, modular files:
- `ml/vision_analyzer.py`: OpenCV Computer Vision pipeline for road scene feature extraction.
- `ml/data_loader.py`: Dataset loading and schema validation.
- `ml/preprocessing.py`: Feature selection, imputer setup, and ColumnTransformer definition.
- `ml/train.py`: Model training, evaluation, and pipeline serialization (`model.pkl`, `model_metrics.json`).
- `ml/predict.py`: Model inference service with probability output.
- `backend/main.py`: FastAPI routes including `/api/analyze-image` and `/api/predict`.
- `backend/database.py`: SQLite database initialization and connection management.
- `frontend/src/`: React single-page app with pages (`Dashboard`, `Prediction`, `VisionInspector`, `Analytics`, `RiskMap`, `ModelPerformance`).

---

### 10. SCREENSHOTS & RESULTS

#### Model Evaluation Summary
| Model | Accuracy | Precision (Weighted) | Recall (Weighted) | F1-Score (Weighted) | Status |
|---|---|---|---|---|---|
| **Decision Tree Classifier** | **53.05%** | **43.22%** | **53.05%** | **42.62%** | **Selected Top Model** |
| **Random Forest Classifier** | 51.18% | 40.78% | 51.18% | 42.45% | Candidate Model |
| **Logistic Regression** | 55.13% | 51.77% | 55.13% | 39.36% | Baseline Model |

#### Application Page Previews
- **Dashboard**: High-level metrics and severity distribution charts.
- **AI Vision Inspector**: Image upload interface with OpenCV feature metrics and severity prediction.
- **Severity Prediction Form**: Input form with class probability progress bars.
- **Accident Analytics**: Filterable graphs across weather, road type, time, and city.
- **Risk Hotspot Map**: Interactive Leaflet map rendering incident markers.
- **Model Performance**: Evaluation matrix, confusion matrix, and classification report.

---

### 11. TESTING APPROACH

Automated testing using `pytest` and FastAPI `TestClient` covering ML, API, and Computer Vision modules (`12/12` tests passed):
- `tests/test_vision.py`: Tests `analyze_road_image()` OpenCV metric output and `POST /api/analyze-image` endpoint.
- `tests/test_ml.py`: Tests dataset loading, preprocessing pipeline, and model inference.
- `tests/test_api.py`: Tests API endpoints and validation error handling.

---

### 12. CHALLENGES FACED

1. **Computer Vision Feature Calibration**: Designing robust threshold rules for Haze Index and Canny Edge Density across diverse image lighting conditions.
2. **Managing Class Imbalance**: Addressing disproportionate counts between Minor, Major, and Fatal severities using stratified sampling.
3. **Data Leakage Prevention**: Identifying and excluding outcome fields (`casualties`, `vehicles_involved`) from feature vectors.

---

### 13. LEARNINGS & KEY TAKEAWAYS

- Mastered OpenCV image processing techniques (Color histograms, Canny edge detection, Haze estimation) for multimodal feature mapping.
- Developed end-to-end Machine Learning pipelines combining tabular data and Computer Vision features.
- Mastered lightweight REST API construction using FastAPI with multipart image file handling.

---

### 14. FUTURE ENHANCEMENTS

1. Deep Learning Object Detection (YOLO / MobileNet) for real-time vehicle and pedestrian counting.
2. Semantic Segmentation for automatic road surface defect classification.
3. Spatial density clustering (DBSCAN) for automated hotspot detection.

---

### 15. REFERENCES

1. **OpenCV Library**: Bradski, G. *The OpenCV Library*, Dr. Dobb's Journal of Software Tools, 2000.
2. **Kaggle Dataset**: Sehaj (`sehaj1104`), *Indian Road Accident Dataset 2022–2025*, Kaggle Repository.
3. **Scikit-Learn**: Pedregosa et al., *Scikit-learn: Machine Learning in Python*, JMLR, 2011.
4. **FastAPI**: Sebastián Ramírez, *FastAPI Framework*, Documentation URL: [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
