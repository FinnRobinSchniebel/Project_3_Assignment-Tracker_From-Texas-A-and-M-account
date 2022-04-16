
function CT(Option){
    $('#ImportInfo').collapse();
    if(Option == "none"){
        $('#ImportInfo').collapse("hide");
    }
    else if(Option == "Canvas"){
        clearImportCont();
        addinfoGetCanvas();
        var check;
        setTimeout(check, 300);
        $('#ImportInfo').collapse("show");
    }
    else if(Option == "Google"){
        clearImportCont();
        $('#ImportInfo').collapse("show");
    }
    
}
function clearImportCont(){
    document.getElementById("CollapseCont").innerHTML ="";
}


function addinfoGetCanvas(){
    var NewHTML = document.querySelector("#CanvasInfoTemp").content;


    NewHTML= NewHTML.cloneNode(true);

    document.getElementById("CollapseCont").append(NewHTML);
}


function  ImportAPICanvas(){
    
}
