from flask import Flask, render_template, request, jsonify
from datetime import datetime
from flask_cors import CORS
from utils import trade
from eval_model import calculate_pnl_with_real_data

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/get_value', methods=['POST'])
def get_value():
    data = request.get_json()
    selected_date = data.get('selected_date')
    trades_data = data.get('trades', [])

    # Convert incoming trade data to trade objects
    trades_list = []
    for trade_data in trades_data:
        timestamp = trade_data.get('timestamp')
        action = trade_data.get('action')
        volume = trade_data.get('volume')
        ticker = trade_data.get('ticker', 'AAPL')  # Default ticker symbol if not provided
        new_trade = trade(datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S'), action, volume, ticker)
        trades_list.append(new_trade)

    # Calculate the result based on selected date and trades
    try:
        result = calculate_pnl_with_real_data(trades_list, datetime.strptime(selected_date, '%Y-%m-%d'))
        return jsonify({'result': result})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
