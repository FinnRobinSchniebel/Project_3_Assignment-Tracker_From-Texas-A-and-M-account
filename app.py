## GOOGLE API IMPORTS
from __future__ import print_function

import os.path

import json
from datetime import date

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
## END OF GOOGLE API IMPORTS

#Canvas
import requests
from requests.structures import CaseInsensitiveDict


from flask import Flask
from flask import render_template
app = Flask(__name__)

@app.route("/")
@app.route("/Home.html")
@app.route("/Home")
def Home():
    return render_template("Home.html")

@app.route("/Quick_View.html")
@app.route("/Quick_View")
def Quick_View():
    return render_template("Quick_View.html")

@app.route("/AddLocation.html")
@app.route("/AddLocation")
def AddLocation():
    return render_template("AddLocation.html")





#background process happening without any refreshing
@app.route('/bgGoogleImport', methods=['GET', 'POST'])
def getGoogleJSONs():
    creds = None
    SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly', 'https://www.googleapis.com/auth/classroom.coursework.me']
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('classroom', 'v1', credentials=creds)

        # Call the Classroom API
        results = service.courses().list().execute()
        courses = results.get('courses', [])


        classList = []
        if not courses:
            print('No courses found.')
            return
        # Prints the names of the courses
        for course in courses:
            # Class name that will be stored
            className = course['name']
            # print(className)
            # print("\n")

            #classID for accessing coursework
            classID = course['id']

            #all users assignments in a course
            coursework = service.courses().courseWork().list(courseId=classID).execute()
            assignments = coursework.get('courseWork', [])


            # iterate through all of their coursework and create assignmentObjs in dictionarys
            assignmentList = []
            for assignment in assignments:
                #create a new assignmentObj to make JSON
                assignmentObj = {}
                assignmentObj['name'] = assignment['title']
                assignmentObj['class'] = className
                assignmentObj['priority'] = 3

                # NEED TO PARSE DATE AND TIME CORRECTLY FOR OUR FORMATTING
                assignmentDueDateGoogle = assignment['dueDate']
                assignmentDueTimeGoogle = assignment['dueTime']
                dueYear = assignmentDueDateGoogle['year']
                dueMonth = assignmentDueDateGoogle['month']
                dueDay = assignmentDueDateGoogle['day']
                dueHour = (assignmentDueTimeGoogle['hours'] + 19) % 24
                dueMin = assignmentDueTimeGoogle['minutes']
                objDueDate = str(dueYear)+ '-' + str(dueMonth)+ '-' + str(dueDay) + 'T' + str(dueHour) + ':' + str(dueMin)
                assignmentObj['dueDate'] = objDueDate


                startDateTime = str(assignment['creationTime'])
                assignmentObj['startDate'] = startDateTime[0:16]


                assignmentObj['link'] = assignment['alternateLink']

                # WIP
                assignmentObj['relatedLinks'] = ''


                assignmentObj['notes'] = assignment['description']


                #check if the assignment has a submission
                assignmentID = assignment['id']
                studentSubmissions = service.courses().courseWork().studentSubmissions().list(courseId=classID, courseWorkId = assignmentID).execute()
                submissions = studentSubmissions.get('studentSubmissions', [])
                for submission in submissions:
                    if(submission['assignmentSubmission'] == {}):
                        assignmentObj['complete'] = False
                    else:    
                        assignmentObj['complete'] = True

                assignmentList.append(assignmentObj)
                

            #creating classObj for each course
            #store assignmentList of each course
            #set default color for added courses
            classObj = {}
            classObj['name'] = className
            classObj['color'] = 'rgb(162, 214, 161);'
            classObj['assignments'] = assignmentList

            classList.append(classObj)

        ##write classObj to JSON file
        with open("./static/Scripts/googleClassObjs.json", "w") as outfile:
            json.dump(classList, outfile) 

        jsonStr = json.dumps(classList)
        return jsonStr
            
    except HttpError as error:
        print('An error occurred: %s' % error)


#background process happening without any refreshing
@app.route('/bgGetCanvasUser', methods=['GET', 'POST'])
def getCanvasUser():
    url = "https://canvas.tamu.edu/api/v1/users/self"

    headers = {'Authorization' : 'Bearer 15924~j9hFN1TVjJHgUCE7CyTdrKaWKSLsf8yIRaCtCfQlXp4PkASi8ts3UJEqn2ackRq1'}

    resp = requests.get(url, headers=headers)

    return (resp.json())

if __name__ == '__main__':
    app.run(debug=True)

