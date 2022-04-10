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



    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    // div.innerHTML += `
    // <div id="Assignment`+newAssignment+`" class="Assignment" data-due="05/20 03:25" data-timeleft="2" data-priority="1" >
    //     <button class="AssignmentOverview" id="`+newAssignment+`AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+newAssignment+`" aria-expanded="false" aria-controls="CollapseCourse"> <!-- Will need unique target in future-->
    //         <p class="AssignmentPriority">
    //             Priority: 1
    //         </p>
    //         <div class="AssignmentName">  
    //             `+newAssignmentDisplay+`

    //         </div>
    //         <div class="AssignmentDuedate" id="`+newAssignment+`StartDate"> <!-- Will need unique id in future-->
    //             Start date: `+startTime+`
    //         </div>
    //         <div class="progress justify-content-end" style="width: 25%; float: left; margin-top: 15px">
    //             <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="100" aria-valuemax="0"> 
    //                 <div id="Assignment1TimeLeft">
    //                     2 days
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="AssignmentDuedate" id="`+newAssignment+`EndDate"> <!-- Will need unique id in future-->
    //             End date: `+endTime+`
    //         </div>
            
    //     </button>
    //     <div class="collapse" id="Collapse`+newAssignment+`"> <!-- Will need unique id in future-->
    //         <div class="AssignmentOutline clearfix">
    //                 <div class="AssignmentInfo">
    //                     <div class="leftside">
    //                         <div class="AssignmentLink"> 
    //                             <p> 
    //                                 <div>
    //                                     Assignment Link:
    //                                 </div>
    //                                 <div class="genericWrittingBox" contenteditable="true"  id="`+newAssignment+`Link"> <!-- Will need unique id in future-->
    //                                 </div>
                                    
    //                             </p>
                                
    //                         </div>
    //                         <div class="AssignmentRelatedLinks" >
    //                             <p>
    //                                 Related Links:
    //                                 <div class="genericWrittingBox" contenteditable="true" id="`+newAssignment+`RelatedLinks"> <!-- Will need unique id in future-->
                                        
    //                                 </div>
    //                             </p>
                                
    //                         </div>
    //                     </div>
    //                     <div class="rightside">
    //                         <div class="AssignmentDetails" >
    //                             <p>
    //                                 Details: 
    //                                 <div class="genericWrittingBox" contenteditable="true" id="`+newAssignment+`Details"> <!-- Will need unique id in future-->
    //                                     This is a demo assignment. 
    //                                 </div>
    //                             </p>
    //                         </div>
    //                         <div class="AssignmentStatus" id="`+newAssignment+`CheckBox"> <!-- Will need unique ids in future-->
    //                             <input type="checkbox" class="btn-check" id="`+newAssignment+`AssignmentCheckBox" autocomplete="off" onclick="completeButton('`+newAssignment+`AssignmentOverview', '`+newAssignment+`AssignmentCheckBox')">
    //                             <label class="btn btn-outline-success" for="`+newAssignment+`AssignmentCheckBox">Complete</label><br>
    //                         </div>
    //                     </div>
    //                 </div>
                
    //         </div>
    //     </div>
    // </div>`;

    
    // appends new div to the classes' assignments
    //document.getElementById("demoAssignments").appendChild(div);
}


function addAssignment(className){
    // inputs taken from user 
    // to make it dynamic, takes className from Parameter and is used to find the -
    // associated ID for variables
    var newAssignmentDisplay = document.getElementById(''+className+'Name').innerText;
    // takes the space away to ensure variables are properly named
    var newAssignment = newAssignmentDisplay.replaceAll(" ", "_");
    var startTime = document.getElementById(''+className+'Start').innerText;
    var endTime = document.getElementById(''+className+'End').innerText;
    //var className = document.getElementById("NewAssignmentName").innerHTML;

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
        <div class="AssignmentDuedate AssignmentStartDate" id="`+newAssignment+`StartDate"> <!-- Will need unique id in future-->
        <label for="Assignment1_Start">Start date:</label> <input id=" `+newAssignment +`_Start" type="datetime-local" value=`+ startTime +` aria-readonly="true">
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
                                    Add details here. 
                                </div>
                            </p>
                        </div>
                        <div class="AssignmentStatus" id="`+newAssignment+`CheckBox"> <!-- Will need unique ids in future-->
                            <input type="checkbox" class="btn-check" id="`+newAssignment+`AssignmentCheckBox" autocomplete="off" onclick="completeButton('`+newAssignment+`AssignmentOverview', '`+newAssignment+`AssignmentCheckBox')">
                            <label class="btn btn-outline-success" for="`+newAssignment+`AssignmentCheckBox">Complete</label><br>
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
    //create new div with assignment name 
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
            <button class="AddAssignmentTop" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`NewAssignment" aria-expanded="false" aria-controls="CollapseCourse">
                <div class="AddAssignmentText">
                    Add new Assignment
                </div>
            </button>

            <div class="collapse" id="Collapse`+inputClassName+`NewAssignment">
                <div class="AssignmentOutline ">
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
    var lighter = [RGB[0]+20, RGB[1]+20, RGB[2]+20];
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
    var darker = [RGB[0]-20, RGB[1]-20, RGB[2]-20];
    if(darker[0] < 0){
        darker[0] = 0;
    }
    if(darker[1] > 0){
        darker[1] = 0;
    }
    if(darker[2] > 0){
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
    document.getElementById(className+'ClassAssignments').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";
    document.getElementById(className+'AssignmentsOutline').style.backgroundColor = "rgb("+lighter[0]+","+lighter[1]+","+lighter[2]+")";
    //WIP need to Change Add new Assignments and individual assignments
}

// WIP STORE CLASSES AND ASSIGNMENTS
function storeClass(className, Assignments){

}
function storeAssignment(assignmentName, className, assignmentPriority, assignmentDueDate, assignmentStartDate, assignmentLink, assignmentRelatedLinks, assignmentNotes){
    let newAssignment ={
        name: assignmentName,                   //text
        class: className,                       //text
        priority: assignmentPriority,           //int
        dueDate: assignmentDueDate,             //datetime w/hour min
        startDate: assignmentStartDate,         //datetime w/hour min
        link: assignmentLink,                   //text
        relatedLinks: assignmentRelatedLinks,   //text
        notes: assignmentNotes,                 //text
    };

    var jsonObj = JSON.stringify(newAssignment); //creates JSON for assignment
    localStorage.setItem(className+":"+assignmentName, jsonObj); //stores assignment in local storage as item "className+assignmentName"
}

function getClassNames(){ //returns array of ClassNames
    var classList = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        classList.push(localStorage.getItem(keys[i]).class);
    }

    return classList;
}

function getAssignments(inputClassName){ //takes in class name and returns array of assignment objects in that class
    var assignmentList = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while(i--){
        if(localStorage.getItem(keys[i]).className == inputClassName)
            assignmentList.push(localStorage.getItem(keys[i]));
    }

    return assignmentList;
}


