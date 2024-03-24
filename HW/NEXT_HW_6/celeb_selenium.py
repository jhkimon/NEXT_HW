from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from datetime import datetime
import time
import csv
import calendar

chromedriver_path = "/Users/jhkim/Desktop/NEXT/develop-env/chromedriver-mac-arm64/chromedriver"

month = datetime.now().month
year = datetime.now().year
print(f'이번 달은 {month}월입니다. {month}월에 태어난 유명인은 누구일까요?')
last_day_of_month = calendar.monthrange(year, month)[1]

service = Service(executable_path=chromedriver_path)
driver = webdriver.Chrome(service=service)


file_name = f'celeb_birthday_{month}월.csv'
file = open(file_name, mode='w', newline='')

writer = csv.writer(file)
writer.writerow(["날짜", "유명인 순위", "이름", "대표 직업", "유명 작품"])

for day in range(1, last_day_of_month + 1):
    url = f"https://www.imdb.com/search/name/?birth_monthday={month:02d}-{day:02d}"
    driver.get(url)
    time.sleep(1) 
    print(f'{month}월 {day}일이 생일인 유명인을 수집하고 있습니다.')
    for idx in range(1, 51):
        name = driver.find_element(By.XPATH, f'//*[@id="__next"]/main/div[2]/div[3]/section/section/div/section/section/div[2]/div/section/div[2]/div[2]/ul/li[{idx}]/div/div/div/div[1]/div[1]/div[2]/div[2]/a/h3').text
        famous = driver.find_element(By.XPATH, f'//*[@id="__next"]/main/div[2]/div[3]/section/section/div/section/section/div[2]/div/section/div[2]/div[2]/ul/li[{idx}]/div/div/div/div[1]/div[1]/div[2]/div[3]/a').text
        try:
            job = driver.find_element(By.XPATH, f'//*[@id="__next"]/main/div[2]/div[3]/section/section/div/section/section/div[2]/div/section/div[2]/div[2]/ul/li[{idx}]/div/div/div/div[1]/div[1]/div[2]/div[3]/ul/li[1]').text
        except:
            job = ""
        name = name.split('.')[1].strip()
        writer.writerow([f'{month:02d}-{day:02d}', idx, name, job, famous])

file.close()
driver.quit()

print(f'유명인 정보를 {file_name} 파일에 저장했습니다.')