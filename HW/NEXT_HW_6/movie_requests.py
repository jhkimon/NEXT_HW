import requests

from bs4 import BeautifulSoup as bs
from datetime import datetime
from openpyxl import Workbook

url = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm"

try: 
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = bs(response.text, 'html.parser')

        containers = soup.find_all(class_="ipc-metadata-list-summary-item__c")

        wb = Workbook()
        ws = wb.active

        ws.append(["순위", "제목", "년도", "상영시간", "연령제한", "별점", "평가 인원 수"])

        for idx, container in enumerate(containers, start=1):
            # Initialize
            duration = ''
            film_guide = ''
            rate = ''
            vote_count = ''

            # Title
            title = container.find(class_="ipc-title__text").text


            # MetaData
            meta_data = container.find_all(class_="cli-title-metadata-item")
            meta_text = [x.text for x in meta_data]
            year = meta_text[0]
            for item in meta_text[1:]:
                if 'h' in item and 'm' in item:
                    hour, minute = map(int, item.replace('h',' ').replace('m','').split())
                    duration = hour * 60 + minute
                elif 'h' in item:
                    hour = int(item.replace('h',''))
                    duration = hour * 60
                elif 'm' in item:
                    minute = int(item.replace('m',''))
                    duration = minute
                else:
                    film_guide = item

            # Rating
            rate_elem = container.find(class_="ipc-rating-star")
            if len(rate_elem.text) > 4:
                rate = rate_elem.text.split()[0]
                vote_count = rate_elem.text.split()[1].strip('()')
                if 'K' in vote_count:
                    vote_count = int(float(vote_count.replace('K','')) * 1000)
                elif 'M' in vote_count:
                    vote_count = int(float(vote_count.replace('M','')) * 1000 * 1000)

            ws.append([idx, title, year, duration, film_guide, rate, vote_count])

        today = datetime.now().strftime('%Y%m%d')

        filename = f'top100_popular_movies_{today}.xlsx'
        wb.save(filename)
        print(f"엑셀 파일 저장 완료: {filename}")

    else:
        print(f"Response Status filed with code {response.status_code}")

except requests.exceptions.RequestException as e:
    print(f"Error: 요청 중 에러 발생 {e}")