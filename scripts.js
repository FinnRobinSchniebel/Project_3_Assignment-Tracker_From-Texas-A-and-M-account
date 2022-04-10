function addDemo(){
    // inputs taken from user
    var newAssignmentDisplay = document.getElementById("NewAssignmentName").innerText;
    // takes the space away to ensure variables are properly named
    //var newAssignment = newAssignmentDisplay.replaceAll(" ", "_"); //useful when working with nodemo items to make sure the class is correctly formated
    var startTime = document.getElementById("NewAssignmentStart").value;
    var endTime = document.getElementById("NewAssignmentEnd").value;
    var notes = document.getElementById("NewAssignmentNotes").innerText;

    var link = document.getElementById("NewAssignmentLink").innerText;
    var relatedLinks = document.getElementById("NewAssignmentRelatedLinks").innerText;
    // need to remember what this does again 
    //document.getElementsByTagName('body')[0].appendChild(div);
    AssignmentAddHTML("Demo", newAssignmentDisplay, "1", startTime, endTime, link, relatedLinks, notes);
}


function addAssignment(className){
    // inputs taken from user 
    // to make it dynamic, takes className from Parameter and is used to find the -
    // associated ID for variables
    var newAssignmentDisplay = document.getElementById(''+className+'Name').innerText;
    // takes the space away to ensure variables are properly named
    var startTime = document.getElementById(''+className+'Start').innerText;
    var endTime = document.getElementById(''+className+'End').innerText;
    var noteDetails = document.getElementById(''+className+'Notes').innerText;

    //when these two variables are included in the html code below
    //assignment causes whole class to close
    //************************************** */
    var relatedLinks = document.getElementById(''+className+'RelatedLinks').innerText;
    var link = document.getElementById(''+className+'Link').innerText;
    var priority = 4; //test, still needs to be implemented
    
    //adds assignment to class in localstorage
    addAssignmentToClass(newAssignmentDisplay,className,priority,endTime, startTime, link, relatedLinks,noteDetails);

    populatePage();


}

function AddClass(){
    // input from user
    var inputClassNameDisplay =  document.getElementById("InputClassName").value;
    // takes the space away to ensure variables are properly named
    inputClassNameDisplay = inputClassNameDisplay.trim();

    //Add assignment will also call storeClass into local storage
    let emptyClass = [];
    storeClass(inputClassNameDisplay,emptyClass);

    populatePage();
} 


// THIS PORTION DOESNT WORK
function removeClass(){
    // input from user
    var inputClassNameDisplay = document.getElementById("RemoveClassName").value;
    // // var inputClassNameDisplay = document.getElementById("csce");
    // takes the space away to ensure variables are properly named
    // var inputClassName = inputClassNameDisplay.replaceAll(" ", "_");
    // inputClassName = inputClassName.trim();
    console.debug(inputClassNameDisplay);
    //used to remove class
    const element = document.getElementById(inputClassNameDisplay);
    console.debug(element);
    element.remove();

    console.debug("Before Delete")
    printClassList();
    // removes class from classList
    deleteClass(inputClassNameDisplay);
    console.debug("After Delete")
    printClassList();
    
}

function removeAssignment(className, assignmentName){

    // console.debug(inputClassNameDisplay);
    //used to remove class
    var removeAssignment = assignmentName.replaceAll(" ", "_");
    const element = document.getElementById(removeAssignment);
    console.debug(element);
    element.remove();

    console.debug("Before Delete")
    printClassList();
    // removes class from classList
    deleteAssignment(className, assignmentName);
    console.debug("After Delete")
    printClassList();
}

function completeButton(assignmentID, checkBoxID){

        //checks if checkbox is checked
    if(document.getElementById(checkBoxID).checked){
        //this reassigns cssText for that specific box to change to gray
        document.getElementById(assignmentID).style.cssText =`    
        background-color: rgb(110, 108, 117); 
        border-radius: 20px;
        color: rgb(0, 0, 0);
        cursor: pointer;
        box-shadow: 0px 3px 6px rgba(6, 70, 90, 0.932);
        padding: 10px;
        width: 95%;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid gray;
        text-align: left;
        outline: none;
        font-size: 15px;`;        
    } else {
        //this reverts it back to our original blueish color
        document.getElementById(assignmentID).style.cssText =`    
        background-color: rgb(75, 139, 158);
        border-radius: 20px;
        color: rgb(0, 0, 0);
        cursor: pointer;
        box-shadow: 0px 3px 6px rgba(6, 70, 90, 0.932);
        padding: 10px;
        width: 95%;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid gray;
        text-align: left;
        outline: none;
        font-size: 15px;`;
    }

}

