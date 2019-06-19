"use strict";
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 8888;
const HOST = `http://localhost`;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306', 
	user     : 'root',
	password : 'aq1sw2de3',
	database : 'todo'
});

// Вопрос - Покажите пример, как распарсить переменную connection.query -> results?

// Получить список задач
app.get('/api/tasks', (request, response) => {    
    connection.query('select * from `tasks`;', (error, results) => {
        if (results.length > 0) {            
            response.send(results);
        } else {
            response.send('Error connection to DB');
        }			
        response.end();
    });    
});

// Получить детализацию задачи по id
app.get('/api/tasks/:id', (request, response) => {
    const id = request.params.id; 
    connection.query('select * from `tasks` where `id` = ?;',id,(err, results) => {
        if (err) {
            response.send(err);
        }
        else {            
            response.send(results);
        }
        response.end();
    });
});

// Добавить задачу
app.post('/api/tasks', (request, response) => {
    const task = request.body;
    connection.query('insert into `tasks` set ?;',task, (err, results) => {
        if (err) {
            response.send(err);
        }
        else {            
            response.send(results);
        }
        response.end();
    });
});

// Изменить задачу
app.put('/api/tasks/:id', (request, response) => {
    const id = request.params.id;     
    const task = request.body;
    connection.query('update `tasks` set ? where `id` = ?;',[task,id],task, (err, results) => {
        if (err) {
            response.send(err);
        }
        else {            
            response.send(results);
        }
        response.end();
    });
    response.end();
});

// Удалить задачу по id
app.delete('/api/tasks/:id', (request, response) => {    
    const id = request.params.id;     
    const task = request.body;
    connection.query('delete from `tasks` where `id` = ?;',id,task, (err, results) => {
        if (err) {
            response.send(err);
        }
        else {            
            response.send(results);
        }       
    });
    response.end();
});

app.listen(PORT, ()=>{
    console.log(`Server started on ${HOST}:${PORT}`);
});
