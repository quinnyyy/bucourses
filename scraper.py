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
    if hubUl is not None:
        for li in hubUl.find_all('li', recursive=False):
            hubList.append(li.contents[0])

    # Finding the credits and prerequisites in the info box.
    infoBoxDiv = courseContentDiv.find("div", {"id": "info-box"})
    infoBoxItems = infoBoxDiv.find_all('dd')

    credits = infoBoxItems[0].contents[0]
    prerequisites = infoBoxItems[1].contents[0]

    # Finding the information for each section.
    courseSchedulesDiv = courseContentDiv.find('div', {'class': 'cf-course'})
    semesterHeaders = courseSchedulesDiv.find_all('strong')
    sectionTables = courseSchedulesDiv.find_all('table')

    for index, section in enumerate(sectionTables):
        semester = semesterHeaders[index].contents[0]
        print(semester)
        sectionInfo = section.find_all('td')
        for info in sectionInfo:
            if len(info.contents) != 0:
                print(info.contents[0].strip())

        print()

    # Have to get prerequisites
    # Have to get schedule
    print(description)
    print(hubList)
    print(credits)
    print(prerequisites)
