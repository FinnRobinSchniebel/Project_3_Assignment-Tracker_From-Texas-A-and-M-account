function addAssignment(className){
    // inputs taken from user 
    // to make it dynamic, takes className from Parameter and is used to find the -
    // associated ID for variables
    var newAssignmentDisplay = document.getElementById(''+className+'Name').value;
    // takes the space away to ensure variables are properly named
    var startTime = document.getElementById(''+className+'Start').value; //"`+inputClassName+`Start"
    var endTime = document.getElementById(''+className+'End').value;
    //console.log(endTime);
    var noteDetails = document.getElementById(''+className+'Notes').value;
    var priority = document.getElementById("PriorityCreate" + className).value;

    //when these two variables are included in the html code below
    //assignment causes whole class to close
    //************************************** */
    var relatedLinks = document.getElementById(''+className+'RelatedLinks').value;
    var link = document.getElementById(''+className+'Link').value;
    
    
    //adds assignment to class in localstorage
    addAssignmentToClass(newAssignmentDisplay,className,priority,endTime,startTime, link, relatedLinks,noteDetails,false, '', '');

    populatePage();


}

function AddClass(){
    // input from user
    var inputClassNameDisplay =  document.getElementById("InputClassName").value;
    // takes the space away to ensure variables are properly named
    var inputClassName = inputClassNameDisplay.replaceAll(" ", "_");
    inputClassName = inputClassName.trim();

    //Add assignment will also call storeClass into local storage
    let emptyClass = [];
    var defaultColor = "rgb(138, 138, 138);" //default color of a new class
    storeClass(inputClassName,emptyClass,defaultColor);

    populatePage();
} 


//WIP: removeAssignment
//edits HTML
function removeAssignment(className, assignmentName, assignmentDiv){

    // console.debug(inputClassNameDisplay);
    //used to remove class
    var removeAssignment = assignmentName.replaceAll(" ", "_");
    var removeClass = className.replaceAll(" ", "_");
    const element = document.getElementById(assignmentDiv);
    //console.debug(element);
    element.remove();

    //console.debug("Before Delete")
    printClassList();
    // removes class from classList
    deleteAssignment(removeClass, removeAssignment);
    //console.debug("After Delete")
    printClassList();
}

function populatePage(){
    // empties classList div, doesn't delete
    document.getElementById("classList").innerHTML = "";
   
    var classList = getClassList(); //array of class objects
    console.log(classList);
    //console.debug(classList);
    // makes classes reverse display 
    // color not saved ATM
    classList.slice().reverse().forEach((classObj) => {
        var className = classObj.name;
        var assignmentList = classObj.assignments;
        assignmentList = sortAssignment(assignmentList);
        var i = assignmentList.length;
        var closest = findClosestDue(assignmentList);
        // use check to get assignments properly ordered 
        var index = 0;
        PopulateClass(className, closest, i);
        // loops through array of assignments and add each one to class
        while (index < i){
            //console.log(assignmentList[index]);
            PopulateAssignments(assignmentList[index] ,"");
            index ++;
        }
        loadClassColor(className);
    });


}

//TODO: NEED TO ADD BACK REMOVE BUTTON 
function PopulateAssignments(AssignmentInfoOBJ, Location){


    // Changes display back to original
    var ClassName= AssignmentInfoOBJ.class;
    var newAssignmentName = AssignmentInfoOBJ.name;
    // takes initial "classname+assignmentname" -> "assignmentname"
    //newAssignmentName = newAssignmentName.replace(ClassName, "");
    var startTime = AssignmentInfoOBJ.startDate;
    var endTime = AssignmentInfoOBJ.dueDate;
    var noteDetails = AssignmentInfoOBJ.notes;
    //when these two variables are included in the html code below
    //assignment causes whole class to close
    //************************************** */
    var relatedLinks = AssignmentInfoOBJ.relatedLinks;
    var link = AssignmentInfoOBJ.link;
    //console.log(AssignmentInfoOBJ.link);
    var priority = AssignmentInfoOBJ.priority; //test, still needs to be implemented
    var isComplete = AssignmentInfoOBJ.complete;
    console.log("ASSIGNMENT NAME IN POP ASSIGN");
    console.log(newAssignmentName);
    console.log("ASSIGNMENT NOTES IN POP ASSIGN");
    console.log(noteDetails);
    AssignmentAddHTML(ClassName, newAssignmentName, priority, startTime, endTime, link, relatedLinks, noteDetails, isComplete, Location);



}

