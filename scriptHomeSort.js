src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

function sortAssignmentByTimeLeft(){
    $('.Assignment').sort(function(a, b){
        var contentA = parseInt( $(a).data('timeLeft'));
        
        var contentB = parseInt( $(b).data('timeLeft'));
        console.debug(contentA);
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    
    }).appendTo($('.Assignments'));
}


