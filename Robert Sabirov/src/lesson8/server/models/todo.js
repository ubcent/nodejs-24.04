const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: { type: String },
    desc: { type: String },
    status: { type: Boolean }
});

module.exports = mongoose.model('Todo', todoSchema, 'todos');