function parseColor(sixDigitHexString){ //converts 6 digit hex color to array [R, G, B]
    var m = sixDigitHexString.match(/^#([0-9a-f]{6})$/i)[1];
    if(m){
        return[
            parseInt(m.substr(0,2),16),
            parseInt(m.substr(2,2),16),
            parseInt(m.substr(4,2),16)
        ];
    }
}

//takes input of array in format [R, G, B]
//adds 20 to each rgb value to make lighter version
function lightColor(RGB){ 
    var lighter = [RGB[0]+40, RGB[1]+40, RGB[2]+40];
    if(lighter[0] > 255){
        lighter[0] = 255;
    }
    if(lighter[1] > 255){
        lighter[1] = 255;
    }
    if(lighter[2] > 255){
        lighter[2] = 255;
    }
    return [lighter[0], lighter[1], lighter[2]];
}

//takes input of array in format [R, G, B]
//subtracts 20 to each rgb value to make darker version
function darkColor(RGB){ 
    var darker = [RGB[0]-40, RGB[1]-40, RGB[2]-40];
    if(darker[0] < 0){
        darker[0] = 0;
    }
    if(darker[1] < 0){
        darker[1] = 0;
    }
    if(darker[2] < 0){
        darker[2] = 0;
    }
    return [darker[0], darker[1], darker[2]];
}



//takes in name of a class (Ex. "demoClass") and edits color values respectively
function changeClassColor(className){
    let color = document.getElementById(className+'ColorPicker').value;
    var RGB = parseColor(color);
    var lighter = lightColor(RGB);
    document.getElementById(className+'Section').style.backgroundColor = color;
    document.getElementById(className+'ColorAssignments').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";
    document.getElementById(className+'AssignmentsOutline').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";

    var darker = darkColor(RGB);
    document.getElementById(className+'AddAssignment').style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
    document.getElementById(className+'AddNewAssignmentOutline').style.backgroundColor = color;

    //to added assignments
    var assignmentList = [];
    assignmentList = getAssignments(className);
    //console.debug(assignmentList.length);
    assignmentList.forEach((assignmentObj, i, array) => {
        console.log(assignmentObj.name+'AssignmentOutline');
        document.getElementById(assignmentObj.name+'AssignmentOverview').style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
        document.getElementById(assignmentObj.name+'AssignmentOutline').style.backgroundColor = color;
    });  

}

//storeClass: takes in user inputted className and an array of assignments to store in local storage
function storeClass(className, arrayAssignments){
    if(arrayAssignments.length == 0){
        var newClass = {
            name: className, //text
            assignments: [] //array of assignment objs
        };
    } else{
        var newClass = {
            name: className, //text
            assignments: arrayAssignments //array of assignment objs
        };
    }
    var jsonObj = JSON.stringify(newClass); //creates JSON for assignment
    localStorage.setItem(className, jsonObj); //stores assignment in local storage as item "CLASS:className"
}


function getClassList(){ //returns array of Class objects
    var classList = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        classList.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return classList;
}

//takes in class name and returns class obj
function getClass(className){ 
    var classList = getClassList(); //array of class objects
    
    classList.forEach((classObj, i, array) => {
        if(classObj.name == className){
            return classObj;
        }
    });  
}

// deletes class from list (WIP)
function deleteClass(className){
    var classList = getClassList(); //array of class objects
    
    classList.forEach((classObj, i, array) => {
        if(classObj.name == className){
            localStorage.removeItem(className);
        }
    });  
}

//delete assignment does not work
function deleteAssignment(className, assignmentName){
    var classList = getClassList(); //array of class objects
    
    classList.forEach((classObj) => {
        var assignmentList = classObj.assignments;
        console.debug(classObj.assignments);
        if(classObj.name == className){
            var index = assignmentList.indexOf(0);
            console.debug(index);
            if (index > -1){
                classObj.assignments.splice(index, 1);
            }
        }
        console.debug(classObj.assignments);
    });  
    
}


function getAssignments(className){ //returns array of assignment objects of a class
    var classList = getClassList(); //array of class objects
    var result = [];

    classList.forEach((classObj, i, array) => {
        if(classObj.name == className){
            //console.debug(classObj.assignments.length);
            result =  (classObj.assignments);
        }
        //console.debug(i);
        //console.debug(array);
    });
    return result;
}

function addAssignmentToClass(assignmentName, className, assignmentPriority, assignmentDueDate, assignmentStartDate, assignmentLink, assignmentRelatedLinks, assignmentNotes){
    var newAssignment ={
        name: assignmentName,                   //text
        class: className,                       //text
        priority: assignmentPriority,           //int
        dueDate: assignmentDueDate,             //datetime w/hour min
        startDate: assignmentStartDate,         //datetime w/hour min
        link: assignmentLink,                   //text
        relatedLinks: assignmentRelatedLinks,   //text
        notes: assignmentNotes                 //text
    };


    var classList = getClassList(); //array of class objects
    
    classList.forEach((classObj, i, array) => {
        if(classObj.name == className){
            classObj.assignments.push(newAssignment);
            var jsonObj = JSON.stringify(classObj);
            localStorage.setItem(className, jsonObj);
        }
        //console.debug(i);
        //console.debug(array);
    });

}

//takes in class name and assignment name
//returns assignment obj in that class
function getAssignment(inputClassName, inputAssignmentName){ 
    var classObj = localStorage.getItem(inputClassName); 
    var assignmentList = classObj.assignments;
    var i = assignmentList.length;

    while(i--){
        if(assignmentList[i].class == inputClassName && assignmentList[i].name == inputAssignmentName)
        return assignmentList[i];
    }
}


function printClassList(){
    var classList = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        classList.push(localStorage.getItem(keys[i]));
    }
    console.log(classList);
}

