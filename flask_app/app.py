from flask import Flask, render_template, request, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
from utils import *
from eval_model import calculate_pnl_with_real_data

app = Flask(__name__)
CORS(app)

# Simple function to simulate a float return based on date
def calculate_value_from_date(date_str):
    ticker = "AAPL"
    start_date = "2023-12-01"

    # Create trades object
    trades_obj = trades(ticker="AAPL", startDate=start_date, endDate="2023-12-05")
    trades_obj.trades.append(trade('2023-12-01 00:00:00', 'buy', 1))
    return calculate_pnl_with_real_data(trades_obj, end_date)

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
