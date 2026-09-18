# Problem Statement: SafeRoute AI — Multimodal Computer Vision & Road Accident Risk Analysis System

## Problem Statement
Road accidents represent a critical public safety challenge in India, leading to loss of life, severe injuries, and traffic disruption. Evaluating the interplay between environmental factors (weather, visibility, temperature), temporal conditions (hour of day, weekend, peak hours, festival contexts), and road layout (road type, lanes, traffic signals) is essential for proactive accident risk mitigation. Current analysis tools often lack predictive capabilities, image-based hazard detection, or easy-to-understand academic interfaces.

## Scope
SafeRoute AI is an academic AI/ML and Computer Vision project designed to analyze accident records from the **Indian Road Accident Dataset 2022–2025** (20,000 records) and process road scene snapshots via Computer Vision. The dataset documentation notes that some spatial/contextual attributes are synthetically generated.

The scope encompasses:
1. **Computer Vision Inspection**: Image analysis via OpenCV to compute brightness index, contrast, haze index, edge density, and hazard counts.
2. **Multiclass Machine Learning Classification**: Predict accident severity (`Minor`, `Major`, `Fatal`).
3. **Data Preprocessing & Pipeline Serialization**: Using Scikit-Learn ColumnTransformer and Joblib.
4. **Comparative Evaluation**: Logistic Regression, Decision Tree, and Random Forest models.
5. **Interactive REST API Backend**: Built using FastAPI and SQLite providing **on-demand ML severity predictions** and **/api/analyze-image** Computer Vision analysis.
6. **React Web Dashboard**: Multimodal interface with interactive charts, geospatial hotspot map, image inspector, and model performance metrics.

*Out of Scope*: Real-time traffic camera video streams, live weather API integrations, mobile app development, or cloud microservice deployment.

## Target Users
1. Academic Examiners & Faculty Evaluators during Viva examinations.
2. Transportation & Traffic Safety Analysts analyzing historical incident trends and visual road hazards.
3. Engineering Students demonstrating Computer Vision, AI/ML classification, and full-stack integration concepts.

## Objectives
- Build an OpenCV Computer Vision engine to extract scene features from road snapshots.
- Build a fully functional, reproducible Machine Learning pipeline without hardcoded metrics.
- Provide on-demand ML severity predictions with confidence percentages based on user-entered environmental conditions and image inputs.
- Categorize historical dataset risk scores (`0.00–0.33 Low Risk`, `0.34–0.66 Medium Risk`, `0.67–1.00 High Risk`).
- Provide interactive visual analytics across weather, road type, time, day, and city.
- Fulfill all academic project guidelines and documentation standards.

## High-Level Features
- **Summary Dashboard**: Key statistical indicators and distribution breakdown.
- **Accident Severity Predictor**: On-demand ML inference form with class probability breakdown.
- **AI Vision Inspector**: Image upload interface for OpenCV feature extraction and vision-assisted severity classification.
- **Accident Analytics**: Filterable charts (Recharts) by City, Weather, Severity, and Road Type.
- **Accident Risk Hotspot Map**: Interactive Leaflet map visualizing historical incident markers and risk levels.
- **Model Performance Evaluator**: Comparative performance matrix, confusion matrix, and classification report.

## Functional Requirements
- **FR-1**: The backend MUST train and evaluate Logistic Regression, Decision Tree, and Random Forest models on an 80/20 stratified train/test split.
- **FR-2**: The system MUST automatically select the best model based on weighted F1-score and save it to `ml/model.pkl`.
- **FR-3**: The prediction API MUST accept environmental inputs and return predicted severity class and confidence score.
- **FR-4**: The Computer Vision API MUST accept uploaded road scene images, compute image metrics (brightness, contrast, edge density), infer conditions, and return severity predictions.
- **FR-5**: The system MUST store user prediction requests in an SQLite database.

## Non-Functional Requirements
1. **Performance**: API responses for prediction and image analysis execute under 100 ms.
2. **Usability**: Clean, intuitive dark-mode interface usable without prior technical training.
3. **Reliability**: Pydantic input validation and OpenCV exception handling prevent server crashes.
4. **Maintainability**: Modular architecture separating CV logic, ML logic, API handlers, database queries, and UI components.

## Technologies Used
- **Computer Vision**: OpenCV (`opencv-python-headless`), Pillow (PIL), NumPy.
- **Frontend**: React (Vite), JavaScript, Tailwind CSS, Recharts, Leaflet, React-Leaflet, Lucide Icons.
- **Backend**: Python 3.10+, FastAPI, Pydantic, Uvicorn, SQLite.
- **Machine Learning**: Pandas, NumPy, Scikit-Learn, Joblib.
- **Testing**: Pytest, FastAPI TestClient.
