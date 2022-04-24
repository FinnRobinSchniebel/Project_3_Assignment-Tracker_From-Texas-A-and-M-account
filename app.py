## GOOGLE API IMPORTS
from __future__ import print_function

import os.path

import json
from datetime import date
from datetime import datetime
from datetime import timedelta
from dateutil import tz

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
## END OF GOOGLE API IMPORTS

#Canvas
import requests
from requests.structures import CaseInsensitiveDict
from flask import request
from flask import jsonify 
from flask import session
import re

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
        # used to keep track of classes 
        order = 0
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

                if(isNotPastAssignment):
                    assignmentList.append(assignmentObj)
                

            #creating classObj for each course
            #store assignmentList of each course
            #set default color for added courses
            classObj = {}
            classObj['name'] = className
            classObj['color'] = 'rgb(162, 214, 161);'
            classObj['assignments'] = assignmentList
            classObj['order'] = order
            order += 1

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
    url = "https://canvas.tamu.edu/api/v1/courses?include=items&per_page=1000/"

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
    courseList = []
    orderCount = 0
    for course in resp.json():
        if course["enrollment_term_id"] == maxID:     
            courseID = course["id"]
            # getting rid of JAPN for testing
            if courseID == 123752: continue
            # if courseID == 133720: continue
            
            # creates Dict of needed courseINFO
            courseDict = {}
            courseDict['name'] = course["name"]  
            courseDict['id'] = courseID
            courseDict['order'] = orderCount
            orderCount += 1
            courseList.append(courseDict)

    jsonStr = json.dumps(courseList)
    return jsonStr
    # return (courseDict)

# havent looked into this yet
app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'
@app.route('/bgGetUserToken', methods=['POST'])
def get_post_json():   

    # stores user Token 
    data = request.get_json()
    session["token"] = data

    return jsonify(status="success", data=data)


@app.route('/bgStoreCourseINFO', methods=['POST'])
def storeCourseINFO():    

    # stores user courseINFO
    courseData = request.get_json()
    session["courseINFO"] = courseData
    return jsonify(status="success", data=courseData)



