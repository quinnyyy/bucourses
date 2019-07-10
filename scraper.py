import requests
from bs4 import BeautifulSoup
from functools import reduce


def getSoup(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    return soup


def getNumPages(url):
    soup = getSoup(url)
    numPagesDiv = soup.find("div", {"class": "pagination"})
    if numPagesDiv is None:
        return 1
    else:
        return int(numPagesDiv.find_all("span")[-1].find("a").contents[0])


def getClassInfoFromPage(url):
    soup = getSoup(url)
    courseFeedDiv = soup.find("ul", {"class": "course-feed"})
    classes = []
    for li in courseFeedDiv.find_all('li', recursive=False):
        name = li.find('a').find('strong')
        classes.append(name.contents)
    classes = reduce(lambda x, y: x + y, classes)
    return classes
