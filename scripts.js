function addAssignment(){
    // inputs taken from user
    var newAssignment = document.getElementById("NewAssignmentName").innerHTML;
    var startTime = document.getElementById("NewAssignmentStart").innerHTML;

    //create new div with assignment name 
    var div = document.createElement('div');
    div.id = newAssignment;

    // need to remember what this does again 
    document.getElementsByTagName('body')[0].appendChild(div);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    div.innerHTML += `
    <button class="AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse"`+newAssignment+` aria-expanded="false" aria-controls="CollapseCourse">
                                <p class="AssignmentPriority">
                                    Priority: 1
                                </p>
                                <div class="AssignmentName" id = "AssignmentName2">
                                    
                                    `+newAssignment+` 
                                </div>
                                <div class="AssignmentDuedate" >
                                    Start date: `+ startTime +`
                                </div>
                            </button>
                
    <div class="collapse" id="Collapse"`+newAssignment+`>
        <div class="AssignmentOutline">
            <section>
                <div class="AssignmentInfo">
                    <div class="AssignmentLink">
                        <p> 
                            <div>
                                Assignment Link:
                            </div>
                            <div contenteditable="true" id="Assignment1 Link">

                            </div>
                            
                        </p>
                        
                    </div>
                    <div class="AssignmentRelatedLinks">
                        <p>
                            Related Links:
                            <div contenteditable="true" id="Assignment1 relatedLinks">
                                
                            </div>
                        </p>
                        
                    </div>
                    <div class="AssignmentDetails">
                        <p>
                            Details: 
                            <div contenteditable="true" id="Assignment1 details">
                                This is a demo assignment. 
                            </div>
                        </p>
                    

                    </div>
            </section>
            
            </div>
            
        </div
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
    newDiv.innerHTML += `
    <button class="ClassSection" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`" aria-expanded="false" aria-controls="CollapseCourse">
        <div class="ClassName">
            `+inputClassName+`
        </div>
        <div class="DueDateSection">
            dd/mm hh:minmin
        </div> 
    </button>

    <div class="collapse" id="Collapse`+inputClassName+`">
    <div class="ClassAssignmentsOutline">
        <div class="ClassAssignments" id = "`+inputClassName+`Assignments">
            <!-- Buttons in Course drop down -->
            <div align="left"> 
                <div class="dropdown" id = "`+inputClassName+`dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Sort By
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" id="SortByDropDown">
                      <li><a class="dropdown-item" href="#">Due Date</a></li>
                      <li><a class="dropdown-item" href="#">Priority</a></li>
                      <li><a class="dropdown-item" href="#">Completed</a></li>
                    </ul>
                </div>
            </div>
           
            
            <!-- demo assignment start-->
            <button class="AssignmentOverview" id = "`+inputClassName+`AssignmentOverview" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`Assignments" aria-expanded="false" aria-controls="CollapseCourse">
                <p class="AssignmentPriority">
                    Priority: 1
                </p>
                <div class="AssignmentName">
                    
                    Demo Assignment 1
                </div>
                <div class="AssignmentDuedate" id="Assignment1StartDate">
                    Start date: dd/mm hh:minmin
                </div>
                <div class="progress justify-content-end" style="width: 25%; float: left; margin-top: 15px">
                    <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="100" aria-valuemax="0"> 
                        <div id="Assignment1TimeLeft">
                            2 days
                        </div>
                    </div>
                </div>
                <div class="AssignmentDuedate" id="Assignment1EndDate">
                    End date: dd/mm hh:minmin
                </div>
    
            </button>

            <div class="collapse" id="Collapse`+inputClassName+`Assignments">
                <div class="AssignmentOutline">
                    <section>
                        <div class="AssignmentInfo">
                            <div class="AssignmentLink">
                                <p> 
                                    <div>
                                        Assignment Link:
                                    </div>
                                    <div contenteditable="true" id="Assignment1 Link">

                                    </div>
                                     
                                </p>
                                
                            </div>
                            <div class="AssignmentRelatedLinks">
                                <p>
                                    Related Links:
                                    <div contenteditable="true" id="Assignment1 relatedLinks">
                                        
                                    </div>
                                </p>
                                
                            </div>
                            <div class="AssignmentDetails">
                                <p>
                                    Details: 
                                    <div contenteditable="true" id="Assignment1 details">
                                        This is a demo assignment. 
                                    </div>
                                </p>
                               

                            </div>
                        </div>
                    </section>
                    
                </div>

            </div>
            <!-- demo assignment end-->

            <!-- add new assignment -->
            <button class="AddAssignmentTop" type="button" data-bs-toggle="collapse" data-bs-target="#Collapse`+inputClassName+`NewAssignment" aria-expanded="false" aria-controls="CollapseCourse">
                <div class="AddAssignmentText">
                    Add new Assignment
                </div>
            </button>

            <div class="collapse" id="Collapse`+inputClassName+`NewAssignment">
                <div class="AssignmentOutline">
                    <section>
                        <div class="AssignmentInfo">
                            <div class="NewAssignmentInfoBox">
                                <p> 
                                    <div>
                                        Assignment Name:
                                    </div>
                                    <div contenteditable="true" id="`+inputClassName+`NewAssignmentName">

                                    </div>
                                     
                                </p>
                                
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Assignment Links:
                                    <div contenteditable="true" id="`+inputClassName+`NewAssignmentLink">
                                        
                                    </div>
                                </p>
                                
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Notes: 
                                    <div contenteditable="true" id="`+inputClassName+`NewAssignmentNotes">
                                        Add notes
                                    </div>
                                </p>
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Start date/ time: 
                                    <div contenteditable="true" id="`+inputClassName+`NewAssignmentStart">
                                        MM/DD/YYYY hh:mm
                                    </div>
                                </p>
                            </div>
                            <div class="NewAssignmentInfoBox">
                                <p>
                                    Start date/ time: 
                                    <div contenteditable="true" id="`+inputClassName+`NewAssignmentEnd">
                                        MM/DD/YYYY hh:mm
                                    </div>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</div>
    `
    var ClassesDiv = document.getElementById("Classes");
    ClassesDiv.innerHTML += newDiv.innerHTML; 
} 

