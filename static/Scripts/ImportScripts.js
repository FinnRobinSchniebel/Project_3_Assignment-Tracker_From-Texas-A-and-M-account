
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
    // getCanvasCoursesJSON();
    classList = getCanvasJSONs();
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
        //console.log(cur.id);

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

    var but = document.createElement('button');
    but.setAttribute('class',"importbutton");
    but.innerHTML = 'Submit Changes';
    but.setAttribute('onclick', 'Finalize()');

    //flask does not play nice with multi class so this is needed
    var centDiv = document.createElement('div');
    centDiv.setAttribute('class', 'CenterElement');
    centDiv.appendChild(but);
    
    document.getElementById('SelectLocation').appendChild(centDiv);
    return; //returns nothing atm
}

function ImportAPIGoogle(){
    document.getElementById('SelectLocation').innerHTML = `<div class="loader"></div>`;

    //function for api call here (return file or bool)
    var classList = [];
    //on success it will call display classList
    
    //classList = getClassList();
    //assignmentPop(classList);
    classList = getGoogleJSONs();

}

//this function calls python script to generate googleClassObjs.json
//and call assignmentPop to generate the collapses
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
            storeImports(classList);
            //console.log("STORING \n\n")
            //console.log(localStorage);
        }
    });
    return classList;
}


//this function calls python script to generate an array of canvas classObjs
//and call assignmentPop to generate the collapses
// function getCanvasJSONs(){

//     //TODO
//     //Get token value entered by user
//     //Pass token value as python argument
//     var classList = [];
//     $.ajax({
//         url:"/bgCanvasImport",
//         type: "GET",
//         contentType: "application/json",
//         success: function (response){
//             classList = JSON.parse(response);
//             console.log("Successfully Imported ClassList \n"+ response);
//             //assignmentPop(classList);
//             //storeImports(classList);
//             //console.log("STORING \n\n")
//             //console.log(localStorage);
//         }
//     });
//     return classList;
// }




//leaving this function for testing
function getCanvasUserJSON(){
    $.ajax({
        url:"/bgGetCanvasUser",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            console.log(response.id);
        }
    });
}

// Uses getCanvasCourses
// TODO: Need to find a way to pass user token
function getCanvasJSONs(){
    $.ajax({
        url:"/bgGetCanvasAssignments",
        type: "GET",
        contentType: "application/json",
        success: function (response){
            classList = JSON.parse(response);
            console.log("Successfully Imported ClassList \n"+ response);
            assignmentPop(classList);
            storeImports(classList);
            console.log("STORING \n\n")
            console.log(localStorage);
        }
    });
    return classList;
}



//this function is to add assignments from an imported class INTO an already existing class
//this function takes in a className that is currently in local storage and adds all the assignments in assignment list
function appendAssignmentList(className, importAssignmentList){
    console.log(className);
    classObj = getClass(className);
    assignmentList = classObj.assignments;

    importAssignmentList.forEach(importAssignmentObj => {
        importAssignmentObj.class = className;
        assignmentList.push(importAssignmentObj);
        console.log(JSON.stringify(importAssignmentObj));
    });

    classObj.assignments = assignmentList;
    var jsonObj = JSON.stringify(classObj);
    localStorage.setItem(className, jsonObj);
}

function storeImports(classList){
    classList.forEach(classObj => {
        importClassName = "IMPORTING-TEMP"+classObj.name;
        importAssignment = classObj.assignments;
        importColor = classObj.color;
        storeClass(importClassName,importAssignment,importColor);

    });
}

//this function will pull all TEMP classes from local storage & remove them
function getTempClassObjs(){
    classList = getClassList();
    importedClassObjs = []; // array of classObjs
    classList.forEach(classObj => {
        className = classObj.name;
        if(className.startsWith("IMPORTING-TEMP")){
            //rename classObj copy
            classObj.name = className.substring(14);
            console.log(classObj.name);
            //append imported classObj without IMPORTING-TEMP
            importedClassObjs.push(classObj);
            //delete item in localstorage with IMPORTING-TEMP
            deleteClass(className);
        }
    });
    return importedClassObjs;
}

//WIP: Debugging, does not add to exsisting
function Finalize(){
    //these are the classObjs that were imported
    var importedClassObjs = getTempClassObjs();
    console.log("\n\n");
    console.log(localStorage);


    //TODO implement logic to iterate through loc0-locX
    for(var i = 0; i < importedClassObjs.length;i++){
        // gets the selected className to import to
        var selecter = document.getElementById('NewLoc'+ i);
        var selClassName = selecter.options[selecter.selectedIndex].value;

        if(selClassName != "None"){
            //console.log(JSON.stringify(importedClassObjs[i]));
            appendAssignmentList(selClassName, importedClassObjs[i].assignments);
        }
    }
    //clear content when done
    document.getElementById('SelectLocation').innerHTML ='';
}

//this function will remove temp objects when leaving page
window.onbeforeunload = function(){
    temp = getTempClassObjs();
    //console.log("leaving");
}