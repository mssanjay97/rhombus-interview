from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Path to your data file
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'weapons_data.csv')

def load_and_clean_data():
    """
    Loads weapons data from CSV, performs basic cleaning and type conversion.
    """
    try:
        df = pd.read_csv(DATA_FILE)
        # Basic cleaning: Ensure required columns exist and are of correct type
        required_columns = ['id', 'type', 'latitude', 'longitude', 'status', 'last_reported_at']
        if not all(col in df.columns for col in required_columns):
            raise ValueError(f"Missing required columns. Expected: {required_columns}")

        df['latitude'] = pd.to_numeric(df['latitude'], errors='coerce')
        df['longitude'] = pd.to_numeric(df['longitude'], errors='coerce')
        df['last_reported_at'] = pd.to_datetime(df['last_reported_at'], errors='coerce')

        # Drop rows with NaN values in critical columns
        df.dropna(subset=['latitude', 'longitude', 'last_reported_at'], inplace=True)

        # Algorithmic component: Simulate adding a 'risk_score' based on status
        # This can be expanded to more complex algorithms (e.g., proximity to sensitive areas)
        def calculate_risk_score(status):
            if status == 'Active':
                return 5
            elif status == 'Maintenance':
                return 3
            else:
                return 1
        df['risk_score'] = df['status'].apply(calculate_risk_score)

        app.logger.info("Data loaded and cleaned successfully.")
        return df.to_dict(orient='records')
    except Exception as e:
        app.logger.error(f"Error loading or cleaning data: {e}")
        return []

# Load data on startup
WEAPONS_DATA = load_and_clean_data()

@app.route('/api/weapons', methods=['GET'])
def get_weapons():
    """
    Returns all weapons data, with optional filtering.
    Filters: type, status, min_risk_score.
    """
    filtered_data = WEAPONS_DATA

    weapon_type = request.args.get('type')
    status = request.args.get('status')
    min_risk_score = request.args.get('min_risk_score', type=int)

    if weapon_type:
        filtered_data = [w for w in filtered_data if w['type'].lower() == weapon_type.lower()]
    if status:
        filtered_data = [w for w in filtered_data if w['status'].lower() == status.lower()]
    if min_risk_score is not None:
        filtered_data = [w for w in filtered_data if w['risk_score'] >= min_risk_score]

    return jsonify(filtered_data)

@app.route('/api/weapon_types', methods=['GET'])
def get_weapon_types():
    """
    Returns a list of unique weapon types.
    """
    types = list(set([w['type'] for w in WEAPONS_DATA]))
    return jsonify(types)

@app.route('/api/statuses', methods=['GET'])
def get_statuses():
    """
    Returns a list of unique statuses.
    """
    statuses = list(set([w['status'] for w in WEAPONS_DATA]))
    return jsonify(statuses)

@app.route('/api/data_summary', methods=['GET'])
def get_data_summary():
    """
    Returns a summary of weapons data, e.g., count by type or status.
    This demonstrates the "plot based on event data and defined needs" part.
    """
    df = pd.DataFrame(WEAPONS_DATA)
    if df.empty:
        return jsonify({"message": "No data available"}), 200

    summary_by_type = df.groupby('type').size().to_dict()
    summary_by_status = df.groupby('status').size().to_dict()

    # Example: Most recently reported weapon
    most_recent = df.sort_values(by='last_reported_at', ascending=False).iloc[0].to_dict() if not df.empty else None

    return jsonify({
        "summary_by_type": summary_by_type,
        "summary_by_status": summary_by_status,
        "most_recent_report": most_recent
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)