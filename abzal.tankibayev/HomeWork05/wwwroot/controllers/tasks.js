const pool = require('../config');

/*  Model
    task
    id      - идентификатор
    title   - заголовок
    desc    - содержание
    status  - статус
    prority - приоритет
*/

// Controller
class Tasks  {
    get(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.query('select * from `tasks`;', (err, result) => {
                    if (err) return reject(err);
                    connection.release();
                    resolve(result);
                });
            })
        })
    };
    details(id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.query('select * from `tasks` where `id` = ?;',id,(err, result) => {
                    if (err) return reject(err);
                    connection.release();
                    resolve(result);
                });
            })
        })
    };
    add(task){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.query('insert into `tasks` set ?;',task, (err, result) => {
                    if (err) return reject(err);
                    connection.release();
                    resolve(result);
                });
            })
        })
    };
    update(id,task){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.query('update `tasks` set ? where `id` = ?;',[task,id],task, (err, result) => {
                    if (err) return reject(err);
                    connection.release();
                    resolve(result);
                });
            })
        })
    };
    delete(id){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                connection.query('delete from `tasks` where `id` = ?;',id,task, (err, result) => {
                    if (err) return reject(err);
                    connection.release();
                    resolve(result);
                });
            })
        })
    };
};
module.exports = Tasks;