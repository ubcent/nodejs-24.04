const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: {type: String},
	description: {type: String},
	date: {type: Date},
	complete: {type: Boolean},
});
module.exports = mongoose.model('Task', taskSchema);