src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

function sortAssignmentByTimeLeft(){
    $('.Assignment').sort(function(a, b){
        var contentA = parseInt( $(a).data('timeleft'));
        
        var contentB = parseInt( $(b).data('timeleft'));
        console.debug(contentA);
        console.debug(contentB);
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    
    }).appendTo($('.Assignments'));
}
function sortAssignmentByPriority(){
    $('.Assignment').sort(function(a, b){
        var contentA = parseInt( $(a).data('priority'));
        
        var contentB = parseInt( $(b).data('priority'));
        console.debug(contentA);
        console.debug(contentB);
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    
    }).appendTo($('.Assignments'));
}
function sortAssignmentByDueDate(){
    $('.Assignment').sort(function(a, b){
        var contentA = parseInt( $(a).data('due'));
        
        var contentB = parseInt( $(b).data('due'));
        console.debug(contentA);
        console.debug(contentB);
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    
    }).appendTo($('.Assignments'));
}
