function addAssignment(){
    // inputs taken from user
    var newAssignment = document.getElementById("NewAssignmentName").innerHTML;
    var startTime = document.getElementById("NewAssignmentStart").innerHTML;
    var endTime = document.getElementById("NewAssignmentEnd").innerHTML;
    var className = document.getElementById("NewAssignmentName").innerHTML;

    //create new div with assignment name 
    var div = document.createElement('div');
    div.id = newAssignment;

    // need to remember what this does again 
    document.getElementsByTagName('body')[0].appendChild(div);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    // "Collaspe`+newAssignment+`" is not working? so i put collapse2 for now to test stuff
    div.innerHTML += `
    <button class="AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse2" aria-expanded="false" aria-controls="CollapseCourse"> <!-- Will need unique target in future-->
        <p class="AssignmentPriority">
            Priority: 1
        </p>
        <div class="AssignmentName">
            
            `+newAssignment+`

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

    <div class="collapse" id="Collapse2"> <!-- Will need unique id in future-->
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
                                    This is a demo assignment. 
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            
        </div>

    </div>`;

    
    // appends new div to the classes' assignments
    document.getElementById("demoAssignments").appendChild(div);
}

function AddClass(){
    // input from user
    var inputClassName =  document.getElementById("InputClassName").value;

    //create new div with assignment name 
    var newDiv = document.createElement('div');
    newDiv.id = inputClassName;

    //appends to content
    //document.getElementsByTagName('body')[0].appendChild(newDiv);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    //TODO: fix add assignment portion
    newDiv.innerHTML += `
    <button class="ClassSection" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`" aria-expanded="false" aria-controls="Collapse`+inputClassName+`">
    <div class="ClassName">
        `+inputClassName+`
    </div>
    <div class="DueDateSection" id="Class1_DueDateOfClosestAssignment">
        No Upcoming Assignments
    </div> 
    <div class="DueDateSection" id="Class1_TimeLeftOnClosestAssignment">
        Nearest Due Date: 
    </div> 
</button>


<div class="collapse" id="Collapse`+inputClassName+`">
    <div class="ClassAssignmentsOutline">
        <div class="ClassAssignments">
            <!-- Buttons in Course drop down -->
            <div align="left"> 
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> <!-- Will need unique id in future (different classes)-->
                    Sort By
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="SortByDropDown">  <!-- Will need unique id in future (different classes)-->
                    <li><a class="dropdown-item" href="#">Due Date</a></li>
                    <li><a class="dropdown-item" href="#">Priority</a></li>
                    <li><a class="dropdown-item" href="#">Completed</a></li>
                    </ul>
                </div>
            </div>
        
            <!-- Class to dynamically add assignments to class -->
            <div class="demoAssignments" id="`+inputClassName+`Assignments">
                <!-- demo assignment start-->
                <button class="AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#`+inputClassName+`Assignments" aria-expanded="false" aria-controls="CollapseCourse"> <!-- Will need unique target in future-->
                    <p class="AssignmentPriority">
                        Priority: 1
                    </p>
                    <div class="AssignmentName">
                        
                        Demo Assignment 1
                    </div>
                    <div class="AssignmentDuedate" id="Assignment1StartDate"> <!-- Will need unique id in future-->
                        Start date: dd/mm hh:minmin
                    </div>
                    <div class="progress justify-content-end" style="width: 25%; float: left; margin-top: 15px">
                        <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="100" aria-valuemax="0"> 
                            <div id="Assignment1TimeLeft">
                                2 days
                            </div>
                        </div>
                    </div>
                    <div class="AssignmentDuedate" id="Assignment1EndDate"> <!-- Will need unique id in future-->
                        End date: dd/mm hh:minmin
                    </div>
                    
                </button>

                <div class="collapse" id="`+inputClassName+`Assignments"> <!-- Will need unique id in future-->
                    <div class="AssignmentOutline clearfix">
                        <div class="AssignmentInfo">
                            <div class="leftside">
                                <div class="AssignmentLink"> 
                                    <p> 
                                        <div>
                                            Assignment Link:
                                        </div>
                                        <div class="genericWrittingBox" contenteditable="true" id="Assignment1 Link"> <!-- Will need unique id in future-->

                                        </div>
                                        
                                    </p>
                                    
                                </div>
                                <div class="AssignmentRelatedLinks">
                                    <p>
                                        Related Links:
                                        <div class="genericWrittingBox" contenteditable="true" id="Assignment1 relatedLinks"> <!-- Will need unique id in future-->
                                            
                                        </div>
                                    </p>
                                    
                                </div>
                            </div>
                            <div class="rightside">
                                <div class="AssignmentDetails">
                                    <p>
                                        Details: 
                                        <div class="genericWrittingBox" contenteditable="true" id="Assignment1 details"> <!-- Will need unique id in future-->
                                            This is a demo assignment. 
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                            <div class="NewAssignmentInfoBox">
                                <p> 
                                    <div>
                                        Assignment Name:
                                    </div>
                                    <div class="genericWrittingBox" contenteditable="true" id="NewAssignmentName"> <!-- Will need unique id in the future-->
                                        Add Name
                                    </div>
                                    
                                </p>
                                
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Assignment Link:
                                    <div class="genericWrittingBox" contenteditable="true" id="NewAssignmentLink"> <!-- Will need unique id in the future-->
                                        Add link
                                    </div>
                                </p>
                                
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Related Links:
                                    <div class="genericWrittingBox" contenteditable="true" id="NewAssignmentRelatedLinks" style=" min-height: 100px"> <!-- Will need unique id in the future-->
                                        Add links
                                    </div>
                                </p>
                                
                            </div>
                        </div>
                        <div class="rightside">
                            <div class="NewAssignmentInfoRightSideAreas leftside">
                                <p>
                                    Start date/ time: 
                                    <div class="genericWrittingBox" contenteditable="true" id="NewAssignmentStart"> <!-- Will need unique id in the future-->
                                        MM/DD/YYYY hh:mm
                                    </div>
                                </p>
                            </div>
                            <div class="NewAssignmentInfoRightSideAreas rightside">
                                <p>
                                    End date/ time: 
                                    <div class="genericWrittingBox" contenteditable="true" id="NewAssignmentEnd"> <!-- Will need unique id in the future-->
                                        MM/DD/YYYY hh:mm
                                    </div>
                                </p>
                            </div>
                            <div class="NewAssignmentNotes">
                                <p>
                                    Notes: 
                                    <div class="genericWrittingBox" contenteditable="true" id="NewAssignmentNotes" style="min-height: 100px;"> <!-- Will need unique id in the future-->
                                        Add notes
                                    </div>
                                </p>
                            </div>
                            <button class="btn btn-primary" onclick="addAssignment(className)" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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

