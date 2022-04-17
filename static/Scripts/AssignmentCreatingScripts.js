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
    for(var i=0; i< NewHTML.querySelectorAll("select").length; i++){
        var cur = NewHTML.querySelectorAll('select')[i];
        cur.setAttribute('id', ''+cur.id + NameToAddForID);
    }
    
    
    document.getElementById(ClassNameAssignment+'Assignments').appendChild(NewHTML);


    //set up the button to link to the right dropdown on the page
    var overviewlink = document.getElementById('Overview'+ NameToAddForID);
    overviewlink.setAttribute('data-bs-target', ''+overviewlink.getAttribute("data-bs-target") + NameToAddForID);
    

    //should fix the complete button
    document.getElementById('CheckBoxComplete'+ NameToAddForID).getAttribute("onclick");
    if(typeof(onclick) != "function"){
        document.getElementById('CheckBoxComplete'+ NameToAddForID).setAttribute('onclick', "completeButton('" + assignmentName+ "','" + className +"')");
    }
    else{
        document.getElementById('CheckBoxComplete'+ NameToAddForID).onclick = function(){completeButton(assignmentName, className)};
    }
    
    //discription change
    document.getElementById('Details'+ NameToAddForID).getAttribute("onblur");
    if(typeof(onblur) != "function"){
        
        document.getElementById('Details'+ NameToAddForID).setAttribute('onblur', "updateDiscription(this.innerText,'" + assignmentName+ "','" + className +"')");
    }
    else{
        document.getElementById('Details'+ NameToAddForID).onblur = function(){updateDiscription(this.innerText, assignmentName, className)};
    }



    //priority change
    document.getElementById('PriorityChange'+ NameToAddForID).getAttribute("onchange");
    if(typeof(onchange) != "function"){
        
        document.getElementById('PriorityChange'+ NameToAddForID).setAttribute('onchange', "updatePriority(this.options[this.selectedIndex].value,'" + assignmentName+ "','" + className +"')");
    }
    else{
        document.getElementById('PriorityChange'+ NameToAddForID).onchange = function(){updatePriority(this.options[this.selectedIndex].value, assignmentName, className)};
    }


    //set fields
    document.getElementById('PriorityField'+ NameToAddForID).innerText = "Priority: " + assignmentPriority;
    document.getElementById('AssignmentNameField'+ NameToAddForID).innerText = assignmentName;
    document.getElementById('Start_'+ NameToAddForID).setAttribute("value", assignmentStartDate);

    document.getElementById('Due_'+ NameToAddForID).setAttribute("value", assignmentDueDate);
    //bar stuff
    document.getElementById('ProgressBar' + NameToAddForID).setAttribute("style", "width: " + getDatePercent(assignmentStartDate, assignmentDueDate));
    document.getElementById('TimeLeftBarText' + NameToAddForID).innerText = getTimeLeftLargestNonZero(assignmentDueDate);

    document.getElementById('AssignmentLink'+ NameToAddForID).innerText = assignmentLink;
    document.getElementById('RelatedLinks'+ NameToAddForID).innerText = assignmentRelatedLinks;
    document.getElementById('Details'+ NameToAddForID).innerText = assignmentNotes;


}

//this function is used by the progress bar
function getDatePercent(StartDate, DueDate){
    
    var todaysDate = new Date(CurrentDateISOTime()); //defaults to today

    var max = new Date(DueDate) - new Date(StartDate);
    var left = new Date(DueDate) - todaysDate;
    var percent = (left/max*100).toFixed(3);
    if(percent < 0){ //edge case (overdue)
        percent = 0;
    }
    return ''+ percent + '%';
}

//this function will return the largest nonzero value of the time left for the progress bar
function getTimeLeftLargestNonZero(DueDate){
    //cannot really be condensed much more than this
    var curDate = new Date(CurrentDateISOTime());
    var Year = new Date(DueDate).getFullYear() - curDate.getFullYear(); //unlikely to be ever needed but still here
    if(Year > 0){
        if(Year == 1){
            return Year + " Year";
        }
        return Year + " Years";
    }
    var Month = new Date(DueDate).getMonth() - curDate.getMonth();
    if(Month > 0){
        if(Month == 1){
            return Month + " Month";
        }
        return Month + " Months";
    }
    var Day = new Date(DueDate).getDate() - curDate.getDate();
    if(Day > 0){
        if(Day == 1){
            return Day + " Day";
        }
        return Day + " Days";
    }
    var Hour = new Date(DueDate).getHours() - curDate.getHours();
    if(Hour > 0){
        if(Hour == 1){
            return Hour + " Hour";
        }
        return Hour + " Hours";
    }
    var Minutes = new Date(DueDate).getMinutes() - curDate.getMinutes();
    if(Minutes > 0){
        if(Minutes == 1){
            return Minutes + " Minute";
        }
        return Minutes + " Minutess";
    }
    else{
        return "OVER DUE!!!";
    }

}