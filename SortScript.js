src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

var CurSort = "DueDate";

function sortButton(sortby){
    CurSort = sortby;
    populatePage();
}   



//called by populating function for sorting the array
function sortAssignment(JSONOBJ){
    if(CurSort == "DueDate"){
        //order primarily by due date but first by start and priority so if something has the same duedate the one with the higher priority will go first
        JSONOBJ = sortStart(JSONOBJ);
        JSONOBJ = sortPrior(JSONOBJ);
        JSONOBJ = sortDue(JSONOBJ); 
    }
    else if(CurSort == "Priority"){
        JSONOBJ = sortStart(JSONOBJ);
        JSONOBJ = sortDue(JSONOBJ);
        JSONOBJ = sortPrior(JSONOBJ);
    }
    else if(CurSort == "StartDate"){
        JSONOBJ = sortDue(JSONOBJ);
        JSONOBJ = sortPrior(JSONOBJ);
        JSONOBJ = sortStart(JSONOBJ);
    }
    else{
        console.log("error");
    }

    return JSONOBJ;
}
function sortDue(OBJ){
    return OBJ.sort( function(x,y){
        //using ISO date sort the extra stuff is for correctness. For source: https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date 
        return ((x.dueDate < y.dueDate) ? -1 : ((x.dueDate > y.dueDate)) ? 1 : 0); 
    });
}
function sortPrior(OBJ){
    return OBJ.sort( function(x,y){
       return parseInt(x.priority) - parseInt(y.priority);
    });
}
function sortStart(OBJ){
    return OBJ.sort( function(x,y){
        
        //using ISO date sort the extra stuff is for correctness. For source: https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date 
        return ((x.startDate < y.startDate) ? -1 : ((x.startDate > y.startDate)) ? 1 : 0); 
    });
}