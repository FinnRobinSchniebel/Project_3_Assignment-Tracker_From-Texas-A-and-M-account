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
import re
from requests.structures import CaseInsensitiveDict
from flask import request
from flask import jsonify 
from flask import session

from flask import Flask
from flask import flash
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import DataRequired
from flask import url_for
from flask import request
from flask import redirect
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user

import threading
import time


app = Flask(__name__)

#initialize database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = "Superduper secret key NOBODY KNOWS WHAT IT IS"
db = SQLAlchemy(app)

#Flask login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

#db model
class Users(db.Model, UserMixin):
    id = db.Column(db.Integer,primary_key = True, nullable = False )
    userEmail = db.Column(db.String(100), nullable = False, unique = True)
    userPassword = db.Column(db.String(100), nullable = False)
    classes = db.Column(db.JSON, nullable = True)
    googleToken = db.Column(db.JSON, nullable = True)
    canvasBearer = db.Column(db.String(200), nullable = True)

    #function that returns string when something is added for testing
    #returns UserInfoObj 
    def __repr__(self):
        return '{"Email": "'+self.userEmail+'", "Password": "'+ self.userPassword+'", "canvasBearer": "'+ self.canvasBearer +'", "googleToken": "'+self.googleToken+'", "classObjs": '+self.classes+'}'



