const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'node_db',
    user: 'root',
    password: '',
});

class Task {

    static getAll() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query('SELECT * FROM `tasks`', (err, rows) => {
                    if (err) {
                        return reject(err);
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
                    return reject(err);
                }

                connection.query(`SELECT * FROM 'tasks' WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(rows);
                });
                connection.release();
            });
        });
    }

    static add(task) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`INSERT INTO 'tasks' SET ?`, task, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result.insertId);
                });
                connection.release();
            });
        });
    }

    static update(id, chaneSet) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`UPDATE 'tasks' SET ${chaneSet} WHERE id=${mysql.escapeId(id)}`, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result.insertId);
                });
                connection.release();
            });
        });
    }

    static complite (id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`UPDATE 'tasks' SET is_complete=1 WHERE id=${mysql.escapeId(id)}`, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(result.insertId);
                });
                connection.release();
            });
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query(`DELETE FROM 'tasks' WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(rows);
                });
                connection.release();
            });
        });
    }
}

module.exports = Task;