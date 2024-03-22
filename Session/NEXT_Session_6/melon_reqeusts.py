import requests

from bs4 import BeautifulSoup as bs
from datetime import datetime
from openpyxl import Workbook

url = "https://www.melon.com/chart/index.htm"

try: 
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        html_text = response.text

        soup = bs(response.text, 'html.parser')
        titles = soup.find_all(class_='rank01')
        titles = list(map(lambda x: x.text.strip(), titles))

        artists = soup.select('.rank02 > a')
        artists = list(map(lambda x: x.text, artists))

        wb = Workbook()
        ws = wb.active

        ws.append(["순위", "제목", "아티스트"])

        for i, (title, artist) in enumerate(zip(titles, artists), start= 1):
            ws.append([i, title, artist])


        today = datetime.now().strftime('%Y%m%d')

        filename = f'melon_chart_{today}.xlsx'
        wb.save(filename)
        print(f"엑셀 파일 저장 완료: {filename}")

    else:
        print(f"Response Status filed with code {response.status_code}")

except requests.exceptions.RequestException as e:
    print(f"Error: 요청 중 에러 발생 {e}")