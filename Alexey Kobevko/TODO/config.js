/*jshint esversion: 8 */

const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost:3307',
    database: 'todo',
    user: 'root',
    password: '',
});

module.exports = pool;