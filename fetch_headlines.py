import requests
from datetime import datetime
import os

def is_finance_related(article):
    # List of finance-related sections
    finance_sections = ['business', 'finance', 'economy', 'money', 'markets', 'your money']
    
    # List of finance-related keywords
    finance_keywords = ['stock', 'market', 'economy', 'finance', 'invest', 'trade', 'dollar', 'bank', 'fed', 'financial']
    
    # Check if the article's section is finance-related
    if 'section_name' in article and article['section_name'].lower() in finance_sections:
        return True
    
    # Check if any of the article's keywords are finance-related
    if 'keywords' in article:
        for keyword in article['keywords']:
            if keyword['name'] == 'subject' and any(k in keyword['value'].lower() for k in finance_keywords):
                return True
    
    # Check if the headline contains any finance-related keywords
    if any(keyword in article['headline']['main'].lower() for keyword in finance_keywords):
        return True
    
    return False

def get_finance_headlines(date, api_key):
    # Format the date
    formatted_date = date.strftime("%Y/-%m")
    formatted_date = "2022/1"
    
    # Construct the API URL
    url = f"https://api.nytimes.com/svc/archive/v1/{formatted_date}.json"
    
    # Set up the parameters
    params = {
        "api-key": api_key
    }
    
    # Make the request
    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        return f"ERROR"
    
    # Parse the JSON response
    data = response.json()
    
    # Extract finance-related headlines for the specific date
    headlines = []
    for article in data['response']['docs']:
        pub_date = datetime.strptime(article['pub_date'], "%Y-%m-%dT%H:%M:%S%z")
        if pub_date.date() == date.date() and is_finance_related(article):
            headlines.append(article['headline']['main'])
    
    return headlines

def fetch_headlines(date):
    # You should replace this with your actual NYT API key
    api_key = os.environ.get("NYT_API_KEY")
    if not api_key:
        print("Please set your NYT API key as an environment variable named NYT_API_KEY")

    # Iterate through all headlines between 2022-01-01 and 2022-01-07
    # And print results as a JSON
    headlines = get_finance_headlines(date, api_key)

# Example usage
if __name__ == "__main__":
    for i in range(1, 8):
        date = datetime(2022, 1, i)
        print(f"Top finance-related headlines for {date.strftime('%Y-%m-%d')}:")
        print(fetch_headlines(date))
        # Turn headlines into a JSON string
        print(headlines)
