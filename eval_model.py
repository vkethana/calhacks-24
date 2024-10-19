
import yfinance as yf
from datetime import datetime

def calculate_trade_profit(ticker, shares, buy_date, sell_date):
    # Convert date strings to datetime objects
    buy_date = datetime.strptime(buy_date, "%Y-%m-%d")
    sell_date = datetime.strptime(sell_date, "%Y-%m-%d")
    
    # Create a Ticker object
    stock = yf.Ticker(ticker)
    
    # Fetch historical data
    hist = stock.history(start=buy_date, end=sell_date)
    
    if hist.empty:
        return "Error: No data available for the specified date range."
    
    # Get buy and sell prices
    buy_price = hist['Close'][0]  # First day's closing price
    sell_price = hist['Close'][-1]  # Last day's closing price
    
    # Calculate profit/loss
    initial_investment = buy_price * shares
    final_value = sell_price * shares
    profit = final_value - initial_investment
    percent_return = (profit / initial_investment) * 100
    
    return {
        "ticker": ticker,
        "shares": shares,
        "buy_date": buy_date.strftime("%Y-%m-%d"),
        "sell_date": sell_date.strftime("%Y-%m-%d"),
        "buy_price": round(buy_price, 2),
        "sell_price": round(sell_price, 2),
        "initial_investment": round(initial_investment, 2),
        "final_value": round(final_value, 2),
        "profit": round(profit, 2),
        "percent_return": round(percent_return, 2)
    }

# Example usage
result = calculate_trade_profit("AAPL", 100, "2019-10-18", "2020-11-09")
print(result)
