from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from datetime import datetime
import time
import csv

chromedriver_path = "/Users/jhkim/Desktop/NEXT/develop-env/chromedriver-mac-arm64/chromedriver"
user_data_dir = "/Users/jhkim/Desktop/NEXT/Session/NEXT_Session_6/crawling"
url = "https://www.melon.com/index.htm"

chrome_options = Options()
chrome_options.add_argument(f"user-data-dir={user_data_dir}") # 쿠키, 캐시를 남길 수 있음.
service = Service(executable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)


# 1. 멜론 ? 버튼 클릭
driver.get(url)

time.sleep(1)
chartbtn = driver.find_element(By.XPATH, '//*[@id="gnb_menu"]/ul[1]/li[1]/a/span[2]')
chartbtn.click()
time.sleep(2)


# 2. 1위 곡명 가져오기
first = driver.find_element(By.XPATH, '//*[@id="lst50"]/td[6]/div/div/div[1]/span/a').text
second =  driver.find_element(By.XPATH, '//*[@id="lst50"]/td[6]/div/div/div[1]/span/a')
print(first)


# 3. 1~20위 곡명 가져오기: Full XPATH 활용해보기
for i in range(2,21):
    title = driver.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[1]/span/a').text
    print(title)

# 4. 스크롤 내리기

driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)
time.sleep(1)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# 5. 멜론 차트 50의 순위, 곡명, 가수 가져오기
infos = driver.find_elements(By.XPATH, '//*[@id="lst50"]')

for i, info in enumerate(infos, start=1):
    rank = i
    title = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[1]/span/a').text
    singer = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[2]/a').text

    print(rank, title, singer)


# 6. TO CSV
today = datetime.now().strftime("%Y%m%d")

file = open(f'{today}melon.csv', mode = 'w',newline='')
writer = csv.writer(file)
writer.writerow(["rank","title","singer"])

infos = driver.find_elements(By.XPATH, '//*[@id="lst50"]')

for i, info in enumerate(infos, start=1):
    rank = i
    title = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[1]/span/a').text
    singer = info.find_element(By.XPATH, f'/html/body/div/div[3]/div/div/div[3]/form/div/table/tbody/tr[{i}]/td[6]/div/div/div[2]/a').text

    writer.writerow([rank, title, singer])

file.close()
