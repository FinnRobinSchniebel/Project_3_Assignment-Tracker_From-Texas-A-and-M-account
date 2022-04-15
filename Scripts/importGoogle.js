import {PythonShell} from 'python-shell';


function getGoogleClasses(){
    PythonShell.run{
        'quickstart.py',
        null,
        function(err){
            if(err) throw err;
            console.log('finished');
        }
    };
}