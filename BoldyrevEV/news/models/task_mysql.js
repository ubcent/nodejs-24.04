const mysql = require('mysql');
const pool = require('./config');

class Task_mysql {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(`SELECT * FROM 'tasks' WHERE 1`, (err, rows) => {
                    if (err) return reject(err);

                    connection.release(); // обязательно соединение надо закрывать!
                    resolve(rows);
                });
            })
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(`SELECT * FROM 'tasks' WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) return reject(err);

                    connection.release(); // обязательно соединение надо закрывать!
                    resolve(rows);
                });
            })
        });
    }

    static add(task) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(`INSERT INTO 'tasks' SET ?`, task, (err, result) => {
                    if (err) return reject(err);

                    connection.release(); // обязательно соединение надо закрывать!
                    resolve(result.insertId);
                });
            })
        });
    }

    static update(id, changeSet) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(`UPDATE 'tasks' SET changeSet = ${changeSet} WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) return reject(err);

                    connection.release(); // обязательно соединение надо закрывать!
                    resolve(rows);
                });
            })
        });
    }

    static complete(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(`UPDATE 'tasks' SET status = 0 WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) return reject(err);

                    connection.release(); // обязательно соединение надо закрывать!
                    resolve(rows);
                });
            })
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);

                connection.query(`DELETE FROM 'tasks' WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) return reject(err);

                    connection.release(); // обязательно соединение надо закрывать!
                    resolve(rows);
                });
            })
        });
    }
}

module.exports = Task_mysql;