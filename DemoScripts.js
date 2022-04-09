function AssignmentAdd(){
    // inputs taken from user
    // to make it dynamic, takes className from Parameter and is used to find the -
    // associated ID for variables
    var newAssignmentDisplay = document.getElementById(''+className+'Name').innerText;
    // takes the space away to ensure variables are properly named
    var newAssignment = newAssignmentDisplay.replaceAll(" ", "_");
    var startTime = document.getElementById(''+className+'Start').innerText;
    var endTime = document.getElementById(''+className+'End').innerText;

    //create new div with assignment name 
    var div = document.createElement('div');
    div.id = newAssignment;

    // need to remember what this does again 
    document.getElementsByTagName('body')[0].appendChild(div);

    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    // fixed complete boxes by changing "innerHTML" to "innerText"
    // add code into new div need to use `` as quotes 
    // need to input dynamic info where needed - not all finished 
    div.innerHTML += "href='DemoAddassignment.html'";

    // appends new div to the classes' assignments
    document.getElementById("demoAssignments").appendChild(div);

    var toAdd= document.getElementsByClassName("MakeAssignment").getElementsByClassName("Assignment");
    toAdd.innerHTML.setAttribute('id', 'Assignment'+newAssignment);
    toAdd.innerHTML.getElementsByClassName('AssignmentOverview').setAttribute('data-bs-target', '#Collapse'+newAssignment);
    //one for priority here
    toAdd.innerHTML.getElementsByClassName('AssignmentName').innerText = newAssignmentDisplay;
    toAdd.innerHTML.getElementsByClassName('AssignmentDuedate').setAttribute('id',newAssignment+'StartDate');
    toAdd.innerHTML.getElementsByClassName('AssignmentDuedate').innerHTML.getElementsByTagName('input').setAttribute('value', startTime);
    



    div.innerHTML+= toAdd;
}


/**
 * Takes in a dynamic name that will make the element unique and a constant that will tell what it is.
 * @param {*} dynamic 
 * @param {*} constant 
 */
function setAttributeIDs(){
    
}