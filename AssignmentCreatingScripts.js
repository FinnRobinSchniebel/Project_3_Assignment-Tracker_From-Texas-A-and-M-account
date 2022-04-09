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
    var NewHTML = document.querySelector("#NewAssignmentTemp").getElementsByClassName("Assignment")[0];
    NewHTML= NewHTML.cloneNode(true); //true makes this recursive (copy all in assignment)
    
    var allDivs = [];
    allDivs =  NewHTML.getElementsByTagName('div') + NewHTML.getElementsByTagName('button') + NewHTML.getElementsByTagName('input');
    
    //This should in theory set the ids to be unique for all divs and buttons and inputs
    for(var i=0; i < allDivs.length; i++){
        allDivs[i].setAttribute('id', allDivs[i].id + NameToAddForID);
    }
    document.getElementById(ClassNameAssignment+'ClassAssignments').innerHTML+= NewHTML;


    //set target for the collaps 60% sure this works
    NewHTML.getElementsByClassName('Overview')[0].setAttribute('data-bs-target', NewHTML.getElementsByClassName('Overview')[0].data("bs-target") + NameToAddForID);
    //should fix the complete button
    document.getElementById('CheckBoxCompelte'+ NameToAddForID).setAttribute('onclick', 'completeButton(Overview' + NameToAddForID+ ', CheckBoxCompelte' + NameToAddForID +' )');

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


    



    div.innerHTML+= toAdd;
}


/**
 * Takes in a dynamic name that will make the element unique and a constant that will tell what it is.
 * @param {*} dynamic 
 * @param {*} constant 
 */
function setAttributeIDs(){
    
}