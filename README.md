# SafeRoute AI — Multimodal Computer Vision & Road Accident Risk Analysis System

SafeRoute AI is a multimodal Computer Vision and Machine Learning decision-support system built to analyze road accident risks and predict accident severity (`Minor`, `Major`, `Fatal`) using both image-based visual inspection and environmental/road infrastructure data from the **Indian Road Accident Dataset (2022–2025)**.

The project combines an OpenCV image processing pipeline, Scikit-Learn machine learning classifiers, a FastAPI REST backend, and an interactive React web dashboard.

---

## 📌 Project Overview

Traffic accident severity depends on a combination of road design, weather conditions, time of day, and traffic density. SafeRoute AI processes accident records and road scene images to extract visual metrics (brightness, contrast, haze index, edge density), train classification models, evaluate their performance, and serve on-demand severity predictions through a REST API.

---

## 🚀 Key Features

- **Summary Dashboard**: Overview of key statistics, severity breakdown, and risk categories.
- **Accident Severity Predictor**: Form interface for environmental inputs and on-demand ML severity predictions.
- **AI Vision Inspector**: OpenCV-powered Computer Vision engine that analyzes uploaded road scene images to extract brightness, contrast, haze, edge density, and infer weather/traffic conditions.
- **Accident Analytics**: Filterable charts analyzing accident trends across cities, weather conditions, road types, days, and hours.
- **Accident Risk Map**: Interactive Leaflet map displaying historical accident locations color-coded by risk level.
- **Model Performance Evaluator**: Performance comparison table, confusion matrix, and detailed classification report for trained models.

---

## 👁️ Computer Vision Architecture

The Computer Vision engine (`ml/vision_analyzer.py`) processes uploaded road scene snapshots:
1. **Color Space Analysis**: Evaluates HSV and grayscale intensity distributions to calculate **Brightness Index** and **Saturation**.
2. **Texture & Contrast Assessment**: Computes standard deviation of pixel intensities to measure scene **Contrast**.
3. **Haze & Visibility Index**: Calculates high-pass vs low-pass ratio to quantify fog/haze density.
4. **Edge & Hazard Density Detection**: Uses Canny edge detection and contour extraction to measure surface irregularity and hazard counts.
5. **Multimodal Mapping**: Automatically converts extracted visual parameters into the ML feature vector for vision-assisted severity classification.

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

---

## 🛠️ Technology Stack

- **Computer Vision**: OpenCV (`opencv-python-headless`), Pillow (PIL), NumPy
- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Leaflet, React-Leaflet, Lucide Icons
- **Backend**: Python 3.10+, FastAPI, Pydantic, Uvicorn, SQLite
- **Machine Learning**: Pandas, NumPy, Scikit-Learn, Joblib
- **Testing**: Pytest, FastAPI TestClient

---

## 📁 Repository Structure

```
SafeRoute-AI/
├── frontend/             # React Vite web interface with AI Vision Inspector
├── backend/              # FastAPI endpoints (/api/predict, /api/analyze-image, etc.)
├── ml/                   # Data loader, preprocessing, vision analyzer, & training scripts
├── data/                 # Dataset file (accidents.csv) & documentation
├── tests/                # Pytest test suite covering ML, API, and Computer Vision
├── docs/                 # Project documentation and Mermaid UML diagrams
├── statement.md          # Problem statement document
└── README.md             # Project README
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
API docs available at `http://127.0.0.1:8000/docs`.

### 3. Start the Frontend Dashboard
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧪 Testing

Run the full automated test suite with pytest:
```bash
python -m pytest tests/
```

---

## 📄 License

This project is open-source under the MIT License. The dataset is used according to Kaggle academic usage terms.
