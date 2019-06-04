const mysql = require ('mysql');
const dbconfig = require('../config/dbconfig');

const pool = mysql.createPool(dbconfig.getConnectionParams());

const execQuery = (sql, params) => {
    
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            connection.query(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                }
                connection.release();
                resolve(result);
            })
        });
    });
    
};

module.exports = execQuery;