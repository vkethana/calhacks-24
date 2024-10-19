import yfinance as yf
from datetime import datetime
from utils import *

def calculate_pnl_with_real_data(trades: trades, stock_symbol):
    """
    Calculate the realized PnL from a list of trades using real stock price data.

    Args:
        trades (list of dicts): List of trades. Each trade is a dictionary with
                                'timestamp', 'action' (buy/sell), 'volume', and 'price'.
        stock_symbol (str): Stock ticker symbol to fetch historical data for.

    Returns:
        float: The realized PnL of the trades.
    """
    return calculate_pnl(trades, yf)
    
    
def calculate_pnl(trades_obj, stock_data, endDate):
    # Variables to track cumulative buy and sell information
    total_buy_volume = 0
    total_buy_value = 0  # Buy value (volume * price)
    realized_pnl = 0
    
    for trade in trades_obj.trades:
        action = trade.action
        volume = trade.volume
        timestamp = trade.timestamp
        trade_date = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S').date()
        
        # Get the stock price at the time of the trade
        
        print(stock_data["Date"], trade_date)
        if trade_date in stock_data["Date"]:
            price = stock_data.loc[trade_date]['Close']
        else:
            raise ValueError(f"No stock price data available for {trade_date}")
        
        # Use the real price to calculate PnL
        if action == 'buy':
            total_buy_volume += volume
            total_buy_value += volume * price
            
        elif action == 'sell':
            if total_buy_volume >= volume:
                avg_buy_price = total_buy_value / total_buy_volume
                realized_pnl += volume * (price - avg_buy_price)
                total_buy_volume -= volume
                total_buy_value -= volume * avg_buy_price
            else:
                raise ValueError("Sell volume exceeds available buy volume.")
    
    return realized_pnl
