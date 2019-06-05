const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:32769/todo', { useNewUrlParser: true });
const Task = require('./task');

class Tasks {
    static create(newTask) {
        let task = new Task(newTask);
        task = task.save();
        return task;
    }

    static readAll() {
        const tasks = Task.find();
        return tasks;
    }

    static read(id) {
        const task = Task.findById(id);
        return task;
    }

    static update(id, change) {
        const task = Task.updateOne({_id: id}, {$set: {newTask: change}});
        return task;
    }

    static delete(id) {
       const task = Task.deleteOne({_id: id});
       return task;
    }
}

module.exports = Tasks;