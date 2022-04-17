/**this file contains all items having to do with getting or setting things 
 * in local storage related to class and assignment info */


//returns array of Class objects
function getClassList(){ 
    var classList = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        classList.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return classList;
}

//gets all assignments that match the requested class name
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
    localStorage.removeItem(className);
}




//takes in assignment name and returns assignment obj
//takes in class name and assignment name
//returns assignment obj in that class
function getAssignment(inputClassName, inputAssignmentName){ 
    var classObj = getClass(inputClassName);
    var assignmentList = classObj.assignments;
    var result;
    assignmentList.forEach((assignmentObj, i, array) => {
        if(assignmentObj.name == inputAssignmentName){
            result = assignmentObj;
        }
    });
    return result;
}


//adds the assignment to a class Json
function addAssignmentToClass(assignmentName, className, assignmentPriority, assignmentDueDate, assignmentStartDate, assignmentLink, assignmentRelatedLinks, assignmentNotes,isComplete){
    //if one of the dates is empty asign it todays date 
    if(assignmentStartDate == ""){ 
        assignmentStartDate = CurrentDateISOTime();
    }
    if(assignmentDueDate == ""){
        assignmentDueDate = CurrentDateISOTime();
    }

    var newAssignment ={
        name: assignmentName,                   //text
        class: className,                       //text
        priority: assignmentPriority,           //int
        dueDate: assignmentDueDate,             //datetime w/hour min
        startDate: assignmentStartDate,         //datetime w/hour min
        link: assignmentLink,                   //text
        relatedLinks: assignmentRelatedLinks,   //text
        notes: assignmentNotes,                 //text
        complete: isComplete
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
//delete assignment does not work
function deleteAssignment(className, assignmentName){
    //copies of respective class and assignment objs & arrays
    var classObj = getClass(className);
    var assignmentObj = getAssignment(className, assignmentName);
    var assignmentList = classObj.assignments;

    //find index of assignment in array that needs to be removed
    var indexToRemove = assignmentList.findIndex(myAssignment =>{
        return myAssignment.name == assignmentObj.name;
    });

    //splice removes one element at the indexToRemove
    assignmentList.splice(indexToRemove,1);


    //TODO: 
    //Remove class & store it again without assignment
    deleteClass(className);
    storeClass(classObj.name, assignmentList, classObj.color);

    //console.debug(assignmentList);
}
// WIP: removeClass
//edits HTML
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


function completeButton(assignmentName,className){

    //getting copies of objects
    var assignmentObj = getAssignment(className, assignmentName);
    var classObj = getClass(className);
    //checks if checkbox is checked
    if(document.getElementById("CheckBoxComplete"+className+assignmentName).checked){
        //this reassigns cssText for that specific box to change to gray
        document.getElementById("Overview"+className+assignmentName).style.backgroundColor = "rgb(110, 108, 117)";    
        document.getElementById("OutsideForSizeFix"+className+assignmentName).style.backgroundColor = "rgb(110, 108, 117)";
        assignmentObj.complete = true;
    } else {
        //this reverts it back to our original color
        document.getElementById("Overview"+className+assignmentName).style.backgroundColor = classObj.color;   
        document.getElementById("OutsideForSizeFix"+className+assignmentName).style.backgroundColor =classObj.color;
        assignmentObj.complete = false;    
    }

    //TODO
    //Remove old assignment from classObj's assignments
    deleteAssignment(className, assignmentName);
    addAssignmentToClass(assignmentName, className, assignmentObj.priority, assignmentObj.dueDate, assignmentObj.startDate, assignmentObj.Link, assignmentObj.relatedLinks, assignmentObj.notes,assignmentObj.complete);
    //console.debug(assignmentObj.complete);
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
        if(assignmentObj.complete == false){
            document.getElementById('Overview'+assignmentObj.class+assignmentObj.name).style.backgroundColor = "rgb("+darker[0]+","+darker[1]+","+darker[2]+")";
            document.getElementById('OutsideForSizeFix'+assignmentObj.class+assignmentObj.name).style.backgroundColor = "rgb("+RGB[0]+","+RGB[1]+","+RGB[2]+")";
        } else {
            document.getElementById('Overview'+assignmentObj.class+assignmentObj.name).style.backgroundColor = "rgb(110, 108, 117)";
            document.getElementById('OutsideForSizeFix'+assignmentObj.class+assignmentObj.name).style.backgroundColor = "rgb(110, 108, 117)";
        }
    });  
}

//can be used to print out the names into consol
function printClassList(){
    var classList = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        classList.push(localStorage.getItem(keys[i]));
    }
    
}


//clears everything including the storage
function clearPage(){
    console.debug("Before Clear")
    printClassList();
    localStorage.clear();

    // reset to original html
    document.getElementById('classList').innerHTML = ""
}

function updateDiscription(){

}
function updateURL(){

}
function updateRelated(){

}
function updatePriority(selected, assignmentName, className){
    //getting copies of objects
    //console.log(selected +" as: " + assignmentName + " class " + className);
    var assignmentObj = getAssignment(className, assignmentName);
    //checks if checkbox is checked
    
    //this reassigns cssText for that specific box to change to gray
    document.getElementById("PriorityField"+className+assignmentName).innerText = "Priority: " + selected;    
    assignmentObj.priority = selected;


    //Remove old assignment from classObj's assignments
    deleteAssignment(className, assignmentName);
    addAssignmentToClass(assignmentName, className, assignmentObj.priority, assignmentObj.dueDate, assignmentObj.startDate, assignmentObj.Link, assignmentObj.relatedLinks, assignmentObj.notes,assignmentObj.complete);
}