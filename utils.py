

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