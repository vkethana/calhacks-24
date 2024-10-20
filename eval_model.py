import yfinance as yf
from datetime import datetime, timedelta
from utils import *
import pandas as pd



def calculate_pnl_with_real_data(trades_obj: trades, endDate: datetime) -> float:
    """
    Calculate the realized PnL from a trades object using real stock price data.

    Args:
        trades_obj (trades): A trades object containing a list of trades.
        endDate (str): The end date for calculating PnL (format: 'YYYY-MM-DD').

    Returns:
        float: The realized PnL of the trades.
    """
    # Fetch historical stock price data using yfinance
    stock_data = yf.download(trades_obj.ticker, start=trades_obj.startDate, end=(endDate + timedelta(days=1)).strftime('%Y-%m-%d'))
    
    # Ensure the stock data is valid
    if stock_data.empty:
        raise ValueError(f"No stock data available for {trades_obj.ticker} in the specified range")

    # Extract relevant data (dates and adjusted close prices)
    stock_data = stock_data[['Adj Close']].reset_index()  # Only keep adjusted close prices

    # Display the stock data in a readable format
    print("\nDownloaded Stock Data (Date, Adjusted Close Price):\n")
    print(stock_data.to_string(index=False, header=["Date", "Adj Close"]))

    # Convert stock data to the format required by `calculate_pnl`
    stock_data_array = stock_data[['Date', 'Adj Close']].values.tolist()
    stock_data_for_pnl = [[row[0].strftime('%Y-%m-%d'), row[1]] for row in stock_data_array]

    # Use the existing `calculate_pnl` function
    return calculate_pnl(trades_obj, stock_data_for_pnl, endDate.strftime('%Y-%m-%d'))

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
