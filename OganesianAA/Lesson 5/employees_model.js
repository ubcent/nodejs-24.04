const mysql = require('mysql');

// const connection = mysql.createConnection({
const pool = mysql.createPool({
    host: '192.168.1.10',
    port: '3307',
    user: 'nodeuser',
    password: 'nodeuser',
    database: 'employees'
});

class Mysql{
    constructor(){
        this.getConnection()
    }
    getConnection(){
        pool.getConnection((err, connection)=> {
            if (err) {
                console.log(err);
            } else {
                console.log('connection successful');
            }
            connection.release();
        });
    }
    getAll(){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`select  emp_no, birth_date, first_name, last_name, gender, hire_date from employees_mongo`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    // resolve(result.insertId);
                    // resolve(result);
                    connection.release();
                });
            })
        });
    }
    get(id){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`select  emp_no, birth_date, first_name, last_name, gender, hire_date from employees_mongo where emp_no = ${mysql.escapeId(id)}`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    // resolve(result.insertId);
                    // resolve(result);
                    connection.release();
                });
            })
        });
    }

    add(birth_date, first_name, last_name, gender, hire_date){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`insert into employees_mongo
                                    ( emp_no, birth_date, first_name, last_name, gender, hire_date) 
                                    values (${emp_no}, ${birth_date}, ${first_name}, ${last_name}, ${gender}, ${hire_date})}`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    // resolve(result.insertId);
                    // resolve(result);
                    connection.release();
                });
            })
        });
    }
    update(id, param, value){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`update employees_mongo set ${param }= ${value}
                                    where emp_no = ${mysql.escapeId(id)}`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    // resolve(result.insertId);
                    // resolve(result);
                    connection.release();
                });
            })
        });
    }
    remove(id){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`delete from employees_mongo where emp_no = ${mysql.escapeId(id)}`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    // resolve(result.insertId);
                    // resolve(result);
                    connection.release();
                });
            })
        });
    }

}
module.exports = Mysql;