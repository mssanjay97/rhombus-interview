from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/weapons')
def get_weapons():
    data = [
        {"name": "Missile A", "latitude": 37.4, "longitude": -122.1},
        {"name": "Missile B", "latitude": 37.42, "longitude": -122.12},
        {"name": "Tank C", "latitude": 37.43, "longitude": -122.13}
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