#function will call for assignments in a course
@app.route('/bgGetCanvasAssignments', methods=['GET', 'POST'])
def getCanvasAssignments():

    courseDict = {}
    # takes Token from session to use to access APIs
    tokenDict = session.get("token")
    # grabs courseINFO that was passed in
    courseDict = session.get("courseINFO")
    courseName = courseDict['name']
    courseID = courseDict['id']

    # was used before change, may not be needed anymore
    order = 0
    
    # makes a call to get moduleINFO for each course 
    stringID = str(courseID)
    # takes course name and replaces : since it creates error later 
    # TODO: what should the courseName be? Spaces? underscores? 
    courseName = courseName.replace(':','')
    courseName = courseName.replace(' ','_')
    print(courseName)
    # module search section
    url = "https://canvas.tamu.edu/api/v1/courses/"+stringID+"/modules?include=items&per_page=1000/"

    #eventually will take bearer token as an argument
    token = tokenDict['token']
    # token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
    headers = {'Authorization' : 'Bearer '+ token}

    resp = requests.get(url, headers=headers)

    # Takes every moduleID and puts it into a dict 
    moduleDict = {}
    for module in resp.json():
        moduleID = module["id"]
        moduleDict[moduleID] = module["name"]  

    # may need to change localtion of this   
    assignmentList = []

    for moduleCheck in resp.json():
        # print(assignmentCHECK)
        # print(assignmentCHECK['name'])
        assignmentItems =  moduleCheck['items']
        for assignmentCheck in assignmentItems:
            # checking for assignments in the module
            # print(assignmentCheck['type'])
            assignmentType = assignmentCheck['type']
            if (assignmentType == 'Quiz'):
                #assignmentNameCheck = checkInvalidChar(assignment['title'])
                # need to make another call to get assignment info
                content_id = str(assignmentCheck['content_id'])

                url = "https://canvas.tamu.edu/api/v1/courses/"+stringID+"/quizzes/"+content_id+"/"

                #eventually will take bearer token as an argument
                token = tokenDict['token']
                # token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
                headers = {'Authorization' : 'Bearer '+ token}

                resp = requests.get(url, headers=headers)
                assignment = resp.json()
        
                # TODO: Noticed some dates are null for assignments need to check
                assignmentObj = {}
                assignmentNameCheck = checkInvalidChar(assignment['title'])
                assignmentObj['name'] = assignmentNameCheck
                assignmentObj['class'] = courseName
                assignmentObj['priority'] = 3
                # issues with due date being null
                if (assignment['due_at'] == None):
                    # print(assignmentNameCheck + " is null")
                    assignmentObj['dueDate'] = ''
                    dueDate = None
                else:
                    # [:-4] gets rid of milliseconds which cause issues with dates

                    assignDate = assignment['due_at'][:-1]
                    assignDate = assignDate.replace('T', " ")
                   
                    # taken from https://stackoverflow.com/questions/4770297/convert-utc-datetime-string-to-local-datetime#comment7256053_4771733
                    # METHOD 2: Auto-detect zones:
                    from_zone = tz.tzutc()
                    to_zone = tz.tzlocal()
                    # utc = datetime.utcnow()
                    utc = datetime.strptime(assignDate, '%Y-%m-%d %H:%M:%S')
                  
                    # Tell the datetime object that it's in UTC time zone since 
                    # datetime objects are 'naive' by default
                    utc = utc.replace(tzinfo=from_zone)
                  
                    # Convert time zone
                    dueTimeFinal = str(utc.astimezone(to_zone))
                   
                    # parses info from date to use in final date
                    dueDateNew = dueTimeFinal[0:10]
                    dueTimeEnd = dueTimeFinal[13:16]
                    dueTimeChange = dueTimeFinal[11:13]
                   
                    # creates new final due Date for assignment
                    dueDateFinal = (dueDateNew + "T" + dueTimeChange + dueTimeEnd)
                    print(assignmentNameCheck + " due time is " + dueDateFinal)
                    assignmentObj['dueDate'] = dueDateFinal
                   
                    # parses info from date to use in checking if overdue
                    dueDateYear = int(assignment['due_at'][0:4])
                    dueDateMonth = int(assignment['due_at'][5:7])
                    dueDateDay = int(assignment['due_at'][8:10])

                    dueDate = date(dueDateYear, dueDateMonth, dueDateDay)
                   
                # startDate should be unlock or created at? 
                # [:-4] gets rid of milliseconds which cause issues with dates
                if (assignment['unlock_at'] == None):
                    # print(assignmentNameCheck + " is null")
                    assignmentObj['startDate'] = ''
                else:
                    # [:-4] gets rid of milliseconds which cause issues with dates
                    # print(assignmentNameCheck + " is unlocked at " + assignment['unlock_at'])
                    # assignmentObj['startDate'] = assignment['unlock_at'][:-4]
                    assignDate = assignment['unlock_at'][:-1]
                    assignDate = assignDate.replace('T', " ")
                  
                    # METHOD 2: Auto-detect zones:
                    from_zone = tz.tzutc()
                    to_zone = tz.tzlocal()
                
                    utc = datetime.strptime(assignDate, '%Y-%m-%d %H:%M:%S')
                
                    # Tell the datetime object that it's in UTC time zone since 
                    # datetime objects are 'naive' by default
                    utc = utc.replace(tzinfo=from_zone)
             
                    # Convert time zone
                    unlockTimeFinal = str(utc.astimezone(to_zone))

                    # splits unlock time so I can append them to the correct format 
                    unlockDateNew = unlockTimeFinal[0:10]
                    unlockTimeEnd = unlockTimeFinal[13:16]
                    unlockTimeChange = unlockTimeFinal[11:13]
                    
                     # splits unlock time so I can append them to the correct format 
                    unlockDateFinal = (unlockDateNew + "T" + unlockTimeChange + unlockTimeEnd)
                    print(assignmentNameCheck + " unlocks at " + unlockDateFinal)
                    assignmentObj['startDate'] = unlockDateFinal
                
                assignmentObj['link'] = assignment['html_url']
                assignmentObj['relatedLinks'] = ''
                assignmentObj['notes'] = '' #assignment['description']
               

                #check if the assignment has a submission
                # submission = assignment['has_submitted_submissions']
                # if(submission == False):
                #     assignmentObj['complete'] = False
                # else:    
                #     assignmentObj['complete'] = True
                # dueDate = date(dueDateYear, dueDateMonth, dueDateDay)
                if (dueDate != None):
                    delta = dueDate - date.today()
                    # print("Delta is " + delta)
                    ##checks if assignment is less than ten days overdue, if not then displays
                    isNotPastAssignment = delta > timedelta(days = 1)
                    if(isNotPastAssignment):
                        assignmentList.append(assignmentObj)
                    else:
                        print("PAST ASSIGNMENT IS: " + assignmentObj['name'])
                else:
                    assignmentList.append(assignmentObj)

                # assignmentList.append(assignmentObj)
            elif (assignmentType == 'Discussion'):
                #assignmentNameCheck = checkInvalidChar(assignment['title'])
                # need to make another call to get assignment info
                content_id = str(assignmentCheck['content_id'])

                url = "https://canvas.tamu.edu/api/v1/courses/"+stringID+"/discussion_topics/"+content_id+"/"

                #eventually will take bearer token as an argument
                token = tokenDict['token']
                # token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
                headers = {'Authorization' : 'Bearer '+ token}

                resp = requests.get(url, headers=headers)
       
                assignment = resp.json()
                # TODO: Noticed some dates are null for assignments need to check
                # assignmentList = []
                #create a new assignmentObj to make JSON
                # print(assignment)
                # print(assignment)
                assignmentObj = {}
                assignmentNameCheck = checkInvalidChar(assignment['assignment']['name'])
                # print(assignmentNameCheck)
                # print(assignmentNameCheck)
                assignmentObj['name'] = assignmentNameCheck
                assignmentObj['class'] = courseName
                assignmentObj['priority'] = 3
                # issues with due date being null
                if (assignment['assignment']['due_at'] == None):
                    # print(assignmentNameCheck + " is null")
                    assignmentObj['dueDate'] = ''
                    dueDate = None
                else:
                    # [:-4] gets rid of milliseconds which cause issues with dates
                    assignDate = assignment['assignment']['due_at'][:-1]
                    assignDate = assignDate.replace('T', " ")
                 
                    # METHOD 2: Auto-detect zones:
                    from_zone = tz.tzutc()
                    to_zone = tz.tzlocal()
                    # utc = datetime.utcnow()
                    utc = datetime.strptime(assignDate, '%Y-%m-%d %H:%M:%S')
                
                    # Tell the datetime object that it's in UTC time zone since 
                    # datetime objects are 'naive' by default
                    utc = utc.replace(tzinfo=from_zone)
                  
                    # Convert time zone
                    dueTimeFinal = str(utc.astimezone(to_zone))

                    # parses info from date to use in final date
                    dueDateNew = dueTimeFinal[0:10]
                    dueTimeEnd = dueTimeFinal[13:16]
                    dueTimeChange = dueTimeFinal[11:13]
        
                    # parses info from date to use in final date
                    dueDateFinal = (dueDateNew + "T" + dueTimeChange + dueTimeEnd)
                    print(assignmentNameCheck + " due time is " + dueDateFinal)
                    assignmentObj['dueDate'] = dueDateFinal

                    # parses info from date to use in checking if overdue
                    dueDateYear = int(assignment['assignment']['due_at'][0:4])
                    dueDateMonth = int(assignment['assignment']['due_at'][5:7])
                    dueDateDay = int(assignment['assignment']['due_at'][8:10])
                    dueDate = date(dueDateYear, dueDateMonth, dueDateDay)
                  

                
                if (assignment['assignment']['unlock_at'] == None):
                    # print(assignmentNameCheck + " is null")
                    assignmentObj['startDate'] = ''
                else:
                    # [:-1] gets rid of Z which cause issues with dates

                    assignDate = assignment['assignment']['unlock_at'][:-1]
                    assignDate = assignDate.replace('T', " ")
                  
                    # METHOD 2: Auto-detect zones:
                    from_zone = tz.tzutc()
                    to_zone = tz.tzlocal()
                
                    utc = datetime.strptime(assignDate, '%Y-%m-%d %H:%M:%S')
                
                    # Tell the datetime object that it's in UTC time zone since 
                    # datetime objects are 'naive' by default
                    utc = utc.replace(tzinfo=from_zone)
             
                    # Convert time zone
                    unlockTimeFinal = str(utc.astimezone(to_zone))

                    # parses info from date to use in final date
                    unlockDateNew = unlockTimeFinal[0:10]
                    unlockTimeEnd = unlockTimeFinal[13:16]
                    unlockTimeChange = unlockTimeFinal[11:13]
                    
                    # splits unlock time so I can append them to the correct format 
                    unlockDateFinal = (unlockDateNew + "T" + unlockTimeChange + unlockTimeEnd)
                    print(assignmentNameCheck + " unlocks at " + unlockDateFinal)
                    assignmentObj['startDate'] = unlockDateFinal
                    
                assignmentObj['link'] = assignment['html_url']
                assignmentObj['relatedLinks'] = ''
                assignmentObj['notes'] = '' #assignment['assignment']['description']
           
                #check if the assignment has a submission
                # submission = assignment['has_submitted_submissions']
                # if(submission == False):
                #     assignmentObj['complete'] = False
                # else:    
                #     assignmentObj['complete'] = True

                if (dueDate != None):
                    delta = dueDate - date.today()
                    # print("Delta is " + delta)
                    ##checks if assignment is less than ten days overdue, if not then displays
                    isNotPastAssignment = delta > timedelta(days = 1)
                    if(isNotPastAssignment):
                        assignmentList.append(assignmentObj)
                    else:
                        print("PAST ASSIGNMENT IS: " + assignmentObj['name'])
                else:
                    assignmentList.append(assignmentObj)

                # assignmentList.append(assignmentObj)
            elif (assignmentType == 'Assignment'):
                #assignmentNameCheck = checkInvalidChar(assignment['title'])
                # need to make another call to get assignment info
                content_id = str(assignmentCheck['content_id'])

                url = "https://canvas.tamu.edu/api/v1/courses/"+stringID+"/assignments/"+content_id+"/"

                #eventually will take bearer token as an argument
                token = tokenDict['token']
                # token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
                headers = {'Authorization' : 'Bearer '+ token}

                resp = requests.get(url, headers=headers)
            
                assignment = resp.json()
        
                # loops through current class assignmnent
                # puts everything required into assignmentObj
                # TODO: Noticed some dates are null for assignments need to check
                assignmentObj = {}
                assignmentNameCheck = checkInvalidChar(assignment['name'])
                assignmentObj['name'] = assignmentNameCheck
                assignmentObj['class'] = courseName
                assignmentObj['priority'] = 3
                # issues with due date being null
                if (assignment['due_at'] == None):
                    assignmentObj['dueDate'] = ''
                    dueDate = None
                else:
                    # [:-4] gets rid of milliseconds which cause issues with dates

                    assignDate = assignment['due_at'][:-1]
                    assignDate = assignDate.replace('T', " ")
                  
                    # METHOD 2: Auto-detect zones:
                    from_zone = tz.tzutc()
                    to_zone = tz.tzlocal()
                
                    utc = datetime.strptime(assignDate, '%Y-%m-%d %H:%M:%S')
                
                    # Tell the datetime object that it's in UTC time zone since 
                    # datetime objects are 'naive' by default
                    utc = utc.replace(tzinfo=from_zone)
             
                    # Convert time zone
                    dueTimeFinal = str(utc.astimezone(to_zone))

                    # parses info from date to use in final date
                    dueDateNew = dueTimeFinal[0:10]
                    dueTimeEnd = dueTimeFinal[13:16]
                    dueTimeChange = dueTimeFinal[11:13]
                    
                    # splits due time so I can append them to the correct format 
                    dueDateFinal = (dueDateNew + "T" + dueTimeChange + dueTimeEnd)
                    assignmentObj['dueDate'] = dueDateFinal

                    # parses info from date to use in checking if overdue
                    dueDateYear = int(assignment['due_at'][0:4])
                    dueDateMonth = int(assignment['due_at'][5:7])
                    dueDateDay = int(assignment['due_at'][8:10])

                    dueDate = date(dueDateYear, dueDateMonth, dueDateDay)
               
                # startDate should be unlock or created at? 
                # [:-1] gets rid of Z which cause issues with dates
                if (assignment['unlock_at'] == None):
                    # print(assignmentNameCheck + " is null")
                    assignmentObj['startDate'] = ''
                else:
                    # [:-1] gets rid of Z which cause issues with dates
                
                    assignDate = assignment['unlock_at'][:-1]
                    assignDate = assignDate.replace('T', " ")
                  
                    # METHOD 2: Auto-detect zones:
                    from_zone = tz.tzutc()
                    to_zone = tz.tzlocal()
                
                    utc = datetime.strptime(assignDate, '%Y-%m-%d %H:%M:%S')
                
                    # Tell the datetime object that it's in UTC time zone since 
                    # datetime objects are 'naive' by default
                    utc = utc.replace(tzinfo=from_zone)
             
                    # Convert time zone
                    unlockTimeFinal = str(utc.astimezone(to_zone))

                    # parses info from date to use in final date
                    unlockDateNew = unlockTimeFinal[0:10]
                    unlockTimeEnd = unlockTimeFinal[13:16]
                    unlockTimeChange = unlockTimeFinal[11:13]

                    # splits unlock time so I can append them to the correct format 
                    unlockDateFinal = (unlockDateNew + "T" + unlockTimeChange + unlockTimeEnd)
                    print(assignmentNameCheck + " unlocks at " + unlockDateFinal)
                    assignmentObj['startDate'] = unlockDateFinal
                
                assignmentObj['link'] = assignment['html_url']
                assignmentObj['relatedLinks'] = ''
                # pass in description to use later in assignment section (not atm)
                assignmentObj['notes'] = '' #assignment['description']


                #check if the assignment has a submission NOT IN CANVAS>?
                # submission = assignment['has_submitted_submissions']
                # if(submission == False):
                #     assignmentObj['complete'] = False
                # else:    
                #     assignmentObj['complete'] = True
                

                if (dueDate != None):
                    delta = dueDate - date.today()
                    # print("Delta is " + delta)
                    ##checks if assignment is less than ten days overdue, if not then displays
                    isNotPastAssignment = delta > timedelta(days = 1)
                    if(isNotPastAssignment):
                        assignmentList.append(assignmentObj)
                    else:
                        print("PAST ASSIGNMENT IS: " + assignmentObj['name'])
                else:
                    assignmentList.append(assignmentObj)

                
            else:
                continue
        # print("End of Module")  



        # create classobj for each class
        classObj = {}
        classObj['name'] = courseName
        classObj['color'] = 'rgb(162, 214, 161);'
        classObj['assignments'] = assignmentList
        classObj['order'] = order


    ##write classObj to JSON file
    with open("./static/Scripts/Canvas"+courseName+".json", "w") as outfile:
        json.dump(classObj, outfile) 
    session.pop("courseINFO", None)
    jsonStr = json.dumps(classObj)
    return jsonStr


def checkInvalidChar(assignmentName):
    regex = re.compile('[@!#$%^&+*(),<>?/\|}{~:]')

    if(regex.search(assignmentName) == None):
         return assignmentName
    else:
        assignmentName = assignmentName.replace(':',' ')
        assignmentName = assignmentName.replace('#',' ')
        assignmentName = assignmentName.replace('&','And')
        assignmentName = assignmentName.replace('!','')
        assignmentName = assignmentName.replace('?','')
        assignmentName = assignmentName.replace('(',' ')
        assignmentName = assignmentName.replace(')',' ')
        assignmentName = assignmentName.replace(',','')
        assignmentName = assignmentName.replace('+','')
        assignmentName = assignmentName.replace('/','-')
        # assignmentName = assignmentName.replace("\",' ')
        assignmentName = assignmentName.replace('|',' ')
        # assignmentName = assignmentName.replace('@','')
     
    return assignmentName

# def removeEndTime(date):

if __name__ == '__main__':
    app.run(debug=True)

