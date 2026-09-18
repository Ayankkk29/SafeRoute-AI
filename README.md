# SafeRoute AI — Road Accident Risk & Severity Analysis System

SafeRoute AI is a machine learning and data analytics system built to analyze road accident risks and predict accident severity (`Minor`, `Major`, `Fatal`) based on environmental, temporal, and road infrastructure factors.

The project combines a Scikit-Learn machine learning pipeline, a FastAPI REST backend, and an interactive React web dashboard.

---

## 📌 Project Overview

Traffic accident severity depends on a combination of road design, weather conditions, time of day, and traffic density. SafeRoute AI processes accident records to train classification models, evaluate their performance, and serve on-demand severity predictions through a REST API.

The system is designed as an academic decision-support tool to explore historical accident patterns and model performance.

---

## 🚀 Features

- **Summary Dashboard**: Overview of key statistics, severity breakdown, and risk categories.
- **Accident Severity Predictor**: Interactive form that takes road and environmental inputs and returns predicted severity with confidence scores.
- **Accident Analytics**: Filterable charts analyzing accident trends across cities, weather conditions, road types, days, and hours.
- **Accident Risk Map**: Interactive Leaflet map displaying historical accident locations color-coded by risk level.
- **Model Performance Evaluator**: Performance comparison table, confusion matrix, and detailed classification report for trained models.

---

## 📊 Dataset & Attribution

- **Dataset Name**: Indian Road Accident Dataset (2022–2025)
- **Source**: [Kaggle Dataset Link](https://www.kaggle.com/datasets/sehaj1104/indian-road-accident-dataset-20222025)
- **Author**: Sehaj (`sehaj1104`)
- **Size**: 20,000 records, 24 columns
- **Location**: `data/accidents.csv`
- **Notice**: Dataset documentation mentions that some spatial coordinates and contextual attributes contain synthetically generated data for analytical context.

### Features Used in ML Model
- **Categorical**: `city`, `road_type`, `weather`, `visibility`, `traffic_density`, `day_of_week`, `festival`
- **Numerical**: `lanes`, `traffic_signal`, `temperature`, `hour`, `is_weekend`, `is_peak_hour`
- **Target**: `accident_severity` (`Minor`, `Major`, `Fatal`)

*Post-accident outcome variables (such as casualties, vehicles involved, and existing risk scores) are excluded from model training to prevent data leakage.*

---

## 🤖 Machine Learning Models & Results

We trained and compared three classification models using an 80/20 stratified train/test split:

| Model | Accuracy | Precision (Weighted) | Recall (Weighted) | F1-Score (Weighted) |
|---|---|---|---|---|
| **Decision Tree Classifier** | **53.05%** | **43.22%** | **53.05%** | **42.62%** |
| **Random Forest Classifier** | 51.18% | 40.78% | 51.18% | 42.45% |
| **Logistic Regression** | 55.13% | 51.77% | 55.13% | 39.36% |

The pipeline automatically selects the **Decision Tree Classifier** based on weighted F1-score and saves the model pipeline to `ml/model.pkl`.

### Performance Discussion & Limitations
The weighted F1-scores range between `0.39` and `0.43`. This reflects the difficulty of predicting accident severity using environmental and temporal features alone. In real-world scenarios, factors like driver behavior, vehicle condition, and speed play significant roles. The modest performance provides a clear baseline and highlights opportunities for future feature engineering and class balancing.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Leaflet, React-Leaflet, Lucide Icons
- **Backend**: Python 3.10+, FastAPI, Pydantic, Uvicorn, SQLite
- **Machine Learning**: Pandas, NumPy, Scikit-Learn, Joblib
- **Testing**: Pytest, FastAPI TestClient

---

## 📁 Repository Structure

```
SafeRoute-AI/
├── frontend/             # React Vite web interface
├── backend/              # FastAPI endpoints, database setup, and schemas
├── ml/                   # Data loader, preprocessing, training, & prediction scripts
├── data/                 # Dataset file (accidents.csv) & dataset documentation
├── tests/                # Pytest unit and integration test suite
├── docs/                 # Project documentation and Mermaid UML diagrams
├── statement.md          # Problem statement document
├── README.md             # Project README
└── .gitignore            # Git ignore rules
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Python 3.10 or higher
- Node.js v18 or higher and npm

### 1. Install Backend Dependencies
```bash
pip install -r backend/requirements.txt
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Running the Project

### 1. Train the ML Models
```bash
python -m ml.train
```

### 2. Start the Backend API
```bash
uvicorn backend.main:app --port 8000
```
API docs will be available at `http://127.0.0.1:8000/docs`.

### 3. Start the Frontend Dashboard
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧪 Testing

Run the automated test suite with pytest:
```bash
python -m pytest tests/
```

---

## 📄 License

This project is open-source under the MIT License. The dataset is used according to Kaggle academic usage terms.
