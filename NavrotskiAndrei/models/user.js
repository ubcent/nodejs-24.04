const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},

});

userSchema.methods.checkPassword = function checkPassword(password){
	return this.model('user').find({password: this.password}, password);
};

module.exports = mongoose.model('user', userSchema);