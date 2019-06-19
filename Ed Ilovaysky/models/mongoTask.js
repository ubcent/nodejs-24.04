const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  taskName: { type: String },
  isTaskDone: { type: Boolean },
});

module.exports = mongoose.model('Tasks', taskSchema);
