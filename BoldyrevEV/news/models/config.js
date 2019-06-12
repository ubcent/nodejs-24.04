// подключились к mysql
const mysql = require('mysql');

// создаем соединение
const pool = mysql.createPool({
    host: 'localhost',
    database: 'todo',
    user: 'root',
    password: '',
});

module.exports = pool;