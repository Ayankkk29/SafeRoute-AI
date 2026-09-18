import os
import pandas as pd

def load_accident_data(file_path: str = None) -> pd.DataFrame:
    """
    Load the Indian Road Accident Dataset CSV file.
    Default path: data/accidents.csv
    """
    if file_path is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        file_path = os.path.join(base_dir, "data", "accidents.csv")
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset not found at {file_path}")
        
    df = pd.read_csv(file_path)
    return df

if __name__ == "__main__":
    df = load_accident_data()
    print(f"Loaded dataset successfully. Shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")
