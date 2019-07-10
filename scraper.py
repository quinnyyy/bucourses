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


def getClassDetails(code):
    urlFront = 'https://www.bu.edu/academics/'
    urlBack = '/courses/'
    college = code.split('-')[0]
    url = urlFront + college + urlBack + code

    soup = getSoup(url)
    courseContentDiv = soup.find("div", {"id": "course-content"})
    description = courseContentDiv.find('p', recursive=False).contents[0]
    hubUl = courseContentDiv.find('ul', {"class": "cf-hub-offerings"})
    hubList = []
    for li in hubUl.find_all('li', recursive=False):
        hubList.append(li.contents[0])
    infoBoxDiv = courseContentDiv.find("div", {"id": "info-box"})
    credits = infoBoxDiv.find_all("dd")[0].contents[0]
    # Have to get prerequisites
    # Have to get schedule
    print(description)
    print(hubList)
    print(credits)
