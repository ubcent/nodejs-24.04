const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('Hello from http package!');
    res.end();
}).listen(8888);