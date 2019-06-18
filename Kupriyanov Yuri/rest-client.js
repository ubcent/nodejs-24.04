const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const apiURL = 'http://localhost:8888/auth';

let username = 'zzz';
let password = 'zzz';

let token = '';

getTockenByAuth(username, password);

function getTockenByAuth(usernameText, passwordText) {

    let userAuth = JSON.stringify({username: usernameText, password: passwordText});

    let xhr = new XMLHttpRequest();
    xhr.open("POST", apiURL);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        console.log("readyState = " + this.readyState + ", status = " + this.status);
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            token = this.responseText;
            console.log(result, token);
        }
    };
    
    xhr.send(userAuth);
}




