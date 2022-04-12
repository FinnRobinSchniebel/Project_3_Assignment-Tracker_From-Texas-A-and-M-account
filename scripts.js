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
    var startTime = document.getElementById(''+className+'Start').value; //"`+inputClassName+`Start"
    var endTime = document.getElementById(''+className+'End').value;
    console.log(endTime);
    var noteDetails = document.getElementById(''+className+'Notes').innerText;

    //when these two variables are included in the html code below
    //assignment causes whole class to close
    //************************************** */
    var relatedLinks = document.getElementById(''+className+'RelatedLinks').innerText;
    var link = document.getElementById(''+className+'Link').innerText;
    var priority = 4; //test, still needs to be implemented
    
    //adds assignment to class in localstorage
    addAssignmentToClass(newAssignmentDisplay,className,priority,endTime,startTime, link, relatedLinks,noteDetails);

    populatePage();


}

function AddClass(){
    // input from user
    var inputClassNameDisplay =  document.getElementById("InputClassName").value;
    // takes the space away to ensure variables are properly named
    inputClassNameDisplay = inputClassNameDisplay.trim();

    //Add assignment will also call storeClass into local storage
    let emptyClass = [];
    var defaultColor = "rgb(138, 138, 138);" //default color of a new class
    storeClass(inputClassNameDisplay,emptyClass,defaultColor);

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
    //used to remove class
    const element = document.getElementById(inputClassNameDisplay);
    element.remove();

    
    printClassList();
    // removes class from classList
    deleteClass(inputClassNameDisplay);
    printClassList();
    
}

function removeAssignment(className, assignmentName){

    // console.debug(inputClassNameDisplay);
    //used to remove class
    var removeAssignment = assignmentName.replaceAll(" ", "_");
    const element = document.getElementById(removeAssignment);
    //console.debug(element);
    element.remove();

    //console.debug("Before Delete")
    printClassList();
    // removes class from classList
    deleteAssignment(className, assignmentName);
    //console.debug("After Delete")
    printClassList();
}

function completeButton(assignmentID, checkBoxID){

        //checks if checkbox is checked
    if(document.getElementById(checkBoxID).checked){
        //this reassigns cssText for that specific box to change to gray
        document.getElementById("Overview"+assignmentID).style.backgroundColor = "rgb(110, 108, 117)";    
        document.getElementById("OutsideForSizeFix"+assignmentID).style.backgroundColor = "rgb(110, 108, 117)"; 
    } else {
        //this reverts it back to our original color
        document.getElementById("Overview"+assignmentID).style.backgroundColor = "rgb(75, 139, 158)";   
        document.getElementById("OutsideForSizeFix"+assignmentID).style.backgroundColor ="rgb(75, 139, 158)";    
    }

}

//needed for colorpicker
// input is text in format "rgb(R,G,B)" 
function rgbToHex(RGBcolor) {
    var inputSubstring = RGBcolor.substring(4,RGBcolor.length-2);
    var RGBstringArray = inputSubstring.split(",");
    var RGBnum = [];

    RGBstringArray.forEach(str => {
        RGBnum.push(Number(str));
      });

    return "#" + ((1 << 24) + (RGBnum[0] << 16) + (RGBnum[1] << 8) + RGBnum[2]).toString(16).slice(1);
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



//this function is called when the color picker changes
//this function stores the new color into local storage
function changeClassColor(className){
    let color = document.getElementById(className+'ColorPicker').value;
    var RGB = parseColor(color);

    //setting color update into localstorage
    var classObj = getClass(className);
    classObj.color = "rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+")";
    var jsonObj = JSON.stringify(classObj);
    localStorage.setItem(className, jsonObj);


    var lighter = lightColor(RGB);
    document.getElementById(className+'Section').style.backgroundColor = "rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+")";
    document.getElementById(className+'ClassAssignments').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";
    document.getElementById(className+'AssignmentsOutline').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";

    var darker = darkColor(RGB);
    document.getElementById(className+'AddAssignment').style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
    document.getElementById(className+'AddNewAssignmentOutline').style.backgroundColor = "rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+")";

    //to added assignments
    var assignmentList = [];
    assignmentList = getAssignments(className);
    assignmentList.forEach((assignmentObj, i, array) => {
        document.getElementById('Overview'+assignmentObj.class+assignmentObj.name).style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
        document.getElementById('OutsideForSizeFix'+assignmentObj.class+assignmentObj.name).style.backgroundColor = color;
    });  
}

//this function is called when loading a class from localstorage
//this function is called in populate page and laods the class with the color stored in local storage
function loadClassColor(className){
    var classObj = getClass(className);
    console.debug(localStorage);
    let RGB = classObj.color;
    var lighter = lightColor(RGB);
    document.getElementById(className+'Section').style.backgroundColor = "rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+")";
    document.getElementById(className+'ClassAssignments').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";
    document.getElementById(className+'AssignmentsOutline').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";
    var darker = darkColor(RGB);
    document.getElementById(className+'AddAssignment').style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
    document.getElementById(className+'AddNewAssignmentOutline').style.backgroundColor = "rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+")";

    //to added assignments
    var assignmentList = [];
    assignmentList = getAssignments(className);
    assignmentList.forEach((assignmentObj, i, array) => {
        document.getElementById('Overview'+assignmentObj.class+assignmentObj.name).style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
        document.getElementById('OutsideForSizeFix'+assignmentObj.class+assignmentObj.name).style.backgroundColor = color;
    });  
}



//storeClass: takes in user inputted className and an array of assignments to store in local storage
function storeClass(className, arrayAssignments, classColor){
    if(arrayAssignments.length == 0){
        var newClass = {
            name: className, //text
            assignments: [], //array of assignment objs
            color: classColor //text
        };
    } else{
        var newClass = {
            name: className, //text
            assignments: arrayAssignments, //array of assignment objs
            color: classColor //text

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
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        var classObj = JSON.parse(localStorage.getItem(keys[i]));
        if(classObj.name == className){
            return classObj;
        }
    } 
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
        //console.debug(classObj.assignments);
        if(classObj.name == className){
            var index = assignmentList.indexOf(0);
            console.debug(index);
            if (index > -1){
                classObj.assignments.splice(index, 1);
            }
        }
        //console.debug(classObj.assignments);
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
    //console.debug(classList);
    // makes classes reverse display 
    // color not saved ATM
    classList.slice().reverse().forEach((classObj) => {
        var className = classObj.name;
        var assignmentList = classObj.assignments;
        var i = assignmentList.length;
        // use check to get assignments properly ordered 
        var index = 0;
        PopulateClass(className);
        // loops through array of assignments and add each one to class
        while (index < i){
            PopulateAssignments(assignmentList[index]);
            index ++;
        }
    });


}

//TODO: NEED TO ADD BACK REMOVE BUTTON 
function PopulateAssignments(AssignmentInfoOBJ){

    
    // Changes display back to original
    var ClassName= AssignmentInfoOBJ.class;
    var newAssignmentName = AssignmentInfoOBJ.name;
    // takes initial "classname+assignmentname" -> "assignmentname"
    newAssignmentName = newAssignmentName.replace(ClassName, "");
    var startTime = AssignmentInfoOBJ.startDate;
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
                <input type="color" id="`+inputClassName+`ColorPicker" onchange="changeClassColor('`+inputClassName+`')" value=#246A81>
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


window.onload = function(){
    populatePage();
}
