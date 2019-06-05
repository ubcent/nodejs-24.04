const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    database: 'todo',
    user: 'root',
    password: 'password'
})

class Task {
    static getAll() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query('select * from `tasks`', (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(rows);
                });
            })
        })
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query('select * from `tasks` where `idtasks` = ?', id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                })
            })
        })
    }

    static add(task) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query('insert into `tasks` set ?', task, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(result.insertId);
                });
            })
        })
    }

    static update(id, changeSet) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                const queryStr = 'UPDATE `tasks` SET `title`=?, `desc`=?, `status`=?, `priority`=? WHERE `idtasks` = ?;';
                const arrayChanges = [changeSet.title, changeSet.desc, changeSet.status, changeSet.priority, id];

                connection.query(queryStr, arrayChanges, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(result.insertId);
                });
            })
        })
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query('DELETE FROM `tasks` WHERE `idtasks` = ?;', id, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(result.insertId);
                });
            })
        })
    }
}

module.exports = Task;