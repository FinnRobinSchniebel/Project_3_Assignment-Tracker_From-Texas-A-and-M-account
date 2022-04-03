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
    var inputClassName =  document.getElementByName("InputClassName")[0].innerText;

    //create new div with assignment name 
    var newDiv = document.createElement('div');
    newDiv.id = inputClassName;

    //appends to content
    document.getElementsByTagName('body')[0].appendChild(newDiv);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    newDiv.innerHTML += `
    <button class="ClassSection" type="button">
    <div class="ClassName">
        `+inputClassName+`
    </div>
    <div class="DueDateSection">
        No Upcoming Assignments
    </div>
    </button>
    `
    var ClassesDiv = document.getElementById("Classes");
    ClassesDiv.appendChild(newDiv);        
} 

