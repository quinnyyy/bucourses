import scraper
import fileIO
import os

classNames = fileIO.readClassNames('classNames.txt')
classCodes = list(map(fileIO.parseClassNames, classNames))

CURRENTPATH = os.getcwd()
JSONDIRPATH = os.path.join(CURRENTPATH, 'CourseJSON')

for classCode in classCodes:
    print(classCode)
    savePath = os.path.join(JSONDIRPATH, classCode + '.json')
    dictionary = scraper.getClassDetails(classCode)

    # fileIO.writeJSONFile(savePath, dictionary)

print(classCodes)
