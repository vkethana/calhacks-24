from flask import Flask, render_template, request, jsonify
from datetime import datetime
from flask_cors import CORS
import yfinance as yf
from utils import trades, trade
from eval_model import calculate_pnl_with_real_data

app = Flask(__name__)
CORS(app)

# Function to calculate PnL using the buy date and selected end date
def calculate_value_from_date(date_str, ticker):
    # Set the fixed start date and the selected end date
    start_date_str = "2023-12-01"  # Buy date
    end_date = datetime.strptime(date_str, '%Y-%m-%d')  # Use selected date from slider

    # Create trades object with sample trades
    trades_obj = trades(ticker=ticker, startDate=start_date_str, endDate=date_str)
    trades_obj.trades.append(trade('2023-12-01 00:00:00', 'buy', 1))  # Buy 1 shares on December 1
    trades_obj.trades.append(trade('2023-12-05 00:00:00', 'sell', 1))  # Buy 1 shares on December 1

    # Call the function to calculate PnL using real stock data
    return calculate_pnl_with_real_data(trades_obj, end_date)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/get_value', methods=['POST'])
def get_value():
    data = request.get_json()
    selected_date = data.get('selected_date')
    ticker = data.get('ticker', 'AAPL')  # Default ticker symbol if not provided

    # Calculate the result based on selected date and ticker
    try:
        result = calculate_value_from_date(selected_date, ticker)
        return jsonify({'result': result})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
