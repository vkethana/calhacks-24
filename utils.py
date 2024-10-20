from datetime import datetime

class trade:
    def __init__(self, time, action, volume, ticker):
        #convert time to datetime object
        self.time = datetime.strptime(time, '%Y-%m-%d %H:%M:%S')
        self.action = action
        self.volume = volume
        self.ticker = ticker

    def __str__(self):
        return f"timestamp: {self.timestamp}, action: {self.action}, volume: {self.volume}"
