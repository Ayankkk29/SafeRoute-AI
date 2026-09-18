import sqlite3
import os
import pandas as pd

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "saferoute.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create predictions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        city TEXT,
        road_type TEXT,
        lanes INTEGER,
        traffic_signal INTEGER,
        weather TEXT,
        visibility TEXT,
        temperature REAL,
        traffic_density TEXT,
        hour INTEGER,
        day_of_week TEXT,
        is_weekend INTEGER,
        is_peak_hour INTEGER,
        festival TEXT,
        predicted_severity TEXT,
        confidence_percentage REAL
    );
    """)
    
    # Check if accidents table exists, if not load from data/accidents.csv
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='accidents'")
    table_exists = cursor.fetchone()
    
    if not table_exists:
        csv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "accidents.csv")
        if os.path.exists(csv_path):
            print(f"Initializing SQLite 'accidents' table from {csv_path}...")
            df = pd.read_csv(csv_path)
            # Standardize column names if needed
            df.to_sql("accidents", conn, if_exists="replace", index=False)
            print("Successfully populated 'accidents' table in SQLite.")
            
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
