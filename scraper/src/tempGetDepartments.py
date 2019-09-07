import scraper

if __name__ == "__main__":
    url = "https://www.bu.edu/academics/cas/courses/"
    soup = scraper.getSoup(url)
    departmentList = scraper.getDepartmentList(soup)

    departmentTuples = []

    for deptTuple in departmentList:
        deptName = deptTuple[0]
        deptLink = deptTuple[1]

        classList = scraper.getClassInfoFromPage(deptLink)

        if len(classList) == 0:
            continue

        firstClassString = classList[0]
        deptCode = firstClassString.split(' ')[1]

        departmentTuples.append((deptCode, deptName))

    print(departmentTuples)
