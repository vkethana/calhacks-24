from datetime import datetime

class trade:
    def __init__(self, time:datetime, action, volume):
        self.timestamp = time
        self.action = action
        self.volume = volume
        # self.price = price
    def __str__(self):
        return f"timestamp: {self.timestamp}, action: {self.action}, volume: {self.volume}, price: {self.price}"
        
        
class trades:
    def __init__(self, ticker, startDate: datetime, endDate: datetime) -> None:
        self.ticker = ticker
        self.trades = []
        self.startDate = startDate
        self.endDate = endDate