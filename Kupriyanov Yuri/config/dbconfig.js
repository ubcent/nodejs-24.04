class dbconfig {
    static getConnectionParams() {
        return {
            host: 'localhost',
            user: 'userdb',
            database: 'geek_brains',
            password: '123123',
          };
    }
}

module.exports = dbconfig;