function clearPage(){
    console.debug("Before Clear")
    printClassList();
    localStorage.clear();

    // reset to original html
    document.getElementById('classList').innerHTML = ""
}


function populatePage(){
    // empties classList div, doesn't delete
    document.getElementById("classList").innerHTML = "";
   
    var classList = getClassList(); //array of class objects
    console.debug(classList);
    // makes classes reverse display 
    // color not saved ATM
    classList.slice().reverse().forEach((classObj) => {
        var className = classObj.name;
        var assignmentList = classObj.assignments;
        var i = assignmentList.length;
        // use check to get assignments properly ordered 
        var check = 0;
        PopulateClass(className);
        while (check < i){
            PopulateAssignments(assignmentList[check]);
            check ++;
        }
        console.debug(className);
    });


}


function PopulateAssignments(AssignmentInfoOBJ){

    
    // Changes display back to original
    var newAssignmentName = AssignmentInfoOBJ.name;
    var ClassName= AssignmentInfoOBJ.class;
    var startTime = AssignmentInfoOBJ.startDue;
    var endTime = AssignmentInfoOBJ.dueDate;
    var noteDetails = AssignmentInfoOBJ.notes;
    //when these two variables are included in the html code below
    //assignment causes whole class to close
    //************************************** */
    var relatedLinks = AssignmentInfoOBJ.relatedLinks;
    var link = AssignmentInfoOBJ.link;
    var priority = 4; //test, still needs to be implemented
    //todo-priority    
    AssignmentAddHTML(ClassName, newAssignmentName, priority, startTime, endTime, link, relatedLinks, noteDetails);


}

