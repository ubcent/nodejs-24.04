const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    noteText: {type: String},
    author: {type: String},
    createTime: {type: Date},
});

module.exports = mongoose.model('Note', noteSchema, 'Notifications');