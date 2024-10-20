import yfinance as yf
from datetime import datetime
from utils import *
import pandas as pd

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
    """calcualtes pnl given trades, truth, and end date

    Args:
        trades_obj (trades): trades object containing trades
        stock_data (2d array): n by 2 array of string(dates) and prices
        endDate (string): end date

    Raises:
        ValueError: _description_
        ValueError: _description_

    Returns:
        double: PnL
    """
    
    
    # Convert the 2D list to a dictionary for easy price lookup
    stock_prices = {str(time): price for time, price in stock_data}

    # Get the end date price
    end_date_price = stock_prices.get(endDate)
    
    # print("endprice", end_date_price)
    
    if end_date_price is None:
        raise ValueError(f"No stock price data available for {endDate}")

    total_unrealized_pnl = 0

    for trade in trades_obj.trades:
        action = trade.action
        volume = trade.volume
        
        # Convert the timestamp to a string in the same format
        timestamp = pd.to_datetime(trade.timestamp).strftime('%Y-%m-%d')

        # Ensure type consistency in the comparison
        if timestamp in stock_prices:
            trade_price = stock_prices[timestamp]
        else:
            raise ValueError(f"No stock price data available for {timestamp}")

        # Calculate the unrealized PnL
        if action == 'buy':
            total_unrealized_pnl += (end_date_price - trade_price) * volume  # Loss if sold at end price
            # print("buy profit", total_unrealized_pnl, trade_price, end_date_price, volume)
        elif action == 'sell':
            total_unrealized_pnl -= (end_date_price - trade_price) * volume  # Gain if sold at end price
            # print("sell profit", total_unrealized_pnl, trade_price, end_date_price, volume)

    return total_unrealized_pnl
