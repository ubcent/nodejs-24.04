const mysql = require('mysql');

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
                console.log('connection successful mysql');
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
                    connection.release();
                });
            })
        });
    }
    get(id){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                // pool.query(`select  emp_no, birth_date, first_name, last_name, gender, hire_date from employees_mongo where emp_no = ${mysql.escape(id)}`, (err,result,fields)=>{
                pool.query(`select  emp_no, birth_date, first_name, last_name, gender, hire_date from employees_mongo where emp_no = ?`, id, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    connection.release();
                });
            })
        });
    }
    add(firstName, lastName, birthDate, hireDate, gender){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`insert into employees_mongo (birth_date, first_name, last_name, gender, hire_date) values ('${birthDate}', '${firstName}', '${lastName}', '${gender}', '${hireDate}')`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result});
                    }
                    connection.release();
                });
            })
        });
    }
    update(id, firstName, lastName, birthDate, hireDate, gender){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`update employees_mongo set first_name = ${mysql.escape(firstName)},last_name = ${mysql.escape(lastName)},first_name = ${mysql.escape(firstName)},birth_date = ${mysql.escape(birthDate)},hire_date = ${mysql.escape(hireDate)},gender = ${mysql.escape(gender)} where emp_no = ${mysql.escape(id)}`, (err,result,fields)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    connection.release();
                });
            })
        });
    }
    remove(id){
        return new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                pool.query(`delete from employees.employees_mongo where emp_no = ${mysql.escape(id)};`, (err,result,fields)=>{

                    if (err) {
                        console.log(err);
                    } else {
                        resolve({result, fields});
                    }
                    connection.release();
                });
            })
        });
    }

}
module.exports = Mysql;