src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

var CurSort = "DueDate";

function sortButton(sortby){
    CurSort = sortby;
    console.log(CurSort);
    populatePage();
}   



//called by populating function for sorting the array
function sortAssignment(JSONOBJ){

    if(CurSort == "DueDate"){
        //order primarily by due date but first by priority so if something has the same duedate the one with the higher priority will go first
        JSONOBJ = sortPrior(JSONOBJ);
        JSONOBJ = sortDue(JSONOBJ); 
    }
    else if(CurSort == "Priority"){
        JSONOBJ = sortDue(JSONOBJ);
        JSONOBJ = sortPrior(JSONOBJ);
    }
    else{
        console.log("error");
    }

    return JSONOBJ;
}
function sortDue(OBJ){
    return OBJ.sort( function(x,y){
        console.log("2022-04-15T18:22" < "2022-04-29T18:23");
        //using ISO date sort the extra stuff is for correctness. For source: https://stackoverflow.com/questions/12192491/sort-array-by-iso-8601-date 
        return ((x.dueDate < y.dueDate) ? -1 : ((x.dueDate > y.dueDate)) ? 1 : 0); 
    });
}
function sortPrior(OBJ){
    return OBJ.sort( function(x,y){
       return parseInt(x.priority) - parseInt(y.priority);
    });
}
