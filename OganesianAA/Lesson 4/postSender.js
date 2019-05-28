

let request = require('request');
let postData = { name: 'Hugo', lastname: 'Morales', age: 40 }

let clientServerOptions = {
    url: 'http://localhost:8890/',
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

request(clientServerOptions, (err, res)=>{
    if (err){
        console.log(err);
    }else{
        console.log(res);
    }
});