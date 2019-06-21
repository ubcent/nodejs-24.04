const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  taskName: { type: String },
  taskDesc: { type: String },
  deadLine: { type: String },
  isTaskDone: { type: String },
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');
