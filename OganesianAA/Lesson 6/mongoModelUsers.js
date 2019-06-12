const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String},
    password: { type: String},
    // test: {type: String, default: '', required: true}
});

userSchema.methods.validPassword = function validPassword(password) {
    return this.password === password;
};

// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema,'Users');
