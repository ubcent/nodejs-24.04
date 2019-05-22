const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (text) => {
    request(encodeURI('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190522T092042Z.a8d635fbbfa1dc57.32a74a85103ebf0cb9e76817e7680347e4cb22ba&lang=en-ru&text=' + text), (err, req, json) => {
        if (!err && req.statusCode === 200) {
            console.log(JSON.parse(json).text);
        }
    });
});
