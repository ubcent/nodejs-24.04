const execQuery = require('../lib/db');

const table = 'users';

class User {
 
    static async add(user) {
        const {insertId} = await execQuery(`INSERT INTO ${table} SET ?`, user);
        return insertId;
    }

    static async remove(id) {
        const {affectedRows} = await execQuery(`DELETE FROM ${table} WHERE  id = ?`, id);
        return affectedRows;
    }

    static async update(id, user) {
        return execQuery(`UPDATE ${table} SET ? WHERE id =?`, [user, id]);
    }

    static async getAll() {
        return execQuery(`SELECT * FROM  ${table}`);
    }

    static async getByID(id) {
        const [result] = await execQuery(`SELECT * FROM  ${table} WHERE id = ?`, id);
        return result;
    }

    static async findOne(username) {
        const [result] = await execQuery(`SELECT * FROM  ${table} WHERE username = ?`, username);
        return result;
    }

    static async checkPassword(password) {
        
        return true;
    }
}

module.exports = User;