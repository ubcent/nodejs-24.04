const mysql = require('mysql');
const options = {
    host: 'localhost',
    database: 'todo',
    user: 'root',
    password : 'mysql'
};
var pool = mysql.createPool(options);

module.exports = pool;