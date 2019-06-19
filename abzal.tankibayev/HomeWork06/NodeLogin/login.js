"use strict"
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 8888;
const HOST = `http://localhost`;

/*
			!!!		ВАЖНО		!!!
	на июнь 2019 nodejs/mysql использует метод шифрования пароля, отличный от используемого в MySQL 8.xx
	необходимо переделать по статье - https://o7planning.org/ru/11959/connecting-to-mysql-database-using-nodejs			
*/
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306', 
	user     : 'root',
	password : 'aq1sw2de3',
	database : 'nodelogin'
});

const app = express();

app.use(session({
	secret: 'AQ!sw2de3',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// для использования css
app.use(express.static('.'));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(PORT, ()=>{
    console.log(`Server started on ${HOST}:${PORT}`);
});

