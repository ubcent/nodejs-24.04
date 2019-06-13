const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    name: { type: String },
    facebookId: { type: String }
});

userSchema.methods.checkPassword = function (password) {
    return this.password === password;
};

module.exports = mongoose.model('User', userSchema, 'users');