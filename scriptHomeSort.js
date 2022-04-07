src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

function sortAssignmentBy(locationD, sortBy){
    console.debug(locationD);
    
    locationD.find('.Assignment').sort(function(a, b){
        var contentA = parseInt( $(a).data(sortBy));
        
        var contentB = parseInt( $(b).data(sortBy));
        console.debug(contentA);
        console.debug(contentB);
        return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    
    }).appendTo(locationD);
}
