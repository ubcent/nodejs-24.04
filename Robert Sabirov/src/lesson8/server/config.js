module.exports = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 13013,
    hostDb: process.env.HOST_DB || '127.0.0.1',
    portDb: process.env.PORT_DB || 27017,
    dbName: process.env.DB_NAME || 'todo2',
}
