
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
    document.getElementById('SelectLocation').innerHTML = `<div class="loader"></div>`;
    
    //function for api call here (return file or bool)

    //populate options here (with json results) 

    
}


function assignmentPop(ClassList){
    var listlen = ClassList.length;
    document.getElementById('SelectLocation').innerHTML = ``;
    //var optionObj = ; //will hold the options

    //add options for dropdown to temperary div
    var userClasses = getClassList();


    

    for(var i =0; i < listlen; i++){
        var NewHTML = document.querySelector('#PlaceLocTemp').content;
        NewHTML= NewHTML.cloneNode(true);
        //document.getElementById("CollapseCont").append(NewHTML);


        //note: this works because there is only one of each
        var cur = NewHTML.querySelectorAll('div')[0]; //div
        cur.setAttribute('id', '' + cur.id +i);
        
        cur = NewHTML.querySelectorAll('select')[0]; //select
        cur.setAttribute('id', '' + cur.id +i);
        console.log(cur.id);

        //console.log(NewHTML.querySelectorAll('select'));
        cur = NewHTML.querySelectorAll('label')[0]; //label
        cur.setAttribute('id', ''+ cur.id +i);
        cur.setAttribute('for', ''+ cur.for +i);

        //add all valid options
        
        //document.getElementById('NewLoc'+ i).innerHTML += optionObj.innerHTML;
        document.getElementById('SelectLocation').appendChild(NewHTML);

        document.getElementById('locText'+i).innerText = 'Place Contents from "' + ClassList[i].name + '" into:';

        for(var j =0; j < userClasses.length; j++){
            // optionObj.innerHTML += `<option value="`+ ClassList[i].name +`" selected> `+ ClassList[i].name +`</option>`;
            var opt = document.createElement('option');
            opt.value= userClasses[j].name;
            opt.innerHTML = userClasses[j].name ;
            //console.log('NewLoc'+ i);
            document.getElementById('NewLoc'+ i).appendChild(opt);
        }
        
    }
    return; //returns nothing atm
}

function ImportAPIGoogle(){
    document.getElementById('SelectLocation').innerHTML = `<div class="loader"></div>`;

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
            //console.log("Successfully Imported ClassList \n"+ response);
            assignmentPop(classList);
        }
    });
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