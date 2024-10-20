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
        self.stock_prices = [
            ["2023-12-01", 100],
            ["2023-12-04", 105],
            ["2023-12-05", 102],
            ["2023-12-06", 110],
        ]

        # Create trades object
        self.trades_obj = trades(ticker="AAPL", startDate='2023-12-01', endDate='2023-12-07')
        self.trades_obj.trades.append(trade('2023-12-01 00:00:00', 'buy', 5))
        self.trades_obj.trades.append(trade('2023-12-04 00:00:00', 'buy', 3))
        self.trades_obj.trades.append(trade('2023-12-05 00:00:00', 'sell', 8))

    def test_calculate_pnl_successful(self):
        endDate = '2023-12-06'
        
        # Expected result: Sell at 110, buy average price is ((10 * 100) + (5 * 102)) / 15 = 100.67
        expected_pnl = 1
        
        pnl = calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        self.assertAlmostEqual(pnl, expected_pnl, places=2)
        
        
    def test_no_price_data_for_trade_date(self):
        endDate = '2023-12-06'
        
        # Modify the first trade's timestamp to an unavailable date
        self.trades_obj.trades[0].timestamp = '2023-12-10 00:00:00'
        
        with self.assertRaises(ValueError) as context:
            calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        
        self.assertEqual(str(context.exception), "No stock price data available for 2023-12-10")
        
    def test_no_trades(self):
        endDate = '2023-12-06'
        
        # Empty trades list
        self.trades_obj.trades = []
        
        pnl = calculate_pnl(self.trades_obj, self.stock_prices, endDate)
        self.assertEqual(pnl, 0)

if __name__ == '__main__':
    unittest.main()
