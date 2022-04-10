src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";


function AssignmentAddHTML(className, assignmentName, assignmentPriority, assignmentStartDate, assignmentDueDate, assignmentLink, assignmentRelatedLinks, assignmentNotes){


    // name: assignmentName,                   //text
    //     class: className,                       //text
    //     priority: assignmentPriority,           //int
    //     dueDate: assignmentDueDate,             //datetime w/hour min
    //     startDate: assignmentStartDate,         //datetime w/hour min
    //     link: assignmentLink,                   //text
    //     relatedLinks: assignmentRelatedLinks,   //text
    //     notes: assignmentNotes,                 //text
    // };


    //<<<<not needed for this but another function>>>>>
    // // inputs taken from user
    // // to make it dynamic, takes className from Parameter and is used to find the -
    // // associated ID for variables
    // var newAssignmentDisplay = document.getElementById(''+className+'Name').innerText;

    // // takes the space away to ensure variables are properly named
    // var newAssignment = newAssignmentDisplay.replaceAll(" ", "_");
    // var startTime = document.getElementById(''+className+'Start').innerText;
    // var endTime = document.getElementById(''+className+'End').innerText;
    //<<<<>>>>>>
    var newAssignment = assignmentName.replaceAll(" ", "_");

    var ClassNameAssignment = className.replaceAll(" ", "_");

    var NameToAddForID= ClassNameAssignment+newAssignment;

    //makes a copy of the content in template for assignment
    var NewHTML = document.querySelector("#NewAssignmentTemp").content;

    


    NewHTML= NewHTML.cloneNode(true); //true makes this recursive (copy all in assignment)    
    
    for(var i=0; i <NewHTML.querySelectorAll('div').length; i++){
        var cur = NewHTML.querySelectorAll('div')[i];
        cur.setAttribute('id', ''+cur.id + NameToAddForID);
        
    }
    for(var i=0; i< NewHTML.querySelectorAll('button').length; i++){
        var cur = NewHTML.querySelectorAll('button')[i];
        cur.setAttribute('id', ''+cur.id + NameToAddForID);
    }
    for(var i=0; i< NewHTML.querySelectorAll('input').length; i++){
        var cur = NewHTML.querySelectorAll('input')[i];
        cur.setAttribute('id', ''+cur.id + NameToAddForID);
    }
    for(var i=0; i< NewHTML.querySelectorAll("label").length; i++){
        var cur = NewHTML.querySelectorAll('label')[i];
        cur.setAttribute('for', ''+cur.getAttribute('for') + NameToAddForID);
    }
    
    
    document.getElementById(ClassNameAssignment+'Assignments').appendChild(NewHTML);


    //set up the button to link to the right dropdown on the page
    var overviewlink = document.getElementById('Overview'+ NameToAddForID);
    overviewlink.setAttribute('data-bs-target', ''+overviewlink.getAttribute("data-bs-target") + NameToAddForID);
    

    //should fix the complete button
    document.getElementById('CheckBoxComplete'+ NameToAddForID).getAttribute("onclick");
    if(typeof(onclick) != "function"){
        document.getElementById('CheckBoxComplete'+ NameToAddForID).setAttribute('onclick', "completeButton('Overview" + NameToAddForID+ "','CheckBoxComplete" + NameToAddForID +"')");
    }
    else{
        document.getElementById('CheckBoxComplete'+ NameToAddForID).onclick = function(){completeButton("Overview" + NameToAddForID, "CheckBoxComplete" + NameToAddForID)};
    }
   

    //set fields
    document.getElementById('PriorityField'+ NameToAddForID).innerText = "Priority:" + assignmentPriority;
    document.getElementById('AssignmentNameField'+ NameToAddForID).innerText = assignmentName;
    document.getElementById('Start_'+ NameToAddForID).setAttribute("value", assignmentStartDate);
    //do this later
    document.getElementById('TimeLeftBarText'+ NameToAddForID).innerText = "todo";

    document.getElementById('Due_'+ NameToAddForID).setAttribute("value", assignmentDueDate);
    document.getElementById('AssignmentLink'+ NameToAddForID).innerText = assignmentLink;
    document.getElementById('RelatedLinks'+ NameToAddForID).innerText = assignmentRelatedLinks;
    document.getElementById('Details'+ NameToAddForID).innerText = assignmentNotes;

    //<<<Dont forget to also do the same with label for tags

    // var toAdd= document.getElementById('NewAssignmentTemp')[0].getElementsByClassName("Assignment");
    // toAdd.innerHTML.setAttribute('id', 'Assignment'+newAssignment);
    // toAdd.innerHTML.getElementsByClassName('AssignmentOverview')[0].setAttribute('data-bs-target', '#Collapse'+newAssignment);
    // //one for priority here
    // toAdd.innerHTML.getElementsByClassName('AssignmentName')[0].innerText = newAssignmentDisplay;
    // toAdd.innerHTML.getElementsByClassName('AssignmentStartDate')[0].setAttribute('id',newAssignment+'StartDate');
    // toAdd.innerHTML.getElementsByClassName('AssignmentStartDate')[0].innerHTML.getElementsByTagName('input').setAttribute('value', startTime);
    // //add time for start and give it the correct id
    // toAdd.innerHTML.getElementsByClassName('AssignmentDuedate')[1].setAttribute('id',newAssignment+'StartDate');
    // toAdd.innerHTML.getElementsByClassName('AssignmentDuedate')[1].innerHTML.getElementsByTagName('input').setAttribute('value', startTime);
}


/**
 * Takes in a dynamic name that will make the element unique and a constant that will tell what it is.
 * @param {*} dynamic 
 * @param {*} constant 
 */
function setAttributeIDs(){
    
}