function PopulateClass(className, closest, assignmentcount){
    
    // input from user
    var inputClassName =  className;
    // when removed adding assignments doesnt work will check
    var inputClassNameDisplay = inputClassName.replaceAll("_", " ");
    // takes the space away to ensure variables are properly named
    inputClassName = inputClassNameDisplay.replaceAll(" ", "_");
    inputClassName = inputClassName.trim();
    //create new div with class name 
    
    var newDiv = document.createElement('div');
    //appends to content
    //document.getElementsByTagName('body')[0].appendChild(newDiv);
    var closestAssignmentDate = 'No assignments'
    if(closest != null){
        closestAssignmentDate = TimeToString(closest.dueDate);
    }
    var upcoming= "No Upcoming Assignments";
    
    if(assignmentcount > 1){
        upcoming = "There Are <strong>" + assignmentcount + "</strong> Upcoming Assingments";
    }
    else if(assignmentcount > 0){
        upcoming = "There Is <strong>" + assignmentcount + "</strong> Upcoming Assingment";
    }
    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed
    newDiv.innerHTML += `
    <button class="ClassSection" id="`+inputClassName+`Section" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`" aria-expanded="false" aria-controls="Collapse`+inputClassName+`">
        <div class="ClassName">
            `+inputClassNameDisplay+`
        </div>
        <div class="DueDateSection" id="Class1_DueDateOfClosestAssignment">
            `+upcoming+`
        </div> 
        <div class="DueDateSection" id="Class1_TimeLeftOnClosestAssignment">
            Nearest Due Date: `+ closestAssignmentDate +`
        </div> 
    </button>


    <div class="collapse" id="Collapse`+inputClassName+`">
        <div class="ClassAssignmentsOutline" id = "`+inputClassName+`AssignmentsOutline">
            <div class="ClassAssignments" id= "`+inputClassName+`ClassAssignments">
                <div align="right" >
                    <label for="colorpicker">Color Picker:</label>
                    <input type="color" id="`+inputClassName+`ColorPicker" onchange="changeClassColor('`+inputClassName+`')" value=#246A81>
                </div>

                <!-- Class to dynamically add assignments to class -->
                <div class="demoAssignments" id="`+inputClassName+`Assignments">


                
                </div>
                
                <!-- add new assignment -->
                <button class="AddAssignmentTop" id="`+inputClassName+`AddAssignment" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`NewAssignment" aria-expanded="false" aria-controls="CollapseCourse">
                    <div class="AddAssignmentText">
                        Add new Assignment
                    </div>
                </button>

                <div class="collapse" id="Collapse`+inputClassName+`NewAssignment">
                    <div class="AddAssignmentcontent" id="`+inputClassName+`AddNewAssignmentOutline">
                        <div class="AssignmentInfo clearfix">
                            <div class="leftside">
                                <div class="NewAssignmentInfoBox" id="`+inputClassName+`InfoBox">
                                    <p> 
                                        <div>
                                            Assignment Name:
                                        </div>
                                        <input class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`Name" placeholder="Add Name"> 
                                        
                                    </p>
                                    
                                </div>
                                <div class="NewAssignmentInfoBox">
                                    <p>
                                        Assignment Link:
                                    </p>
                                    <textarea class="TextInfoBox" contenteditable="true" id="`+inputClassName+`Link" placeholder="Add link"></textarea>
                                    
                                </div>
                                <div class="NewAssignmentInfoBox">
                                    <p>
                                        Related Links:
                                    </p>
                                    <textarea class="TextInfoBox" contenteditable="true" id="`+inputClassName+`RelatedLinks" style=" min-height: 100px" placeholder="Add links"></textarea>
                                    
                                </div>
                            </div>
                            <div class="rightside">
                                <div class="NewAssignmentInfoRightSideAreas leftside">
                                    <p>
                                        Start date/ time: 
                                        <input class="genericWrittingBox" id="`+inputClassName+`Start" type="datetime-local"> 
                                                            
                                        </input>
                                    </p>
                                </div>
                                <div class="NewAssignmentInfoRightSideAreas rightside">
                                    <p>
                                        End date/ time: 
                                        <input class="genericWrittingBox" id="`+inputClassName+`End" type="datetime-local"> 
                                                            
                                        </input>
                                    </p>
                                </div>
                                <div class="NewAssignmentNotes">
                                    <p>
                                        Notes: 
                                    </p>
                                    <textarea class="TextInfoBox" contenteditable="true" id="`+inputClassName+`Notes" style="min-height: 100px;" placeholder="Add notes"></textarea>
                                </div>
                                <div class="NewAssignmentNotes">
                                    <Label for="PriorityCreate`+inputClassName+`">Priority:</Label>
                                    <select class="PriorityPicker" aria-label="Priority select table" id="PriorityCreate`+inputClassName+`">
                                        <option value="1" selected>1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <button class="btn btn-primary" onclick="addAssignment('`+inputClassName+`')" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    submit
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div style="float: center;">
                    <button class="forceRemove" type="button" id="`+ inputClassName + `ForceRemove" onclick="removeClass('`+ inputClassName +`')">Delete</button>
                </div>
            </div>
        </div>
    </div>`;
    var ClassesDiv = document.getElementById("classList");
    ClassesDiv.innerHTML += newDiv.innerHTML;
} 


//Generates todays date and converts it to ISO keeping its timezone offset
function CurrentDateISOTime(){

    //formula sourced from: https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
    var today = new Date(); //todays date UTC
    var offset = today.getTimezoneOffset() * 60000; //60000 timezone with milliseconds 
    var today = (new Date(Date.now() - offset)).toISOString().slice(0, -8); 
    return today;
}

//gets the closest non-past due assignment
function findClosestDue(ListAssignments){
    //console.log(ListAssignments);
    if(ListAssignments.length == 0){ //edge case for no assignments
        return null;
    }
    var currentClossest =ListAssignments[0];
    for(var i =0; i < ListAssignments.length; i++){
        if(ListAssignments[i].dueDate < currentClossest.dueDate){
            currentClossest = ListAssignments[i];
        }   
    }
    if(currentClossest ){

    }
    return currentClossest;
}


function findPastDue(listOfAssignments){

}

function LogoutUser(){
    $.ajax({
        url:"/Logout",
        type: "POST",
        success: function (response){
            window.location.replace('./login')
        }
    });
    localStorage.clear()
}

function updateClass(newClassObj){
    var jsonObj = JSON.stringify(newClassObj);
    localStorage.setItem(newClassObj.name, jsonObj);
}

$(window).resize(function(){
    $('.content').css({
        'padding-top' : $('.Mynavbar').height() +50 +'px'
    });
});