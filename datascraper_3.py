import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import csv
import time
import os
import json

def get_headlines_for_date(date):
    url = f"https://www.wsj.com/news/archive/{date.strftime('%Y/%m/%d')}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    headlines = []
    # Look for common HTML elements that might contain headlines
    for headline_elem in soup.find_all(['h2', 'h3', 'a']):
        # Check if the element has text and a certain length
        if headline_elem.text and len(headline_elem.text.strip()) > 20:
            headlines.append(headline_elem.text.strip())
    
    # Remove duplicates and limit to top 5
    return list(dict.fromkeys(headlines))[40:]


def main():
    start_date = datetime(2022, 1, 15)
    end_date = datetime(2022, 12, 31)
    current_date = start_date
    
    json_file = 'wsj_2022_headlines.json'
    
    # Load existing data if the file exists
    if os.path.exists(json_file):
        with open(json_file, 'r') as file:
            all_headlines = json.load(file)
    else:
        all_headlines = {}

    while current_date <= end_date:
        date_str = current_date.strftime('%Y-%m-%d')
        print(f"Scraping headlines for {date_str}")
        
        # Skip if we already have data for this date
        if date_str not in all_headlines:
            headlines = get_headlines_for_date(current_date)
            all_headlines[date_str] = headlines
            
            # Write to JSON file after each day
            with open(json_file, 'w') as file:
                json.dump(all_headlines, file, indent=4)
        
        current_date += timedelta(days=1)
        time.sleep(2)  # Be respectful with request frequency

    print("Scraping completed.")


if __name__ == "__main__":
    main()
