from pymongo import MongoClient
import json
import os

username = os.environ['MONGODBUSERNAME']
password = os.environ['MONGODBPASSWORD']

client = MongoClient("mongodb+srv://" + username + ":" + password +
                     "@courses-fv3mh.mongodb.net/test?"
                     "retryWrites=true&w=majority")

db = client.get_database('bucourses_db')
courseInfo = db.course_info

with open('eng-ec-311.json') as f:
    file_data = json.load(f)

courseInfo.update_one({"Code": "eng-ec-311"},
                      {"$set": file_data},
                      upsert=True)
client.close()
