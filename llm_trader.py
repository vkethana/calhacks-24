from groq import Groq
import os
from utils import *
from datetime import datetime
import json

groq_api_key = os.environ["GROQ_API_KEY"]
available_models = ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it']

# Get the news headlines from fetch_headlines
def run_llm_trade(date, trading_history, headlines):
    # Get the news headlines
    curr_day = datetime.strftime(date, '%Y-%m-%d')
    headlines = headlines.get(curr_day, [])[:15]

    prompt = f"""
    You are a stock trading bot tasked with figuring out what stock trades to make. I will give you a list of news headlines, as well as a list of currently-held stocks. Your task is to determine which trades to make in order to maximize profit. You can make as many trades as you like, but your output must be in JSON format as follows:

    {{
      "trades": [
        {{
          "action": "BUY" or "SELL",
          "ticker": "STOCK_TICKER",
          "quantity": NUMBER_OF_SHARES
        }},
        ...
      ],
      "reasoning": "Your brief justification for the trades"
    }}

    You do not need to output any trades if you don't want to make any. The "trades" array can be empty.

    Note that if you are currently holding a stock, I will update you on what its original and current prices are.

    Here's the news headlines for the day:
    {headlines}

    And here's the stocks you currently hold: (Note: this may be empty)
    {str(trading_history)}

    Now please output your trades using the JSON format described above! Your output is going to get parsed by a Python script, so it's very important that you conform to the above format, otherwise your trades won't get executed. Remember to include your reasoning in the "reasoning" field of the JSON object. Please do NOT output anything besides the JSON output I just described. No introduction or conclusion messages, just the JSON output. Good luck!
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

    return res

# convert '2020-01-01' to datetime object
start_date = datetime.strptime('2022-01-01', '%Y-%m-%d')
end_date = datetime.strptime('2022-12-31', '%Y-%m-%d')
#trades = trades('AAPL', start_date, end_date)
with open('wsj_2022_headlines.json', 'r') as f:
    headlines = json.load(f)

llm_trade_date = datetime.strptime('2022-01-05', '%Y-%m-%d')

print(run_llm_trade(llm_trade_date, [], headlines))
# open up wsj_2022_headlines.json

