
function CT(Option){
    $('#ImportInfo').collapse();
    if(Option == "none"){
        $('#ImportInfo').collapse("hide");
    }
    else if(Option == "Canvas"){
        clearImportCont(); //clear any other content

        addinfoGet("#CanvasInfoTemp");
        var check;
        $('#ImportInfo').collapse("show");
    }
    else if(Option == "Google"){
        clearImportCont();

        addinfoGet("#ClassRoomTemp");
        $('#ImportInfo').collapse("show");
    }
    
}
function clearImportCont(){
    document.getElementById("CollapseCont").innerHTML ="";
}


function addinfoGet(fromTemp){
    var NewHTML = document.querySelector(fromTemp).content;
    NewHTML= NewHTML.cloneNode(true);
    document.getElementById("CollapseCont").append(NewHTML);
}


function  ImportAPICanvas(){
    document.getElementById('SelectLocation').innerHTML += `<div class="loader"></div>`;

    //function for api call here (return file or bool)

    //populate options here (with json results) 

    
}


function assignmentPop(ClassList){
    var listlen = ClassList.length;

    var ClassList = getClassList();

    var optionObj = document.createElement('div'); //will hold the options

    //add options for dropdown to temperary div
    for(var i =0; i < ClassList.length; i++){
        optionObj.innerHTML += `<option value="`+ ClassList[i].name +`" selected> `+ ClassList[i].name +`</option>`;
    }

    for(var i =0; i < listlen; i++){
        var NewHTML = document.querySelector('#PlaceLocTemp').content;
        NewHTML= NewHTML.cloneNode(true);
        //document.getElementById("CollapseCont").append(NewHTML);


        //note: this works because there is only one of each
        var cur = NewHTML.querySelectorAll('div')[0]; //div
        cur.setAttribute('id', '' + cur.id +i);
        
        var cur = NewHTML.querySelectorAll('select')[0]; //select
        cur.setAttribute('id', '' + cur.id +i);

        var cur = NewHTML.querySelectorAll('label')[0]; //label
        cur.setAttribute('id', ''+ cur.id +i);
        cur.setAttribute('for', ''+ cur.for +i);

        //add all valid options
        document.getElementById('NewLoc'+ i).innerHTML += optionObj.innerHTML;

       document.getElementById('SelectLocation').innerHTML += NewHTML;
    }
    return; //returns nothing atm
}

function ImportAPIGoogle(){
    document.getElementById('SelectLocation').innerHTML += `<div class="loader"></div>`;

    //function for api call here (return file or bool)
    var classList = [];
    //on success it will call display classList
    classList = getGoogleJSONs();

}

//this function calls python script to generate googleClassObjs.json
function getGoogleJSONs(){
    var classList = [];
    $.ajax({
        url:"/bgGoogleImport",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            classList = JSON.parse(response);
            assignmentPop(classList);
        }
    })
    return classList;
}



//this function is to add assignments from an imported class INTO an already existing class
//this function takes in a className that is currently in local storage and adds all the assignments in assignment list
function appendAssignmentList(className, importAssignmentList){
    classObj = getClass(className);
    assignmentList = classObj.assignments;
    importAssignmentList.forEach(importAssignmentObj => {
        assignmentList.append(importAssignmentObj);
    });

    var jsonObj = JSON.stringify(classObj);
    localStorage.setItem(className, jsonObj);
}