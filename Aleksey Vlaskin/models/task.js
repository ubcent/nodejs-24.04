const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    state: { type: Boolean, default: false },
    desc: { type: String },
});

module.exports = mongoose.model('Task', taskSchema);
