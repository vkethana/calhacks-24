import requests
import datetime
import time
import os

def get_wayback_url(url, timestamp):
    return f"http://web.archive.org/web/{timestamp}/{url}"

def download_page(url, output_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(response.text)
        print(f"Downloaded: {output_path}")
    else:
        print(f"Failed to download: {url}")

def main():
    target_url = "https://drudgereport.com/"
    output_dir = "drudgereport_archives"
    os.makedirs(output_dir, exist_ok=True)

    start_date = datetime.date(2023, 1, 17)
    end_date = datetime.date(2023, 12, 31)
    current_date = start_date

    while current_date <= end_date:
        timestamp = current_date.strftime("%Y%m%d")
        wayback_url = get_wayback_url(target_url, timestamp)
        output_path = os.path.join(output_dir, f"drudgereport_{timestamp}.html")
        
        download_page(wayback_url, output_path)
        
        current_date += datetime.timedelta(days=1)
        time.sleep(1)  # Be respectful to the Wayback Machine's servers

if __name__ == "__main__":
    main()
