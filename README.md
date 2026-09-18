# SafeRoute AI — Road Accident Risk & Severity Analysis System

> **AI/ML Academic Project**

SafeRoute AI is a comprehensive, academic AI/ML project designed to evaluate road accident risk and predict accident severity (`Minor`, `Major`, `Fatal`) based on environmental, temporal, and road layout factors using the **Indian Road Accident Dataset (2022–2025)**.

---

## 1. Project Overview
Road accident severity analysis is vital for developing proactive traffic safety measures. SafeRoute AI combines Scikit-Learn classification pipelines with a FastAPI REST backend and a modern React dashboard. The system evaluates real historical records (20,000 samples) to train, compare, and deploy machine learning models for decision support.

## 2. Problem Statement
Traffic accidents in Indian urban and highway corridors are influenced by complex interactions between weather conditions, road types, traffic density, time of day, and holiday contexts. SafeRoute AI addresses the need for an integrated analytical tool that provides machine learning severity predictions, geospatial risk mapping, and multi-faceted data analytics for academic research and evaluation.

## 3. Objectives
- Perform reproducible machine learning preprocessing, feature engineering, and model training.
- Compare three classification algorithms: **Logistic Regression**, **Decision Tree**, and **Random Forest**.
- Automatically select and deploy the best performing model pipeline.
- Build an interactive REST API for real-time inference and analytical summaries.
- Present a clean, responsive academic dashboard featuring Recharts visualization and Leaflet geospatial mapping.

## 4. Target Users
- **Academic Evaluators / Viva Examiners**: Reviewing model methodology, data pipeline, and system architecture.
- **Traffic Safety Analysts**: Exploring historical risk score distributions and contextual accident patterns.
- **Computer Science & AI/ML Students**: Demonstrating full-stack machine learning integration.

## 5. Key Features
1. **Academic Dashboard**: High-level statistical cards, severity distribution, risk category breakdown, and atmospheric trends.
2. **Accident Severity Prediction**: User-input form providing real-time ML severity predictions and class probability distributions.
3. **Accident Analytics**: Multidimensional filterable charts (by City, Weather, Severity, Road Type) analyzing hourly and daily accident trends.
4. **Accident Risk Map**: Interactive Leaflet hotspot map displaying historical incident coordinates with risk-level color coding.
5. **Model Performance Evaluator**: Comparative performance matrix, interactive confusion matrix visualizer, and classification report.

## 6. Dataset Description
- **Dataset Name**: Indian Road Accident Dataset (2022–2025)
- **Source**: [Kaggle Dataset Link](https://www.kaggle.com/datasets/sehaj1104/indian-road-accident-dataset-20222025)
- **Record Count**: 20,000 records
- **File Location**: `data/accidents.csv`

## 7. Dataset Columns
`accident_id`, `city`, `state`, `latitude`, `longitude`, `date`, `time`, `hour`, `day_of_week`, `is_weekend`, `road_type`, `lanes`, `traffic_signal`, `weather`, `visibility`, `temperature`, `traffic_density`, `cause`, `accident_severity`, `vehicles_involved`, `casualties`, `is_peak_hour`, `festival`, `risk_score`

## 8. Machine Learning Approach
- **Task**: Multiclass Classification
- **Target Variable**: `accident_severity` (`Minor`, `Major`, `Fatal`)
- **Features Used**: `city`, `road_type`, `lanes`, `traffic_signal`, `weather`, `visibility`, `temperature`, `traffic_density`, `hour`, `day_of_week`, `is_weekend`, `is_peak_hour`, `festival`.
- **Excluded Features** (To prevent data leakage): `vehicles_involved`, `casualties`, `risk_score`, `accident_id`, `date`, `time`, `latitude`, `longitude`.
- **Pipeline**: Scikit-Learn `ColumnTransformer` with `OneHotEncoder` for categorical variables, `SimpleImputer`, and `StandardScaler`.

## 9. Model Comparison Results (Empirical Test Results)
Evaluated on an 80% training / 20% testing stratified split:

| Model | Accuracy | Precision (Weighted) | Recall (Weighted) | F1-Score (Weighted) | Status |
|---|---|---|---|---|---|
| **Decision Tree** | **53.05%** | **43.22%** | **53.05%** | **42.62%** | **Selected Best** |
| **Random Forest** | 51.18% | 40.78% | 51.18% | 42.45% | Candidate |
| **Logistic Regression** | 55.13% | 51.77% | 55.13% | 39.36% | Baseline |

*The system automatically selected the Decision Tree Classifier based on weighted F1-Score performance.*

## 10. Technology Stack
- **Frontend**: React 18, Vite, JavaScript, Tailwind CSS, Recharts, Leaflet, React-Leaflet, Lucide Icons.
- **Backend**: Python 3.10+, FastAPI, Pydantic, Uvicorn, SQLite.
- **Machine Learning**: Pandas, NumPy, Scikit-Learn, Joblib.
- **Testing**: Pytest, FastAPI TestClient.

## 11. System Architecture
```
React Frontend (Vite)
       │
       ▼ (REST API calls)
FastAPI Backend
 ┌─────┴────────────────┐
 ▼                      ▼
ML Model (model.pkl)   SQLite Database (saferoute.db)
```

## 12. Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm

### Step 1: Install Python Dependencies
```bash
pip install -r backend/requirements.txt
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

## 13. How to Run

### Step 1: Train ML Models & Generate Artifacts
```bash
python -m ml.train
```

### Step 2: Start Backend Server
```bash
uvicorn backend.main:app --port 8000
```

### Step 3: Start Frontend Dev Server
```bash
cd frontend
npm run dev
```
Open browser at: `http://localhost:5173`

## 14. API Endpoints
- `GET /api/health`: Health status.
- `POST /api/predict`: Predict severity for user input conditions.
- `GET /api/analytics`: Statistical metrics and chart distributions.
- `GET /api/accidents`: Historical accident markers for map rendering.
- `GET /api/model-performance`: Comparative evaluation results and confusion matrices.

## 15. Testing
Run full test suite:
```bash
python -m pytest tests/
```

## 16. Limitations
- Historical dataset analysis; does not connect to live traffic cameras or real-time weather APIs.
- Synthetic spatial coordinates are present in portions of the Kaggle dataset for context demonstration.

## 17. Future Enhancements
- Incorporation of real-time traffic volume sensors.
- Integration of deep learning sequential models (e.g., LSTMs) for time-series risk forecasting.
- Spatial heat-map overlays for regional urban planning.

## 18. References
- Indian Road Accident Dataset 2022–2025: Kaggle (`sehaj1104/indian-road-accident-dataset-20222025`)
- Scikit-Learn Documentation: https://scikit-learn.org/
- FastAPI Documentation: https://fastapi.tiangolo.com/
