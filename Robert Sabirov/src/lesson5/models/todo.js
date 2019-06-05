const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Priority:
0 - the lowest
5 - the highest
*/

const todoSchema = new Schema({
    title: { type: String },
    desc: { type: String },
    status: { type: Boolean },
    priority: { type: Number }
});

module.exports = mongoose.model('Todo', todoSchema, 'todos');