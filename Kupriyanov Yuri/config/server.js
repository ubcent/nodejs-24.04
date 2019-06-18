class ServerConfig {
    static getParams() {
        return {
            port: process.env.port || 8888,
            jwtsecret: 'notasecretatall',
          };
    }      
}

module.exports = ServerConfig;
