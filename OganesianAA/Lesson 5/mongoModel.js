const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emp_no: { type: Number},
    birthDate: {type: Date},
    firstName:{type: String},
    lastName: {type: String},
    gender: {type: String},
    hireDate: {type: Date}
    // test: {type: String, default: '', required: true}
});

module.exports = mongoose.model('Employee', userSchema,'Lesson5');