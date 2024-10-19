class trade:
    def __init__(self, timestamp, action, volume, price):
        self.timestamp = timestamp
        self.action = action
        self.volume = volume
        self.price = price

        
class trades:
    def __init__(self, ticker, startDate, endDate) -> None:
        self.ticker = ticker
        self.trades = []
        self.startDate = startDate
        self.endDate = endDate

    def __str__(self):
        return f"Trades for {self.ticker} from {self.startDate} to {self.endDate}:\n" + "\n".join([f"{trade.timestamp}: {trade.action} {trade.volume} at {trade.price}" for trade in self.trades])
