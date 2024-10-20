from datetime import datetime

class trade:
    def __init__(self, time:datetime, action, volume):
        self.timestamp = time
        self.action = action
        self.volume = volume
        # self.price = price
    def __str__(self):
        return f"timestamp: {self.timestamp}, action: {self.action}, volume: {self.volume}, price: {self.price}"
