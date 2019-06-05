const express = require('express');
const app = express();

const mongoose = require('mongoose');
const db = mongoose.connect(`mongodb://192.168.99.100:32768/friends`, {useNewUrlParser: true});

const User = require('./users');

app.get('/', (req, res) => {
    res.send(`Hello World!!!`);
});

app.get('/users',async (res, req)=>{
    const users = await User.find();
    res.send(users);
});

app.get('/users/:id',async (res, req)=>{
    const users = await User.findById(req.params.id);
    res.send(users);
});
app.post('/users',async(req,res)=>{
    let users = new User(req,body);
    user = await user.save();
    res.send(user);
});


app.listen(8888, () => {
    console.log("Server has been started!");
});