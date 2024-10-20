from datetime import datetime

class trade:
    def __init__(self, time, action, volume, ticker):
        #convert time to datetime object
        self.time = time
        self.action = action
        self.volume = volume
        self.ticker = ticker

    def __str__(self):
        return f"timestamp: {self.time}, action: {self.action}, volume: {self.volume} ticker: {self.ticker}"
    
    def __repr__(self):
        return f"timestamp: {self.time}, action: {self.action}, volume: {self.volume} ticker: {self.ticker}"
