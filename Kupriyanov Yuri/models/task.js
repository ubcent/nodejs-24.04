const execQuery = require('../lib/db');

const table = 'tasks';

class Task {
 
    static async add(task) {
        const {insertId} = await execQuery(`INSERT INTO ${table} SET ?`, task);
        return insertId;
    }

    static async remove(id) {
        const {affectedRows} = await execQuery(`DELETE FROM ${table} WHERE  id = ?`, id);
        return affectedRows;
    }

    static async update(id, task) {
        return execQuery(`UPDATE ${table} SET ? WHERE id =?`, [task, id]);
    }

    static async getAll() {
        return execQuery(`SELECT * FROM  ${table}`);
    }

    static async getByID(id) {
        const [result] = await execQuery(`SELECT * FROM  ${table} WHERE id = ?`, id);
        return result;
    }

}

module.exports = Task;