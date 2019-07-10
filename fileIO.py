def parseClassNames(line):
    classCode = line.split(':')[0]
    classCode = classCode.lower()
    classCode = classCode.replace(' ', '-')
    return classCode


def readClassNames(filename):
    f = open(filename, 'r')
    classCodes = []

    for line in f:
        classCodes.append(parseClassNames(line))

    f.close()

    return classCodes


def writeClassNames(filename, classList):
    f = open(filename, 'x')

    for classString in classList:
        f.write(classString + '\n')

    f.close()
