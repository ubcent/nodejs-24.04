const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    birthDate: {type: Date},
    firstName:{type: String},
    lastName: {type: String},
    gender: {type: String},
    hireDate: {type: Date},
});

module.exports = mongoose.model('Employee', userSchema,'Employees');