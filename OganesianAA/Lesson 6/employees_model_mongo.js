const mongoose = require('mongoose');
const Employee = require('./mongoModel');

// const port = process.env.PORT || 27017;

let connection = mongoose.connect('mongodb://localhost:27017/NodeJS', { useNewUrlParser: true } );
connection
    .then((result)=>{
        console.log(result.Schema);
    })
    .catch(err=>{
        console.log(err);
    });
