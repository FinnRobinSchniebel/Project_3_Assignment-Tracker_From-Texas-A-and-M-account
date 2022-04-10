


function addAssignment(className){
    // inputs taken from user 
    // to make it dynamic, takes className from Parameter and is used to find the -
    // associated ID for variables
    var newAssignmentDisplay = document.getElementById(''+className+'Name').innerText;
    // takes the space away to ensure variables are properly named
    var newAssignment = newAssignmentDisplay.replaceAll(" ", "_");
    newAssignment = ''+ className + newAssignment;
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
    addAssignmentToClass(newAssignment,className,priority,endTime, startTime, link, relatedLinks,noteDetails);

    //create new div with assignment name 
    var div = document.createElement('div');
    div.id = newAssignment;

    // need to remember what this does again 
    document.getElementsByTagName('body')[0].appendChild(div);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    // fixed complete boxes by changing "innerHTML" to "innerText"
    div.innerHTML += `
    <button class="AssignmentOverview" id="`+newAssignment+`AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+newAssignment+`" aria-expanded="false" aria-controls="CollapseCourse"> <!-- Will need unique target in future-->
        <p class="AssignmentPriority">
            Priority: 1
        </p>
        <div class="AssignmentName">
            `+newAssignmentDisplay+`

        </div>
        <div class="AssignmentDuedate" id="`+newAssignment+`StartDate"> <!-- Will need unique id in future-->
            Start date: `+startTime+`
        </div>
        <div class="progress justify-content-end" style="width: 25%; float: left; margin-top: 15px">
            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="100" aria-valuemax="0"> 
                <div id="Assignment1TimeLeft">
                    2 days
                </div>
            </div>
        </div>
        <div class="AssignmentDuedate" id="`+newAssignment+`EndDate"> <!-- Will need unique id in future-->
            End date: `+endTime+`
        </div>
        
    </button>

    <div class="collapse" id="Collapse`+newAssignment+`"> <!-- Will need unique id in future-->
        <div class="AssignmentOutline clearfix">
                <div class="AssignmentInfo">
                    <div class="leftside">
                        <div class="AssignmentLink"> 
                            <p> 
                                <div>
                                    Assignment Link:
                                </div>
                                <div class="genericWrittingBox" contenteditable="true"  id="`+newAssignment+`Link"> <!-- Will need unique id in future-->

                                </div>
                                
                            </p>
                            
                        </div>
                        <div class="AssignmentRelatedLinks" >
                            <p>
                                Related Links:
                                <div class="genericWrittingBox" contenteditable="true" id="`+newAssignment+`RelatedLinks"> <!-- Will need unique id in future-->
          
                                </div>
                            </p>
                            
                        </div>
                    </div>
                    <div class="rightside">
                        <div class="AssignmentDetails" >
                            <p>
                                Details: 
                                <div class="genericWrittingBox" contenteditable="true" id="`+newAssignment+`Details"> <!-- Will need unique id in future-->
                                     
                                </div>
                            </p>
                        </div>
                        <div class="AssignmentStatus" id="`+newAssignment+`CheckBox"> <!-- Will need unique ids in future-->
                            <input type="checkbox" class="btn-check" id="`+newAssignment+`AssignmentCheckBox" autocomplete="off" onclick="completeButton('`+newAssignment+`AssignmentOverview', '`+newAssignment+`AssignmentCheckBox')">
                            <label class="btn btn-outline-success" for="`+newAssignment+`AssignmentCheckBox">Complete</label><br>
                        </div>
                        <div class="removeButton" id="`+newAssignment+`Remove"> <!-- Will need unique ids in future-->
                            <button class="button" type="button" value="" onclick="removeAssignment('`+className+`', '`+newAssignment+`')">Remove</button>
                        </div>
                    </div>
                </div>
            
        </div>

    </div>`;

    
    // appends new div to the classes' assignments
    document.getElementById(''+className+'Assignments').appendChild(div);


}

function AddClass(){
    // input from user
    var inputClassNameDisplay =  document.getElementById("InputClassName").value;
    // takes the space away to ensure variables are properly named
    var inputClassName = inputClassNameDisplay.replaceAll(" ", "_");
    inputClassName = inputClassName.trim();
    //create new div with class name   
    var newDiv = document.createElement('div');
    newDiv.id = inputClassName;
    console.debug(newDiv.id);

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
    </div> ` +
    // <div class="RemoveSection" id="Class1_RemoveAssignment">
    //     <button class="btn btn-primary" onclick="removeClass(`+inputClassName+`)" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    //         remove
    //     </button>
    // </div> 
    `</button>


<div class="collapse" id="Collapse`+inputClassName+`">
    <div class="ClassAssignmentsOutline" id = "`+inputClassName+`AssignmentsOutline">
        <div class="ClassAssignments" id= "`+inputClassName+`ColorAssignments">
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


    //Add assignment will also call storeClass into local storage
    let emptyClass = [];
    storeClass(inputClassName,emptyClass);
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
   // var assignmentList = getAssignments(className);
  //  var i = assignmentList.length;
   // while(i--){
  //      console.debug(className+assignmentList[i].name+'AssignmentOverview');
   //     document.getElementById(className+assignmentList[i].name+'AssignmentOverview').style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
  //  }

}

//storeClass: takes in user inputted className and an array of assignments to store in local storage
function storeClass(className, arrayAssignments){
    var newClass = {
        name: className, //text
        assignments: arrayAssignments //array of assignment objs
    };
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

// THIS PORTION DOESNT WORK
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
    console.debug("After Clear")
    printClassList();
    // reset to original html
    document.getElementsByTagName('body')[0].innerHTML =`
    <body class= background>
    <!-- TEST COMMIT -->

    <div class="content">

        <!-- Navigation Bar -->
        <div class=Mynavbar>
            <button class="button" onclick="location.href='Home.html'">Home </button>
            <button class="button" onclick="location.href='Quick_View.html'">Quick View</button>
            <button class="button" onclick="location.href='AddLocation.html'">View and Add Assignment locations</button> 
            
        </div>

        <!-- Put all new classes made in here -->
        <div class="Classes" id="classList">
            

        <!-- Add Class Button **This section was copy pasted in** -->
         <button class="AddClassSection" type="button" data-bs-toggle="collapse" data-bs-target="#CollapseAddClass" aria-expanded="false" aria-controls="CollapseCourse">
            <div class="AddClass">
                Add Class
            </div>
        </button>

        <div class="collapse" id="CollapseAddClass">
            <div class="ClassAssignmentsOutline">
                <div class="NewClassName">
                    <form>
                        Enter Class Name: <input type="text" id="InputClassName" placeholder="Ex. 'CSCE 315'">
                        <button class="SubmitButton" type="button" value="" onclick="AddClass()">Submit</button>
                    </form>
            </div>
        </div>
        <!-- Add Class Button End-->
    </div>
    <button class="button" type="button" value="" onclick="clearPage()">Clear</button>
</body>
    `   
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

function PopulateAssignments(assignmentList){

    // inputs taken from assignmentList
    var newAssignment = ''+ assignmentList.class + assignmentList.name;
    var className = assignmentList.class;
    // Changes display back to original
    var newAssignmentDisplay = assignmentList.name.replaceAll("_", " ");
    newAssignmentDisplay = newAssignmentDisplay.replaceAll(className, "");
    var startTime = assignmentList.startDue;
    var endTime = assignmentList.dueDate;
    var noteDetails = assignmentList.notes;
    //when these two variables are included in the html code below
    //assignment causes whole class to close
    //************************************** */
    var relatedLinks = assignmentList.relatedLinks;
    var link = assignmentList.link;
    var priority = 4; //test, still needs to be implemented

    //adds assignment to class in localstorage
    addAssignmentToClass(newAssignment,className,priority,endTime, startTime, link, relatedLinks,noteDetails);

    //create new div with assignment name 
    var div = document.createElement('div');
    div.id = newAssignment;

    // need to remember what this does again 
    document.getElementsByTagName('body')[0].appendChild(div);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    div.innerHTML += `
    <button class="AssignmentOverview" id="`+newAssignment+`AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+newAssignment+`" aria-expanded="false" aria-controls="CollapseCourse"> <!-- Will need unique target in future-->
        <p class="AssignmentPriority">
            Priority: 1
        </p>
        <div class="AssignmentName">
            `+newAssignmentDisplay+`

        </div>
        <div class="AssignmentDuedate" id="`+newAssignment+`StartDate"> <!-- Will need unique id in future-->
            Start date: `+startTime+`
        </div>
        <div class="progress justify-content-end" style="width: 25%; float: left; margin-top: 15px">
            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="100" aria-valuemax="0"> 
                <div id="Assignment1TimeLeft">
                    2 days
                </div>
            </div>
        </div>
        <div class="AssignmentDuedate" id="`+newAssignment+`EndDate"> <!-- Will need unique id in future-->
            End date: `+endTime+`
        </div>
        
    </button>

    <div class="collapse" id="Collapse`+newAssignment+`"> <!-- Will need unique id in future-->
        <div class="AssignmentOutline clearfix">
                <div class="AssignmentInfo">
                    <div class="leftside">
                        <div class="AssignmentLink"> 
                            <p> 
                                <div>
                                    Assignment Link:
                                </div>
                                <div class="genericWrittingBox" contenteditable="true"  id="`+newAssignment+`Link"> <!-- Will need unique id in future-->

                                </div>
                                
                            </p>
                            
                        </div>
                        <div class="AssignmentRelatedLinks" >
                            <p>
                                Related Links:
                                <div class="genericWrittingBox" contenteditable="true" id="`+newAssignment+`RelatedLinks"> <!-- Will need unique id in future-->
          
                                </div>
                            </p>
                            
                        </div>
                    </div>
                    <div class="rightside">
                        <div class="AssignmentDetails" >
                            <p>
                                Details: 
                                <div class="genericWrittingBox" contenteditable="true" id="`+newAssignment+`Details"> <!-- Will need unique id in future-->
                                     
                                </div>
                            </p>
                        </div>
                        <div class="AssignmentStatus" id="`+newAssignment+`CheckBox"> <!-- Will need unique ids in future-->
                            <input type="checkbox" class="btn-check" id="`+newAssignment+`AssignmentCheckBox" autocomplete="off" onclick="completeButton('`+newAssignment+`AssignmentOverview', '`+newAssignment+`AssignmentCheckBox')">
                            <label class="btn btn-outline-success" for="`+newAssignment+`AssignmentCheckBox">Complete</label><br>
                        </div>
                        <div class="removeButton" id="`+newAssignment+`Remove"> <!-- Will need unique ids in future-->
                            <button class="button" type="button" value="" onclick="removeAssignment('`+className+`', '`+newAssignment+`')">Remove</button>
                        </div>
                    </div>
                </div>
            
        </div>

    </div>`;

    
    // appends new div to the classes' assignments
    document.getElementById(''+className+'Assignments').appendChild(div);


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
    newDiv.id = inputClassName;

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
        <div class="ClassAssignments" id= "`+inputClassName+`ColorAssignments">
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


    //Add assignment will also call storeClass into local storage
    let emptyClass = [];
    storeClass(inputClassName,emptyClass);
} 

// window.onload = function() {
//     PopulatePage();
// }
