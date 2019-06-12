const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    name: { type: String }
});

userSchema.methods.checkPassword = function (password) {
    console.log('checkPassord');

    console.log('this p: ' + this.password);
    console.log('pass: ' + password);
    return this.password === password;
};

module.exports = mongoose.model('User', userSchema, 'users');