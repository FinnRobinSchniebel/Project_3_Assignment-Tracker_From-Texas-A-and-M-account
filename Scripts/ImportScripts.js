function CollapseToggle(Option){
    $('#collapse').collapse();
    if(Option = "Null"){
        $('#collapse').collapse({
            toggle: false
        });
    }
    else if(Option = "Canvas"){
        $('#collapse').collapse({
            toggle: true
        });
    }
    else if(Option = "Google"){
        $('#collapse').collapse();
    }
    
    
}