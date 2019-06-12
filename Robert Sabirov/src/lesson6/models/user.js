const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    name: { type: Boolean },
    lastVisit: { type: Date }
});

module.exports = mongoose.model('User', todoSchema, 'users');