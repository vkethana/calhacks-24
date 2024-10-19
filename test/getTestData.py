import yfinance as yf
import pandas as pd

# Define the ticker symbol and date range
ticker = "AAPL"
start_date = "2023-12-01"
end_date = "2023-12-07"

# Download the stock data using yfinance
df = yf.download(ticker, start=start_date, end=end_date)

# Save the DataFrame to a CSV file
df.to_csv("./test/AAPL_stock_prices_dec_2023.csv")

# Display a message confirming the save
print("Data saved to AAPL_stock_prices_dec_2023.csv")
