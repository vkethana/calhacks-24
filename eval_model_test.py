import unittest
from unittest.mock import MagicMock
from datetime import datetime
import pandas as pd
import yfinance as yf
from eval_model import calculate_pnl
from utils import *

class TestCalculatePnL(unittest.TestCase):
    def setUp(self):
        # Define the ticker symbol and date range for downloading stock data
        ticker = "AAPL"
        start_date = "2023-12-01"
        end_date = "2023-12-07"

        # Download the stock data using yfinance
        self.stock_prices = pd.read_csv("./test/AAPL_stock_prices_dec_2023.csv")
        self.stock_prices["Date"] = pd.to_datetime(self.stock_prices["Date"])

        # Create trades object
        self.trades_obj = trades(ticker="AAPL", startDate='2023-12-01', endDate='2023-12-07')
        self.trades_obj.trades.append(trade('2023-12-01 10:00:00', 'buy', 10, 100))
        self.trades_obj.trades.append(trade('2023-12-03 10:00:00', 'buy', 5, 102))
        self.trades_obj.trades.append(trade('2023-12-04 10:00:00', 'sell', 8, 110))

    def test_calculate_pnl_successful(self):
        endDate = '2023-12-07'
        
        # Expected result: Sell at 110, buy average price is ((10 * 100) + (5 * 102)) / 15 = 100.67
        expected_pnl = 8 * (110 - 100.67)
        
        pnl = calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        self.assertAlmostEqual(pnl, expected_pnl, places=2)
        
    def test_sell_more_than_available(self):
        endDate = '2023-12-07'
        
        # Add another trade to sell more than available
        self.trades_obj.trades.append(trade('2023-12-04 15:00:00', 'sell', 10, 110))
        
        with self.assertRaises(ValueError) as context:
            calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        
        self.assertEqual(str(context.exception), "Sell volume exceeds available buy volume.")
        
    def test_no_price_data_for_trade_date(self):
        endDate = '2023-12-07'
        
        # Modify the first trade's timestamp to an unavailable date
        self.trades_obj.trades[0].timestamp = '2023-12-10 10:00:00'
        
        with self.assertRaises(ValueError) as context:
            calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        
        self.assertEqual(str(context.exception), "No stock price data available for 2023-12-10")
        
    def test_no_trades(self):
        endDate = '2023-12-07'
        
        # Empty trades list
        self.trades_obj.trades = []
        
        pnl = calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        self.assertEqual(pnl, 0)

if __name__ == '__main__':
    unittest.main()
