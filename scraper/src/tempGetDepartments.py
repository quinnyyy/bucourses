import scraper

if __name__ == "__main__":
    url = "https://www.bu.edu/academics/cas/courses/"
    soup = scraper.getSoup(url)
    departmentList = scraper.getDepartmentList(soup)
    print(departmentList)