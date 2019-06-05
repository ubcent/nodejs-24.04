//npm i mysql
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'todo',
  user: ShadowRoot,
  password: '',
});

class Task {
  static getAll() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query('SELECT * FROM `tasts` WHERE 1', (err, rows) => {
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
        connection.query(
          `SELECT * FROM 'tastcs' WHERE id=${mysql.escapeId(id)}`,
          (err, rows) => {
            if (err) {
              return reject(err);
            }
            connection.release();
            resolve(rows);
          }
        );
      });
    });
  }

  static add(task) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query('INSERT INTO `tasks` SET ?', task, (err, result) => {
          if (err) {
            return reject(err);
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
        connection.query(
          `UPDATE 'tastcs' SET ${changeSet} WHERE id=${mysql.escapeId(id)}`,
          (err, result) => {
            if (err) {
              return reject(err);
            }
            connection.release();
            resolve(result.changeSet);
          }
        );
      });
    });
  }

  static complete(id, isDone) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          `UPDATE 'tastcs' SET ${isDone} WHERE id=${mysql.escapeId(id)}`,
          (err, result) => {
            if (err) {
              return reject(err);
            }
            connection.release();
            resolve(result.isDone);
          }
        );
      });
    });
  }

  static remeve(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          `DELETE FROM 'tastcs' WHERE id=${mysql.escapeId(id)}`,
          (err, rows) => {
            if (err) {
              return reject(err);
            }
            connection.release();
            resolve(rows);
          }
        );
      });
    });
  }
}

module.exports = Task;
