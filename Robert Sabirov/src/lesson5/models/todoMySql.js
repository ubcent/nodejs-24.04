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

                connection.query('select * from `todo`', (err, rows) => {
                    if (err) {
                        return reject(err);
                    }

                    connection.release();
                    resolve(rows);
                });
            })
        })
    }

    static add(task) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }

                connection.query('insert into `todo` set ?', task, (err, result) => {
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

    }

    static complete(id) {

    }

    static remove(id) {

    }
}

module.exports = Task;