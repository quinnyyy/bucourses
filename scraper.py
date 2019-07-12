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
    classes = list(map(lambda x: x.rstrip('\n'), classes))
    return classes


'''
Helper Functions to find Course Details
'''


def findDescription(courseContentDiv):
    descriptionBox = courseContentDiv.find('p', recursive=False).contents
    description = descriptionBox[0] if len(descriptionBox) != 0 else ''

    return description


def findHubList(courseContentDiv):
    hubUl = courseContentDiv.find('ul', {"class": "cf-hub-offerings"})
    hubList = []
    if hubUl is not None:
        for li in hubUl.find_all('li', recursive=False):
            hubList.append(li.contents[0])

    return hubList


def findCreditsPrereqs(courseContentDiv):
    infoBoxDiv = courseContentDiv.find("div", {"id": "info-box"})
    infoBoxItems = infoBoxDiv.find_all('dd')

    credits = infoBoxItems[0].contents[0]

    if len(infoBoxItems) > 1:
        prerequisites = infoBoxItems[1].contents[0]
    else:
        prerequisites = ''

    return (credits, prerequisites)


def findCourseSections(courseContentDiv):
    NUMCOLUMNS = 5
    columns = ['Section', 'Instructor', 'Location', 'Schedule', 'Notes']
    sections = []

    courseSchedulesDiv = courseContentDiv.find('div', {'class': 'cf-course'})
    semesterHeaders = courseSchedulesDiv.find_all('strong')
    sectionTables = courseSchedulesDiv.find_all('table')

    for indexTable, table in enumerate(sectionTables):
        sectionDictionary = {}
        sectionDictionary['Semester'] = semesterHeaders[indexTable].contents[0]

        sectionInfo = table.find_all('td')
        for indexInfo, info in enumerate(sectionInfo):
            if indexInfo > (NUMCOLUMNS - 1) and indexInfo % NUMCOLUMNS == 0:
                sections.append(sectionDictionary.copy())

            columnHeader = columns[indexInfo % NUMCOLUMNS]
            if len(info.contents) != 0:
                if len(info.contents) == 1:
                    sectionDictionary[columnHeader] = info.contents[0].strip()
                else:
                    combinedString = reduce(lambda x, y: x +
                                            (y if isinstance(y, str) else ' '),
                                            info.contents)
                    sectionDictionary[columnHeader] = combinedString.strip()
            else:
                sectionDictionary[columnHeader] = ''

        sections.append(sectionDictionary)

    return sections


def getClassDetails(code):
    urlFront = 'https://www.bu.edu/academics/'
    urlBack = '/courses/'
    college = code.split('-')[0]
    if college == 'qst':
        college = 'questrom'
    url = urlFront + college + urlBack + code
    soup = getSoup(url)
    courseContentDiv = soup.find("div", {"id": "course-content"})

    print(url)

    description = findDescription(courseContentDiv)
    hubList = findHubList(courseContentDiv)
    credits, prerequisites = findCreditsPrereqs(courseContentDiv)
    sections = findCourseSections(courseContentDiv)

    courseDictionary = {'Code': code,
                        'Description': description,
                        'HubList': hubList,
                        'Credits': credits,
                        'Prerequisites': prerequisites,
                        'Sections': sections}

    return courseDictionary
