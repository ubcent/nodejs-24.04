/*jshint esversion: 8 */

const mysql = require('mysql');
const pool = require('../config');

class Task
{
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject (err);
                }

                connection.query('SELECT * FROM `tasks` WHERE 1', (err, rows) => {
                    if (err) {
                        return reject (err);
                    }

                    connection.release();
                    resolve(rows);
                });
            });
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject (err);
                }

                connection.query(`SELECT * FROM tasks WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) {
                        return reject (err);
                    }

                    connection.release();
                    resolve(rows);
                });
            });
        });
    }

    static add(task) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject (err);
                }

                connection.query('INSERT INTO `tasks` SET ?', task, (err, result) => {
                    if (err) {
                        return reject (err);
                    }

                    connection.release();
                    resolve(result.insertId);
                });
            });
        });
    }

    static update(id, changeSet) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`UPDATE 'tasks' SET changeSet = ${changeSet} WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) return reject(err);

                    connection.release();
                    resolve(rows);
                });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`DELETE FROM 'tasks' WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(true);
                });
            });
        });
    }

    static complite(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`UPDATE 'tasks' SET status = 0 WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(rows);
                });
            });
        });
    }
}

module.exports = Task;