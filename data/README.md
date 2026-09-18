# Indian Road Accident Dataset (2022–2025)

## Overview
This directory contains `accidents.csv`, which is the primary dataset for **SafeRoute AI**. The dataset consists of 20,000 accident records across major Indian cities and highway corridors.

## Source & Attribution
- **Dataset Title**: Indian Road Accident Dataset 2022–2025
- **Dataset Author**: Sehaj (`sehaj1104`)
- **Source Link**: [Kaggle Dataset Link](https://www.kaggle.com/datasets/sehaj1104/indian-road-accident-dataset-20222025)
- **License / Usage Notice**: Free for educational, academic, and research purposes. Dataset documentation notes that some spatial coordinates and contextual attributes are synthetically generated for analytical context.

## Column Dictionary (24 Columns)
- `accident_id`: Unique identifier for each accident record
- `city`: City location (e.g., Pune, Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Chandigarh)
- `state`: State location
- `latitude`: Geolocation latitude
- `longitude`: Geolocation longitude
- `date`: Date of incident
- `time`: Time of incident
- `hour`: Hour of day (0 to 23)
- `day_of_week`: Day of week (Monday–Sunday)
- `is_weekend`: Binary flag (1 = Weekend, 0 = Weekday)
- `road_type`: Road category (highway, urban, rural)
- `lanes`: Number of traffic lanes
- `traffic_signal`: Binary flag (1 = Signal Present, 0 = No Signal)
- `weather`: Weather condition (clear, rain, fog)
- `visibility`: Visibility level (high, medium, low)
- `temperature`: Temperature in °C
- `traffic_density`: Traffic density (low, medium, high)
- `cause`: Reported cause of incident
- `accident_severity`: ML Target Variable (`minor`, `major`, `fatal`)
- `vehicles_involved`: Outcome variable (Excluded from training to prevent data leakage)
- `casualties`: Outcome variable (Excluded from training to prevent data leakage)
- `is_peak_hour`: Binary flag (1 = Peak/Rush Hour, 0 = Off-peak)
- `festival`: Contextual festival tag (Diwali, Holi, Eid, New Year, or None)
- `risk_score`: Existing risk score (0.00 to 1.00) used for analytics and visualization
