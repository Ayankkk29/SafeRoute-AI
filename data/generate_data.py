import numpy as np
import pandas as pd

np.random.seed(42)

n_samples = 600

weathers = ['Clear', 'Rainy', 'Foggy', 'Snowy']
weather_weights = [0.50, 0.30, 0.15, 0.05]

road_conditions = ['Dry', 'Wet', 'Icy', 'Under Construction']
road_weights = [0.55, 0.30, 0.05, 0.10]

traffic_levels = ['Low', 'Medium', 'High']
traffic_weights = [0.35, 0.40, 0.25]

visibilities = ['High', 'Medium', 'Low']
visibility_weights = [0.60, 0.25, 0.15]

days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_weights = [0.14, 0.14, 0.14, 0.14, 0.15, 0.15, 0.14]

road_types = ['Single Lane', 'Dual Carriageway', 'Highway', 'Urban Road']
road_type_weights = [0.25, 0.35, 0.25, 0.15]

speed_limits = [30, 50, 80, 100]
speed_limit_weights = [0.20, 0.40, 0.25, 0.15]

# Center near Vellore (VIT Campus region: ~12.9692, 79.1559)
latitudes = np.random.uniform(12.9000, 13.0200, n_samples)
longitudes = np.random.uniform(79.1000, 79.2200, n_samples)

data = []

for i in range(n_samples):
    acc_id = f"ACC{i+1:04d}"
    lat = round(latitudes[i], 5)
    lng = round(longitudes[i], 5)
    
    w = np.random.choice(weathers, p=weather_weights)
    rc = np.random.choice(road_conditions, p=road_weights)
    tr = np.random.choice(traffic_levels, p=traffic_weights)
    vis = np.random.choice(visibilities, p=visibility_weights)
    hr = np.random.randint(0, 24)
    day = np.random.choice(days, p=day_weights)
    rt = np.random.choice(road_types, p=road_type_weights)
    spd = np.random.choice(speed_limits, p=speed_limit_weights)
    
    # Calculate deterministic base risk score with noise
    score = 20.0
    
    # Weather factors
    if w == 'Rainy': score += 15
    elif w == 'Foggy': score += 20
    elif w == 'Snowy': score += 25
    
    # Road condition
    if rc == 'Wet': score += 12
    elif rc == 'Icy': score += 22
    elif rc == 'Under Construction': score += 18
    
    # Traffic
    if tr == 'High': score += 15
    elif tr == 'Medium': score += 8
    
    # Visibility
    if vis == 'Low': score += 18
    elif vis == 'Medium': score += 8
    
    # Time / Night factor (10 PM to 5 AM)
    if hr >= 22 or hr <= 5:
        score += 15
    
    # Speed limit
    if spd >= 80:
        score += 12
        
    # Random Gaussian noise
    score += np.random.normal(0, 5)
    score = float(np.clip(score, 5, 98))
    
    # Risk Level mapping
    if score >= 65:
        risk_level = 'HIGH'
        severity = np.random.choice(['Serious', 'Fatal'], p=[0.7, 0.3])
    elif score >= 40:
        risk_level = 'MEDIUM'
        severity = np.random.choice(['Slight', 'Serious'], p=[0.6, 0.4])
    else:
        risk_level = 'LOW'
        severity = 'Slight'
        
    data.append({
        'accident_id': acc_id,
        'latitude': lat,
        'longitude': lng,
        'weather': w,
        'road_condition': rc,
        'traffic_level': tr,
        'visibility': vis,
        'hour': hr,
        'day_of_week': day,
        'road_type': rt,
        'speed_limit': spd,
        'accident_severity': severity,
        'risk_score': round(score, 1),
        'risk_level': risk_level
    })

df = pd.DataFrame(data)
df.to_csv(r'C:\Users\ayank\.gemini\antigravity\scratch\SafeRoute-AI\data\accidents.csv', index=False)
print(f"Generated {len(df)} accident records successfully.")
print(df['risk_level'].value_counts())
