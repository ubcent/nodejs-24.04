const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String},
    password: { type: String},
});

userSchema.methods.validPassword = function validPassword(password) {
    return this.password === password;
};


module.exports = mongoose.model('User', userSchema,'Users');
