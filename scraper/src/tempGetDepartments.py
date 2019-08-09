from pymongo import MongoClient
import os

engMapper = {
    'ec': 'Electrical and Computer Engineering',
    'be': 'Biomedical Engineering',
    'ek': 'Engineering Core',
    'me': 'Mechanical Engineering',
    'ms': 'Materials Science and Engineering',
    'se': 'Systems Engineering'
}

mapper = {
    'eng': engMapper
}


def getDepartmentName(collegeCode, departmentCode):
    if collegeCode == 'eng':
        return mapper[collegeCode][departmentCode]
    else:
        return 'hello'


if __name__ == "__main__":
    username = os.environ['MONGODBUSERNAME']
    password = os.environ['MONGODBPASSWORD']

    client = MongoClient("mongodb+srv://" + username + ":" + password +
                         "@courses-fv3mh.mongodb.net/test?"
                         "retryWrites=true&w=majority")

    db = client.get_database("bucourses_db")
    courseInfo = db.course_info

    array = courseInfo.find({})

    classDict = {}

    for singleClass in array:
        code = singleClass['Code']
        splitted = code.split('-')
        college = splitted[0]
        departmentCode = splitted[1]
        if college not in classDict.keys():
            classDict[college] = []

        newDepartment = True
        for dep in classDict[college]:
            if dep["departmentCode"] == departmentCode:
                newDepartment = False

        if newDepartment:
            newDepDict = {}
            newDepDict["departmentCode"] = departmentCode
            newDepDict["departmentName"] = getDepartmentName(college,
                                                             departmentCode)
            classDict[college].append(newDepDict)

    client.close()
