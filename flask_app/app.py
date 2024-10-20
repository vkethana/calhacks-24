from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simple function to simulate a float return based on date
def calculate_value_from_date(date_str):
    base_date = datetime.strptime("2023-01-01", '%Y-%m-%d')
    selected_date = datetime.strptime(date_str, '%Y-%m-%d')
    days_diff = (selected_date - base_date).days
    return 100 + (days_diff * 0.1)  # A simple float calculation based on the number of days

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/get_value', methods=['POST'])
def get_value():
    data = request.get_json()
    selected_date = data.get('selected_date')
    
    # Simulate a float result based on the date
    result = calculate_value_from_date(selected_date)
    
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
