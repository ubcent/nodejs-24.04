const request = require('request');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const APIkey = 'trnsl.1.1.20190525T052400Z.4ccc6c2d3f923344.f52fabbb9938ca7012024c475baa8d6d7cbf239e';

rl.question('Введите исходный язык ru - Русский, en - Английский, fr - Французский, для выхода введите - ex\n', (from) => {
    rl.question('Введите язык перевода ru - Русский, en - Английский, fr - Французский\n', (to) => {
        console.log('Введите текст');
        rl.on('line', (text) => {
            if(text === 'ex') {
                rl.close();
            }
            text = encodeURI(text);
            request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${APIkey}&lang=${from}-${to}&text=${text}`,
                (err, req, json) => {
                    if(!err){
                        console.log(JSON.parse(json).text[0]);
                    }
                })
        });
    });
});