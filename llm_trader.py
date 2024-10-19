prompt = """
You are a stock trading bot tasked with figuring out what stock trades to make. I will give you a list of news headlines, as well as a list of currently-held stocks. Your task is to determine which trades to make in order to maximize profit. You can make as many trades as you like, but your output must conform to the following format:

[BUY/SELL] [STOCK] [QUANTITY]

You do not need to output any trades. If you want to do more than one trade, output each trade on a different line. Once you are done outputting all the trades, write a line called "Reasoning:". On this line, write some brief justifications behind your decisions. This doesn't have to be super long.

Note that if you are currently holding a stock, I will update you on what its original and current prices are.

Here's the news headlines for the day:

And here's the stocks you currently hold: (May be empty)
[]

Now please output your trades using the format descibed above! Remember to output each trade on a separate line. Lastly, output a line containing "Reasoning:" followed by a brief explanation of your reasoning behind your decisions.
"""

# Get the news headlines from fetch_headlines
def run_llm_trade(date):
    # Get the news headlines
    headlines = fetch_headlines(date)

    # Get the stocks you currently hold
    # asssume this is 
