from flask import Flask, render_template, request, jsonify
from datetime import datetime
from flask_cors import CORS
from utils import trade
from eval_model import calculate_pnl_with_real_data
from llm_trader import run_llm_trade
import json

app = Flask(__name__)
CORS(app)

# Load news data from the JSON file
with open('wsj_2022_headlines.json') as news_file:
    news_data = json.load(news_file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/get_news', methods=['POST'])
def get_news():
    data = request.get_json()
    trading_date = data.get('trading_date')

    return jsonify(news_data.get(trading_date, ["ERROR: No news data for " + trading_date]))

@app.route('/api/get_trades_and_pnl', methods=['POST'])
def get_trades_and_pnl():
    print("call to get value")
    data = request.get_json()
    trading_date = data.get('trading_date')
    evaluation_date = data.get('evaluation_date')

    print("TRADING DATE", trading_date)
    print("EVALUATION DATE", evaluation_date)

    # Run LLM to generate trades based on trading_date and headlines
    trades_data = run_llm_trade(trading_date, trading_history=None, headlines=news_data)
    print("daddaaa", trades_data)
    print("daddaaa", trades_data.keys())

    # Convert incoming trade data to trade objects
    trades_list = []
    for cur_trade in trades_data["trades"]:
        if cur_trade.get('action') is None:
            continue
        timestamp = trading_date
        action = cur_trade.get('action')
        volume = cur_trade.get('volume')
        ticker = cur_trade.get('ticker', 'AAPL')  # Default ticker symbol if not provided
        new_trade = trade(datetime.strptime(timestamp, '%Y-%m-%d'), action, volume, ticker)
        trades_list.append(new_trade)

    # Calculate the result based on the evaluation date and trades
    try:
        pnl_result = calculate_pnl_with_real_data(trades_list, datetime.strptime(evaluation_date, '%Y-%m-%d'))
        return jsonify({
            'trades': trades_data,
            'result': pnl_result
        })
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
