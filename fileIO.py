def parseClassNames(line):
    classCode = line.split(':')[0]
    return classCode


def readClassNames(filename):
    f = open(filename)
    classCodes = []

    for line in f:
        classCodes.append(parseClassNames(line))

    return classCodes


def writeClassNames(filename, classNames):
    f = open(filename, 'w')

    for classString in classNames:
        f.write(classString)
