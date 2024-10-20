# import yfinance as yf
import yfinance_cache as yf
from datetime import datetime, timedelta
import pandas as pd
from utils import trade  # Assuming trade class is defined in utils

def calculate_pnl_with_real_data(trade_list: list[trade], endDate: datetime) -> float:
    """
    Calculate the realized PnL from a list of trades using real stock price data.

    Args:
        trade_list (list[trade]): A list containing trade objects.
        endDate (datetime): The end date for calculating PnL.

    Returns:
        float: The realized PnL of the trades.
    """
    # Create a dictionary to store stock data for each ticker
    stock_data_dict = {}

    # Fetch historical stock price data for each unique ticker in trade_list
    for trade in trade_list:
        ticker = trade.ticker  # Get the ticker from the trade object
        start_date = trade.time.strftime('%Y-%m-%d')  # Use the trade date as start date
        
        # Check if we already fetched data for this ticker
        if ticker not in stock_data_dict:
            try:
                # Attempt to download stock data
                stock_data = yf.download(ticker, start=start_date, end=(endDate + timedelta(days=1)).strftime('%Y-%m-%d'), valid_only=True)

                # Check if the 'Adj Close' column is present
                if 'Adj Close' not in stock_data.columns:
                    print(f"Error: 'Adj Close' column not found for {ticker}. Skipping this ticker.")
                    continue  # Skip this ticker if 'Adj Close' is missing

                # Ensure the stock data is valid
                if stock_data.empty:
                    print(f"Warning: No stock data available for {ticker} in the specified range.")
                    continue  # Skip this ticker if no data is returned
                
                # Extract relevant data (dates and adjusted close prices)
                stock_data = stock_data[['Adj Close']].reset_index()
                stock_data_array = stock_data[['Date', 'Adj Close']].values.tolist()
                stock_data_dict[ticker] = [[row[0].strftime('%Y-%m-%d'), row[1]] for row in stock_data_array]

            except Exception as e:
                # Log and skip the ticker if an error occurs (e.g., invalid ticker, delisted, missing data)
                print(f"Error fetching data for {ticker}: {e}")
                continue  # Skip this ticker and continue with the next

    # Use the existing `calculate_pnl` function for each ticker
    total_pnl = 0.0
    for t in trade_list:
        print("currently addressing ticker", t.ticker)
        if t.ticker in stock_data_dict:  # Ensure data exists for this ticker
            total_pnl += calculate_pnl([t], stock_data_dict[t.ticker], endDate.strftime('%Y-%m-%d'))
        else:
            print(f"Warning: Skipping PnL calculation for {t.ticker} due to missing data.")

    print("- FINAL PNL", total_pnl)
    return total_pnl



def calculate_pnl(trade_list: list[trade], stock_data: list[list], endDate: str) -> float:
    """Calculates PnL given trades, stock price data, and end date.

    Args:
        trade_list (list[trade]): List of trade objects containing trades.
        stock_data (list[list]): n by 2 array of string(dates) and prices.
        endDate (string): End date.

    Raises:
        ValueError: If stock price data is missing for the specified dates.

    Returns:
        float: PnL.
    """
    
    print("- recieved input", trade_list, stock_data, endDate)
    
    # Convert the 2D list to a dictionary for easy price lookup
    stock_prices = {str(time): price for time, price in stock_data}

    # Get the end date price
    end_date_price = stock_prices.get(endDate)
    
    if end_date_price is None:
        raise ValueError(f"No stock price data available for {endDate}")

    total_unrealized_pnl = 0

    for trade in trade_list:
        action = trade.action
        volume = trade.volume
        
        # Convert the timestamp to a string in the same format
        time = pd.to_datetime(trade.time).strftime('%Y-%m-%d')

        # Ensure type consistency in the comparison
        print(stock_prices)
        print(time)
        if time in stock_prices:
            trade_price = stock_prices[time]
        else:
            print("VALUE ERROR: PRICE DATE NOT FOUND IN HERE")
            print("*"*50)
            raise ValueError(f"No stock price data available for {time}")

        # Calculate the unrealized PnL
        if action.lower() == 'buy':
            print("currently addressing buy command")
            total_unrealized_pnl += (end_date_price - trade_price) * volume  # Loss if sold at end price
        elif action.lower() == 'sell':
            print("currently addressing sell commands")
            total_unrealized_pnl -= (end_date_price - trade_price) * volume  # Gain if sold at end price

    print("UNREALIZED PNL", total_unrealized_pnl)
    return total_unrealized_pnl
