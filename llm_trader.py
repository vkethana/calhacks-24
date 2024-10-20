from groq import Groq
import os
from fetch_headlines import *
from utils import *
from datetime import datetime

groq_api_key = os.environ["GROQ_API_KEY"]
available_models = ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it']

# Get the news headlines from fetch_headlines
def run_llm_trade(date, current_trades):
    # Get the news headlines
    headlines = fetch_headlines(date)

    if headlines == "ERROR":
        return {
            "error_msg": headlines
        }

    prompt = f"""
    You are a stock trading bot tasked with figuring out what stock trades to make. I will give you a list of news headlines, as well as a list of currently-held stocks. Your task is to determine which trades to make in order to maximize profit. You can make as many trades as you like, but your output must conform to the following format:

    [BUY/SELL] [STOCK] [QUANTITY]

    You do not need to output any trades. If you want to do more than one trade, output each trade on a different line. Once you are done outputting all the trades, write a line called "Reasoning:". On this line, write some brief justifications behind your decisions. This doesn't have to be super long.

    Note that if you are currently holding a stock, I will update you on what its original and current prices are.

    Here's the news headlines for the day:
    {headlines}

    And here's the stocks you currently hold: (Note: this may be empty)
    {str(current_trades)}

    Now please output your trades using the format descibed above! Remember to output each trade on a separate line. Lastly, output a line containing "Reasoning:" followed by a brief explanation of your reasoning behind your decisions.
    """

    res = ""
    try:
        groq_client = Groq(
            api_key=groq_api_key,
        )

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model=available_models[0],
        )
        res = chat_completion.choices[0].message.content

    except Exception as e:
        print(f"Error: {e}")
        return {
            "error_msg": repr(e)
        }

    # Split response into lines
    trades = res.split("\n")
    reasoning = res[-1]

    return {
        "trades": trades,
        "reasoning": reasoning,
    }

# convert '2020-01-01' to datetime object
start_date = datetime.strptime('2020-01-01', '%Y-%m-%d')
end_date = datetime.strptime('2022-01-01', '%Y-%m-%d')
trades = trades('AAPL', start_date, end_date)

llm_trade_date = datetime.strptime('2021-01-01', '%Y-%m-%d')
print(run_llm_trade(llm_trade_date, trades))
