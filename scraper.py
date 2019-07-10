import requests
from bs4 import BeautifulSoup
from functools import reduce


class Scraper:
    @staticmethod
    def getSoup(url):
        response = requests.get(url)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup

    @staticmethod
    def getNumPages(url):
        soup = Scraper.getSoup(url)
        numPagesDiv = soup.find("div", {"class": "pagination"})
        if numPagesDiv is None:
            return 1
        else:
            return int(numPagesDiv.find_all("span")[-1].find("a").contents[0])

    @staticmethod
    def getClassInfoFromPage(url):
        soup = Scraper.getSoup(url)
        courseFeedDiv = soup.find("ul", {"class": "course-feed"})
        classes = []
        for li in courseFeedDiv.find_all('li', recursive=False):
            name = li.find('a').find('strong')
            classes.append(name.contents)
        classes = reduce(lambda x, y: x + y, classes)
        return classes


if __name__ == "__main__":

    colleges = ['khc', 'cas', 'com', 'eng', 'cfa', 'cgs', 'sar', 'gms', 'grs',
                'sdm', 'met', 'questrom', 'sha', 'law', 'busm', 'sph', 'ssw',
                'sth', 'wheelock']
    numPages = []
    classListByCollege = []

    urlFront = 'https://www.bu.edu/academics/'
    urlBack = '/courses/'

    f = open("classNames.txt", "w")

    for college in colleges:
        print("Getting page number for " + college)
        numPages.append(Scraper.getNumPages(urlFront + college + urlBack))

    for i, college in enumerate(colleges):
        print("Getting classes for " + college)
        url = urlFront + college + urlBack
        classes = []
        for pageNumber in range(1, numPages[i] + 1):
            name = Scraper.getClassInfoFromPage(url + str(pageNumber))
            classes.append(name)
        classes = reduce(lambda x, y: x + y, classes)
        classListByCollege.append(classes)

    print('Writing classes to file...')
    for classList in classListByCollege:
        for className in classList:
            f.write(className + "\n")

    f.close()

    print('done')
