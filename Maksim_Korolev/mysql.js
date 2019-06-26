const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const taskModel = require('./models/mysqltasks');

const app = express();

app.listen(8888, () => {
    console.log('Server has been started!');
});
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/',async (req, res) => {
    const task = await taskModel.add({content: 'Новая задача'});
    console.log(task);
    const all = await taskModel.getAll();
    res.render('indexTasks', {all});
});
console.log('add');