## GOOGLE API IMPORTS
from __future__ import print_function

import os.path

import json
from datetime import date
from datetime import datetime
from datetime import timedelta

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

                if(assignmentDueDateGoogle['month'] < 10):
                    dueMonth = '0'+str(assignmentDueDateGoogle['month'])
                else:
                    dueMonth = ''+str(assignmentDueDateGoogle['month'])
                    
                if(assignmentDueDateGoogle['day'] < 10):
                    dueDay = '0'+str(assignmentDueDateGoogle['day'])
                else:
                    dueDay = ''+str(assignmentDueDateGoogle['day'])
                dueHour = (assignmentDueTimeGoogle['hours'] + 19) % 24
                dueMin = assignmentDueTimeGoogle['minutes']
                
                objDueDate = str(dueYear)+ '-' + str(dueMonth)+ '-' + str(dueDay) + 'T' + str(dueHour) + ':' + str(dueMin)
                assignmentObj['dueDate'] = objDueDate


                startDateTime = str(assignment['creationTime'])

                ## Creating DateTime datatypes for comparison
                dueDateYear = int(dueYear)
                dueDateMonth = int(dueMonth)
                dueDateDay = int(dueDay)

                dueDate = date(dueDateYear, dueDateMonth, dueDateDay)
                delta = dueDate - date.today()

                ##checks if assignment is less than ten days overdue, if not then displays
                isNotPastAssignment = delta > timedelta(days = 10)



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

            if(isNotPastAssignment):
                classList.append(classObj)

        ##write classObj to JSON file
        with open("./static/Scripts/googleClassObjs.json", "w") as outfile:
            json.dump(classList, outfile) 

        jsonStr = json.dumps(classList)
        return jsonStr
            
    except HttpError as error:
        print('An error occurred: %s' % error)


#background process happening without any refreshing
# @app.route('/bgGetCanvasUser', methods=['GET', 'POST'])
# def getCanvasUser(token):
#     url = "https://canvas.tamu.edu/api/v1/users/self"

#     #eventually will take bearer token as an argument
#     token = "15924~j9hFN1TVjJHgUCE7CyTdrKaWKSLsf8yIRaCtCfQlXp4PkASi8ts3UJEqn2ackRq1"
#     headers = {'Authorization' : 'Bearer '+ token}

#     resp = requests.get(url, headers=headers)

#     return (resp.json())


#will call for all courses of a user
@app.route('/bgGetCanvasCourses', methods=['GET', 'POST'])
def getCanvasCourses():
    url = "https://canvas.tamu.edu/api/v1/courses/"

    #eventually will take bearer token as an argument
    token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
    headers = {'Authorization' : 'Bearer '+ token}

    resp = requests.get(url, headers=headers)

    # finds the max enrollment_term_id -> courses w/ this are in current semester 
    maxID = 0
    for ID in resp.json():
        currID = ID["enrollment_term_id"]
        if currID > maxID:
            maxID = currID

    # creates dictionary w/ current semesters courseIDs as the key and names as the values
    # this is done by looping through the courses again to find the ones with maxID
    courseDict = {}
    for course in resp.json():
        if course["enrollment_term_id"] == maxID:
            courseID = course["id"]
            courseDict[courseID] = course["name"]  

    return (courseDict)


#function will call for assignments in a course
@app.route('/bgGetCanvasAssignments', methods=['GET', 'POST'])
def getCanvasAssignments():
    courseDict = getCanvasCourses()
    assignmentList = []
    classList = []
    
    # counter = 0
    for courseID in courseDict:
        stringID = str(courseID)
        # takes course name and replaces : since it creates error later 
        # TODO: what should the courseName be? Spaces? underscores? 
        courseName = courseDict[courseID]
        courseName = courseName.replace(':','')
        courseName = courseName.replace(' ','_')
        # print(courseName)
        url = "https://canvas.tamu.edu/api/v1/courses/"+stringID+"/assignments/"

        #eventually will take bearer token as an argument
        token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
        headers = {'Authorization' : 'Bearer '+ token}

        resp = requests.get(url, headers=headers)
        
        
        
        # loops through current class's assignmnents
        # puts everything required into assignmentObj
        # TODO: Noticed some dates are null for assignments need to check
        for assignment in resp.json():
            #create a new assignmentObj to make JSON
            assignmentObj = {}
            assignmentObj['name'] = assignment['name']
            assignmentObj['class'] = courseName
            assignmentObj['priority'] = 3
            assignmentObj['dueDate'] = assignment['due_at']
            # startDate should be unlock or created at? 
            assignmentObj['startDate'] = assignment['unlock_at']
            assignmentObj['link'] = assignment['html_url']
            assignmentObj['relatedLinks'] = ''
            assignmentObj['notes'] = '' #assignment['description']

            #check if the assignment has a submission
            submission = assignment['has_submitted_submissions']
            if(submission == False):
                assignmentObj['complete'] = False
            else:    
                assignmentObj['complete'] = True

            assignmentList.append(assignmentObj)
            # delta = assignmentObj['dueDate'] - assignmentObj['startDate']

        ##checks if assignment is less than ten days overdue, if not then displays
        # isNotPastAssignment = delta > timedelta(days = 10)

        # create classobj for each class
        classObj = {}
        classObj['name'] = courseName
        classObj['color'] = 'rgb(162, 214, 161);'
        classObj['assignments'] = assignmentList

        # if(isNotPastAssignment):
        classList.append(classObj)
        # print(resp.json())

        # counter+=

    ##write classObj to JSON file
    with open("./static/Scripts/CanvasObjs.json", "w") as outfile:
        json.dump(classList, outfile) 

    jsonStr = json.dumps(classList)
    return jsonStr

#this will be the main function for getting all classes and assignments from a user
@app.route('/bgCanvasImport', methods=['GET', 'POST'])
def getCanvasJSONs(token):
    ## TO DO
    
    ## This function needs to take in the token entered by user

    ## For testing purposes 
    token = "15924~j9hFN1TVjJHgUCE7CyTdrKaWKSLsf8yIRaCtCfQlXp4PkASi8ts3UJEqn2ackRq1"

    #get canvas userID using this function
    #userID = getCanvasUser(token)

    #get an array of classIDs using this function
    #courseIDs = getCanvasCourses(token, userID)

    #iterate through classID list and get all assignments for each course
    #for each course: assignmentList = getCanvasAssignments(token, courseID)
        #create dictionarys and structure just like local JSON objects (classObjs & assignmentObjs)

    
    #return an array of dictionarys (classObjs)






if __name__ == '__main__':
    app.run(debug=True)