##create signup form
class CreateAccountForm(FlaskForm):
    email = StringField("Enter valid email address", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm = PasswordField("Confrim Password", validators=[DataRequired()])
    submit = SubmitField("Submit")

#login form
class LoginForm(FlaskForm):
    email = StringField("Enter valid email address", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Submit")


#login page
@app.route("/login", methods = ['GET', 'POST'])
@app.route("/Login", methods = ['GET', 'POST'])
@app.route("/user/login", methods = ['GET', 'POST'])
@app.route("/user/Login", methods = ['GET', 'POST'])
def login():
    form = LoginForm()
    if form.is_submitted():
        enteredEmail = form.email.data
        #first instance of User with that email in database
        User = Users.query.filter_by(userEmail = enteredEmail).first()
        app.logger.info(User)
        #if no instance
        if (User == None):
            flash("Email does not have a registered accouint")
        else:
            #check if entered password matches userPassword
            if (form.password.data == User.userPassword):
                login_user(User)
                return redirect('/Home')
            else:
                flash("Wrong Password - Try Again!")

    return render_template('Login.html', form = form)

#logout
@app.route('/logout', methods=['GET', 'POST'])
@app.route('/Logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    current_user = None
    flash("Logout successful")
    return '/login'


@app.route("/setup", methods = ['GET', 'POST'])
@app.route("/Signup", methods = ['GET', 'POST'])
@app.route("/CreateAccount.html", methods = ['GET', 'POST'])
@app.route("/user/Signup", methods = ['GET', 'POST'])
def add_user():
    empty = {}
    emptyJSON = json.dumps(empty)
    form = CreateAccountForm()
    if form.is_submitted():
        enteredEmail = form.email.data
        if (Users.query.filter_by(userEmail = enteredEmail).first() == None):
            if ((form.password.data == form.confirm.data)):
                user = Users(userEmail = form.email.data, userPassword = form.password.data,classes = emptyJSON, googleToken = emptyJSON, canvasBearer = "" )
                db.session.add(user)
                db.session.commit()
                return redirect('/Home')
            else:
                flash("Password entries do not match!")
        else:
            flash("That email is already registered!")

    return render_template('CreateAccount.html', form = form)



## this function will be called any time home or addlocation window closes
@app.route("/bgUpdateUserClasses", methods = ['GET', 'POST'])
def updateUserClasses():
    #classList is an array of JSON
    classList = json.loads(request.data)
    ## Gets the userInfo of current user
    id = current_user.id
    currUser = Users.query.get_or_404(id)

    currUser.classes = str(request.data)
    db.session.commit()
    #app.logger.info(currUser.classes)
    #convert userInfo JSON into a dictionary
    #userDict = json.loads(str(currUser))

    return str(classList)


## this function will be called any time home or addlocation window opens
@app.route("/bgLoadUserClasses", methods = ['GET', 'POST'])
def loadUserClasses():
    id = current_user.id
    currUser = Users.query.get_or_404(id)
    classList = currUser.classes
    returnList = classList[2:len(classList)-1]
    return returnList





@app.route("/")
@app.route("/Home.html")
@app.route("/Home")
@login_required
def Home():
    return render_template("Home.html")

@app.route("/Quick_View.html")
@app.route("/Quick_View")
@login_required
def Quick_View():
    return render_template("Quick_View.html")

@app.route("/AddLocation.html")
@app.route("/AddLocation")
@login_required
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
    courseDict = {}
    for course in resp.json():
        if course["enrollment_term_id"] == maxID:     
            courseID = course["id"]
            # getting rid of JAPN for testing
            if courseID == 123752: continue
            # if courseID == 133720: continue
            courseDict[courseID] = course["name"]  
    # print(courseDict)
    return (courseDict)

# havent looked into this yet
app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'
@app.route('/bgGetUserToken', methods=['POST'])
def get_post_json():    
    data = request.get_json()
    session["token"] = data
    # print(tokenDict)
    return jsonify(status="success", data=data)

#function will call for assignments in a course
@app.route('/bgGetCanvasAssignments', methods=['GET', 'POST'])
def getCanvasAssignments():

    tokenDict = session.get("token")
    courseDict = getCanvasCourses()
    classList = []
    # print("CORSE DICTIONARY")
    # print(courseDict)
    order = 0
    for courseID in courseDict:
        stringID = str(courseID)
        # takes course name and replaces : since it creates error later 
        # TODO: what should the courseName be? Spaces? underscores? 
        courseName = courseDict[courseID]
        courseName = courseName.replace(':','')
        courseName = courseName.replace(' ','_')
        url = "https://canvas.tamu.edu/api/v1/courses/"+stringID+"/assignments?include=items&per_page=1000/"

        #eventually will take bearer token as an argument
        token = tokenDict['token']
        # token = "15924~zDtK69ahwZSbptMsKxYMYJM52mhuubfGvpL1ws6hA3XQpYEWtX4a6YZByEacZGgm"
        headers = {'Authorization' : 'Bearer '+ token}

        resp = requests.get(url, headers=headers)
        
        # loops through current class's assignmnents
        # puts everything required into assignmentObj
        # TODO: Noticed some dates are null for assignments need to check
        assignmentList = []
        for assignment in resp.json():
            #create a new assignmentObj to make JSON
            assignmentObj = {}
            assignmentNameCheck = checkInvalidChar(assignment['name'])
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
                assignmentObj['dueDate'] = assignment['due_at'][:-4]
                # dueDate = assignment['due_at'][:10]
                dueDateYear = int(assignment['due_at'][0:4])
                dueDateMonth = int(assignment['due_at'][5:7])
                dueDateDay = int(assignment['due_at'][8:10])

                dueDate = date(dueDateYear, dueDateMonth, dueDateDay)
                print(assignmentNameCheck + " is due at " + assignment['due_at'][:-4])
                print((4 + 19) % 24)
            # startDate should be unlock or created at? 
            # [:-4] gets rid of milliseconds which cause issues with dates
            if (assignment['unlock_at'] == None):
                # print(assignmentNameCheck + " is null")
                assignmentObj['startDate'] = ''
            else:
                # [:-4] gets rid of milliseconds which cause issues with dates
                # print(assignmentNameCheck + " is unlocked at " + assignment['unlock_at'])
                assignmentObj['startDate'] = assignment['unlock_at'][:-4]
            
            assignmentObj['link'] = assignment['html_url']
            assignmentObj['relatedLinks'] = ''
            assignmentObj['notes'] = '' #assignment['description']
            # print("Assignment Name:")
            # print(assignment['name'])

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
                isNotPastAssignment = delta > timedelta(days = 10)
                if(isNotPastAssignment):
                    assignmentList.append(assignmentObj)
            else:
                assignmentList.append(assignmentObj)

            # assignmentList.append(assignmentObj)
        # create classobj for each class
        classObj = {}
        classObj['name'] = courseName
        classObj['color'] = 'rgb(162, 214, 161);'
        classObj['assignments'] = assignmentList
        classObj['order'] = order

        # if(isNotPastAssignment):
        classList.append(classObj)
        order += 1 
        # print(classList)
        # print()
        # print()
        # print(resp.json())

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

