class ServerConfig {
    static getParams() {
        return {
            port: process.env.port || 8888,
          };
    }      
}

module.exports = ServerConfig;