function PopulateClass(className){
    
    // input from user
    var inputClassName =  className;
    var inputClassNameDisplay = inputClassName.replaceAll("_", " ");
    // takes the space away to ensure variables are properly named
    // var inputClassName = inputClassNameDisplay.replaceAll(" ", "_");
    // inputClassName = inputClassName.trim();
    //create new div with class name 
    
    var newDiv = document.createElement('div');
    //appends to content
    //document.getElementsByTagName('body')[0].appendChild(newDiv);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    //TODO: fix add assignment portion
    newDiv.innerHTML += `
    <button class="ClassSection" id="`+inputClassName+`Section" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`" aria-expanded="false" aria-controls="Collapse`+inputClassName+`">
    <div class="ClassName">
        `+inputClassNameDisplay+`
    </div>
    <div class="DueDateSection" id="Class1_DueDateOfClosestAssignment">
        No Upcoming Assignments
    </div> 
    <div class="DueDateSection" id="Class1_TimeLeftOnClosestAssignment">
        Nearest Due Date: 
    </div> 
</button>


<div class="collapse" id="Collapse`+inputClassName+`">
    <div class="ClassAssignmentsOutline" id = "`+inputClassName+`AssignmentsOutline">
        <div class="ClassAssignments" id= "`+inputClassName+`ClassAssignments">
            <!-- Buttons in Course drop down -->
            <div align="left"> 
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> <!-- Will need unique id in future (different classes)-->
                    Sort By
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="SortByDropDown">  <!-- Will need unique id in future (different classes)-->
                    <li><a class="dropdown-item" href="#">Due Date</a></li>
                    <li><a class="dropdown-item" href="#">Priority</a></li>
                    <li><a class="dropdown-item" href="#">Incomplete</a></li>
                    <li><a class="dropdown-item" href="#">Completed</a></li>
                    </ul>
                </div>
            </div>

            <div align="right" >
                <label for="colorpicker">Color Picker:</label>
                <input type="color" id="`+inputClassName+`ColorPicker" onchange="changeClassColor('`+inputClassName+`')" value=#0f9dc9>
            </div>

            <!-- Class to dynamically add assignments to class -->
            <div class="demoAssignments" id="`+inputClassName+`Assignments">

            </div>
            <!-- demo assignment end -->
            
            <!-- add new assignment -->
            <button class="AddAssignmentTop" id="`+inputClassName+`AddAssignment" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`NewAssignment" aria-expanded="false" aria-controls="CollapseCourse">
                <div class="AddAssignmentText">
                    Add new Assignment
                </div>
            </button>

            <div class="collapse" id="Collapse`+inputClassName+`NewAssignment">
                <div class="AssignmentOutline" id="`+inputClassName+`AddNewAssignmentOutline">
                    <div class="AssignmentInfo clearfix">
                        <div class="leftside">
                            <div class="NewAssignmentInfoBox" id="`+inputClassName+`InfoBox">
                                <p> 
                                    <div>
                                        Assignment Name:
                                    </div>
                                    <div class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`Name"> <!-- Will need unique id in the future-->
                                        Add Name
                                    </div>
                                    
                                </p>
                                
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Assignment Link:
                                    <div class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`Link"> <!-- Will need unique id in the future-->
                                        Add link
                                    </div>
                                </p>
                                
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Related Links:
                                    <div class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`RelatedLinks" style=" min-height: 100px"> <!-- Will need unique id in the future-->
                                        Add links
                                    </div>
                                </p>
                                
                            </div>
                        </div>
                        <div class="rightside">
                            <div class="NewAssignmentInfoRightSideAreas leftside">
                                <p>
                                    Start date/ time: 
                                    <div class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`Start"> <!-- Will need unique id in the future-->
                                        MM/DD/YYYY hh:mm
                                    </div>
                                </p>
                            </div>
                            <div class="NewAssignmentInfoRightSideAreas rightside">
                                <p>
                                    End date/ time: 
                                    <div class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`End"> <!-- Will need unique id in the future-->
                                        MM/DD/YYYY hh:mm
                                    </div>
                                </p>
                            </div>
                            <div class="NewAssignmentNotes">
                                <p>
                                    Notes: 
                                    <div class="genericWrittingBox" contenteditable="true" id="`+inputClassName+`Notes" style="min-height: 100px;"> <!-- Will need unique id in the future-->
                                        Add notes
                                    </div>
                                </p>
                            </div>
                            <button class="btn btn-primary" onclick="addAssignment('`+inputClassName+`')" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
    var ClassesDiv = document.getElementById("classList");
    ClassesDiv.innerHTML += newDiv.innerHTML; 


    // //Add assignment will also call storeClass into local storage
    // let emptyClass = [];
    // storeClass(inputClassName,emptyClass);
} 
