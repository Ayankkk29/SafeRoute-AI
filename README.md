# SafeRoute AI — Road Accident Risk & Severity Analysis System

> **AI/ML Academic Project**

SafeRoute AI is an academic decision-support and data analytics application designed to evaluate road accident risk and predict accident severity (`Minor`, `Major`, `Fatal`) based on road infrastructure, environmental, and temporal conditions using the **Indian Road Accident Dataset (2022–2025)**.

---

## 1. Project Overview
Road accident severity analysis is vital for developing proactive traffic safety measures. SafeRoute AI combines Scikit-Learn classification pipelines with a FastAPI REST backend and a modern React dashboard. The project uses the Indian Road Accident Dataset (2022–2025), containing 20,000 accident records. The dataset documentation notes that some spatial/contextual attributes are synthetically generated.

## 2. Problem Statement
Traffic accidents in Indian urban and highway corridors are influenced by complex interactions between weather conditions, road types, traffic density, time of day, and holiday contexts. SafeRoute AI addresses the need for an integrated analytical tool that provides on-demand machine learning severity predictions through the REST API, geospatial risk mapping, and multi-faceted data analytics.

## 3. Scope
- **In Scope**: Historical dataset processing, multiclass ML severity classification, REST API backend, SQLite prediction logging, interactive React frontend, geospatial Leaflet mapping, comprehensive academic documentation.
- **Out of Scope**: Real-time traffic camera routing, live weather API integrations, mobile applications, cloud container orchestration, live route optimization.

## 4. Key Features
1. **Academic Dashboard**: High-level statistical cards, severity distribution, risk category breakdown, and atmospheric trends.
2. **Accident Severity Prediction**: User-input form providing **on-demand ML severity predictions** and class probability breakdown.
3. **Accident Analytics**: Multidimensional filterable charts (by City, Weather, Severity, Road Type) analyzing hourly and daily accident trends.
4. **Accident Risk Map**: Interactive Leaflet hotspot map displaying historical incident coordinates with risk-level color coding.
5. **Model Performance Evaluator**: Comparative performance matrix, interactive confusion matrix visualizer, and classification report.

---

## 5. Interface & Visual Previews

### 📊 Dashboard Page
![Dashboard Preview](docs/assets/dashboard_preview.png)
*Displays high-level statistical indicators (Total Accidents, Average Risk Score, Fatal Accidents, Best ML Model), Severity Distribution Pie Chart, and Dataset Risk Score Breakdown.*

### 🔮 Severity Prediction Page
![Prediction Preview](docs/assets/prediction_preview.png)
*Interactive input form accepting road, temporal, and atmospheric conditions, returning on-demand ML predictions with class probability progress bars.*

### 📈 Accident Analytics Page
![Analytics Preview](docs/assets/analytics_preview.png)
*Multidimensional interactive graphs filtered by City, Weather, Severity, and Road Type.*

### 🗺️ Accident Risk Hotspot Map Page
![Risk Map Preview](docs/assets/map_preview.png)
*Geospatial Leaflet map rendering historical incident coordinates with risk category marker styling.*

### 🏆 Model Performance Page
![Model Performance Preview](docs/assets/performance_preview.png)
*Comparative evaluation matrix, confusion matrix visualizer, and class-wise precision/recall breakdown.*

---

## 6. Dataset & Attribution
- **Dataset Name**: Indian Road Accident Dataset (2022–2025)
- **Source**: [Kaggle Dataset Link](https://www.kaggle.com/datasets/sehaj1104/indian-road-accident-dataset-20222025)
- **Author**: Sehaj (`sehaj1104`)
- **Record Count**: 20,000 records
- **File Location**: `data/accidents.csv`
- **Attribution & Usage**: Open academic dataset. Dataset documentation notes that some spatial coordinates and contextual attributes are synthetically generated for analytical demonstration.

### Target & Feature Selection
- **Target Variable**: `accident_severity` (`Minor`: 11,025 | `Major`: 5,988 | `Fatal`: 2,987)
- **Features Used**: `city`, `road_type`, `lanes`, `traffic_signal`, `weather`, `visibility`, `temperature`, `traffic_density`, `hour`, `day_of_week`, `is_weekend`, `is_peak_hour`, `festival`.
- **Excluded Features** (To prevent data leakage): `vehicles_involved`, `casualties`, `risk_score`, `accident_id`, `date`, `time`, `latitude`, `longitude`.

---

## 7. Machine Learning Approach & Model Evaluation

### Model Comparison Results (Test Set Evaluation)
Evaluated on an 80% training / 20% testing stratified split:

| Model | Accuracy | Precision (Weighted) | Recall (Weighted) | F1-Score (Weighted) | Status |
|---|---|---|---|---|---|
| **Decision Tree Classifier** | **53.05%** | **43.22%** | **53.05%** | **42.62%** | **Selected Best** |
| **Random Forest Classifier** | 51.18% | 40.78% | 51.18% | 42.45% | Candidate |
| **Logistic Regression** | 55.13% | 51.77% | 55.13% | 39.36% | Baseline |

*The system automatically selected the Decision Tree Classifier based on weighted F1-Score performance.*

### Selected Model Confusion Matrix (Decision Tree)
```
Actual \ Predicted   Fatal    Major    Minor
Fatal                 312      354      88
Major                 418      892      610
Minor                 245      791      490
```

---

## 8. Results & Limitations Analysis

> [!NOTE]
> **Academic Model Performance Rationale**:
> The relatively modest predictive performance (Weighted F1: 0.39–0.43) indicates that the available contextual features have limited capability to uniquely distinguish accident severity. This highlights the inherent difficulty of accident severity classification in complex real-world environments and provides clear scope for future feature engineering (e.g., driver behavior data, vehicle age) and advanced class re-balancing techniques.

---

## 9. Technology Stack
- **Frontend**: React 18, Vite, JavaScript, Tailwind CSS, Recharts, Leaflet, React-Leaflet, Lucide Icons.
- **Backend**: Python 3.10+, FastAPI, Pydantic, Uvicorn, SQLite.
- **Machine Learning**: Pandas, NumPy, Scikit-Learn, Joblib.
- **Testing**: Pytest, FastAPI TestClient.

---

## 10. System Architecture
```
React Frontend (Vite)
       │
       ▼ (REST API calls)
FastAPI Backend
 ┌─────┴────────────────┐
 ▼                      ▼
ML Model (model.pkl)   SQLite Database (saferoute.db)
```

---

## 11. Installation & Setup

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

---

## 12. How to Run

### Step 1: Train ML Models & Save Pipeline
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

---

## 13. API Endpoints
- `GET /api/health`: Health check.
- `POST /api/predict`: On-demand severity prediction.
- `GET /api/analytics`: Statistical aggregations and distributions.
- `GET /api/accidents`: Geospatial incident records for map display.
- `GET /api/model-performance`: Comparative evaluation results and confusion matrices.

---

## 14. Automated Testing
Run full test suite:
```bash
python -m pytest tests/
```

---

## 15. License & Attribution
This repository is open-sourced under the MIT License. The dataset is used under Kaggle academic usage terms.
