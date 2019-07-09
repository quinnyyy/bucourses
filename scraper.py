import requests
import urllib.request
import time
from bs4 import BeautifulSoup

url = 'https://www.bu.edu/academics/cas/courses/'
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")
courseFeedDiv = soup.find("ul", {"class": "course-feed"})

for li in courseFeedDiv.find_all('li', recursive=False):
    name = li.find('a').find('strong')
    print(name.contents)