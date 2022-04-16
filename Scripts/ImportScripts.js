
function CT(Option){
    $('#ImportInfo').collapse();
    if(Option == "none"){
        $('#ImportInfo').collapse("hide");
    }
    else if(Option == "Canvas"){
        $('#ImportInfo').collapse("show");
    }
    else if(Option == "Google"){
        $('#ImportInfo').collapse("show");
    }
    
}