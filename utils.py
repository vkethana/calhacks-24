from datetime import datetime

class trade:
    def __init__(self, time: datetime, action, volume):
        self.timestamp = time
        self.action = action
        self.volume = volume

    def __str__(self):
        return f"timestamp: {self.timestamp}, action: {self.action}, volume: {self.volume}"

class trades:
    def __init__(self, ticker, startDate: datetime, endDate: datetime) -> None:
        self.ticker = ticker
        self.trades = []
        self.startDate = startDate
        self.endDate = endDate

    def __str__(self):
        return f"Trades for {self.ticker} from {self.startDate} to {self.endDate}:\n" + "\n".join(
            [f"{trade.timestamp}: {trade.action} {trade.volume}" for trade in self.trades]
        )
