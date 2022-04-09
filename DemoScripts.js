function addDemo(){
    // inputs taken from user
    var newAssignmentDisplay = document.getElementById("NewAssignmentName").innerText;
    // takes the space away to ensure variables are properly named
    newAssignment = newAssignmentDisplay.replaceAll(" ", "_");
    // newAssignment = newAssignmentDisplay.replace(" ", "_");
    //var newAssignment = newAssignmentDisplay.replace(" ", "_");
    var startTime = document.getElementById("NewAssignmentStart").innerText;
    var endTime = document.getElementById("NewAssignmentEnd").innerText;
    // var className = document.getElementById("NewAssignmentName").innerText;

    //create new div with assignment name 
    var div = document.createElement('div');
    div.id = newAssignment;

    // need to remember what this does again 
    document.getElementsByTagName('body')[0].appendChild(div);
    
    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    div.innerHTML += `
    <div id="Assignment`+newAssignment+`" class="Assignment" data-due="05/20 03:25" data-timeleft="2" data-priority="1" >
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
                                        This is a demo assignment. 
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
        </div>
    </div>`;

    // appends new div to the classes' assignments
    document.getElementById("demoAssignments").appendChild(div);
}


/**
 * Takes in a dynamic name that will make the element unique and a constant that will tell what it is.
 * @param {*} dynamic 
 * @param {*} constant 
 */
function setAtributeID(dynamic, constant){
    return dynamic+constant;
}