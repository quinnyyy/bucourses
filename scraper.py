import requests
from bs4 import BeautifulSoup


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

    for li in courseFeedDiv.find_all('li', recursive=False):
        name = li.find('a').find('strong')
        print(name.contents)


colleges = ['khc', 'cas', 'com', 'eng', 'cfa', 'cgs', 'sar', 'gms', 'grs',
            'sdm', 'met', 'questrom', 'sha', 'law', 'busm', 'sph', 'ssw',
            'sth', 'wheelock']

numPages = []

urlFront = 'https://www.bu.edu/academics/'
urlBack = '/courses/'

for college in colleges:
    numPages.append(getNumPages(urlFront + college + urlBack))

for i, college in enumerate(colleges):
    url = urlFront + college + urlBack
    for pageNumber in range(1, numPages[i] + 1):
        getClassInfoFromPage(url + str(pageNumber))


print('done')