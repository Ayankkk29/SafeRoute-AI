# Problem Statement: SafeRoute AI — Road Accident Risk & Severity Analysis System

## Problem Statement
Road accidents represent a critical public safety challenge in India, leading to loss of life, severe injuries, and traffic disruption. Evaluating the interplay between environmental factors (weather, visibility, temperature), temporal conditions (hour of day, weekend, peak hours, festival contexts), and road layout (road type, lanes, traffic signals) is essential for proactive accident risk mitigation. Current analysis tools often lack predictive capabilities or easy-to-understand academic interfaces.

## Scope
SafeRoute AI is an academic AI/ML project designed to analyze accident records from the **Indian Road Accident Dataset 2022–2025** (20,000 records). The dataset documentation notes that some spatial/contextual attributes are synthetically generated.

The scope encompasses:
1. Multiclass Machine Learning classification to predict accident severity (`Minor`, `Major`, `Fatal`).
2. Data preprocessing, column transformation, and pipeline serialization using Scikit-Learn and Joblib.
3. Comparative evaluation of Logistic Regression, Decision Tree, and Random Forest models.
4. Interactive REST API backend built using FastAPI and SQLite providing **on-demand ML severity predictions**.
5. React web dashboard with interactive charts, geospatial hotspot map, and model evaluation metrics.

*Out of Scope*: Real-time traffic routing, live weather API integrations, mobile app development, or cloud microservice deployment.

## Target Users
1. Academic Examiners & Faculty Evaluators during Viva examinations.
2. Transportation & Traffic Safety Analysts analyzing historical incident trends.
3. Engineering Students demonstrating AI/ML classification and full-stack integration concepts.

## Objectives
- Build a fully functional, reproducible Machine Learning pipeline without hardcoded metrics.
- Provide on-demand ML severity predictions with confidence percentages based on user-entered environmental conditions.
- Categorize historical dataset risk scores (`0.00–0.33 Low Risk`, `0.34–0.66 Medium Risk`, `0.67–1.00 High Risk`).
- Provide interactive visual analytics across weather, road type, time, day, and city.
- Fulfill all academic project guidelines and documentation standards.

## High-Level Features
- **Summary Dashboard**: Key statistical indicators and distribution breakdown.
- **Accident Severity Predictor**: On-demand ML inference form with class probability breakdown.
- **Accident Analytics**: Filterable charts (Recharts) by City, Weather, Severity, and Road Type.
- **Accident Risk Hotspot Map**: Interactive Leaflet map visualizing historical incident markers and risk levels.
- **Model Performance Evaluator**: Comparative performance matrix, confusion matrix, and classification report.

## Functional Requirements
- **FR-1**: The backend MUST train and evaluate Logistic Regression, Decision Tree, and Random Forest models on an 80/20 stratified train/test split.
- **FR-2**: The system MUST automatically select the best model based on weighted F1-score and save it to `ml/model.pkl`.
- **FR-3**: The prediction API MUST accept environmental inputs and return predicted severity class and confidence score.
- **FR-4**: The system MUST store user prediction requests in an SQLite database.
- **FR-5**: The frontend MUST dynamically fetch data from the REST API endpoints without hardcoded stats.

## Non-Functional Requirements
1. **Performance**: API responses for prediction and summary analytics execute under 200 ms.
2. **Usability**: Clean, intuitive dark-mode interface usable without prior technical training.
3. **Reliability**: Pydantic input validation handles invalid or missing inputs gracefully without server crashes.
4. **Maintainability**: Modular architecture separating ML logic, API handlers, database queries, and UI components.

## Results & Limitations Rationale
- **Model Performance**: The weighted F1 scores achieved on the test set range from `0.39` to `0.43`. This relatively modest predictive performance indicates that the available contextual features have limited capability to uniquely distinguish accident severity, highlighting the difficulty of severity prediction and providing clear scope for future feature engineering.

## Technologies Used
- **Frontend**: React (Vite), JavaScript, Tailwind CSS, Recharts, Leaflet, React-Leaflet, Lucide Icons.
- **Backend**: Python 3.10+, FastAPI, Pydantic, Uvicorn, SQLite.
- **Machine Learning**: Pandas, NumPy, Scikit-Learn, Joblib.
- **Testing**: Pytest, FastAPI TestClient.
