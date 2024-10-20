import requests

import os

import requests

def get_financial_articles(api_key):
    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    query = "finance OR stock market OR Federal Reserve OR economy OR inflation OR earnings OR mergers OR interest rates"
    params = {
        "q": query,
        "begin_date": "20230101",
        "end_date": "20231231",
        "fq": "news_desk:(\"Business\" \"Finance\" \"Economy\")",
        "api-key": api_key
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    # Extract headlines from the response
    articles = [
        {
            "headline": article['headline']['main'],
            "pub_date": article['pub_date'],
            "web_url": article['web_url']
        }
        for article in data['response']['docs']
    ]
    
    return articles

# Example usage
api_key = "YOUR_API_KEY"
articles = get_financial_articles(api_key)
print(articles)

