const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'todo',
  user: 'root',
  password: '',
});

class Task {
  static getAll() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if(err) {
          return reject(err);
        }

        connection.query('SELECT * FROM `tasks` WHERE 1', (err, rows) => {
          if(err) {
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
        if(err) {
          return reject(err);
        }

        connection.query(`SELECT * FROM `tasks` WHERE id=${mysql.escapeId(id)}`, (err, rows) => {
          if(err) {
            return reject(err);
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
        if(err) {
          return reject(err);
        }

        connection.query('INSERT INTO `tasks` SET ?', task, (err, result) => {
          if(err) {
            return reject(err);
          }

          connection.release();
          resolve(result.insertId);
        });
      });
    });
  }

  static update(id, changeSet) {

  }

  static complete(id) {

  }

  static remove(id) {

  }
}

module.exports = Task;