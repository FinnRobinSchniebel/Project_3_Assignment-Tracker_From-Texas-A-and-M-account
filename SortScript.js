src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

var CurSort = "DueDate";

function sortButton(sortby){
    CurSort = sortby;
    populatePage();
}   



//called by populating function for sorting the array
function sortAssignment(JSONOBJ){

    if(CurSort == "Duedate"){
        //order primarily by due date but first by priority so if something has the same duedate the one with the higher priority will go first
        console.log("here");
        JSONOBJ = sortPrior(JSONOBJ);
        JSONOBJ = sortDue(JSONOBJ); 
    }
    else if(CurSort == "Priority"){
        console.log("here");
        JSONOBJ = sortDue(JSONOBJ);
        JSONOBJ = sortPrior(JSONOBJ);
    }

    return JSONOBJ;
}
function sortDue(OBJ){
    return OBJ.sort( function(x,y){
        return Date(x.dueDate).getTime() - Date(y.dueDate).getTime();
    });
}
function sortPrior(OBJ){
    return OBJ.sort( function(x,y){
       return parseInt(x.priority) - parseInt(y.priority);
    });
}
