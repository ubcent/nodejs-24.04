'use strict';

const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = 'trnsl.1.1.20190517T072617Z.7111e40257e14418.5c29c20e4f9607863f92007795a8844d2f18cdb4';

rl.question('Введите текст на английском для перевода: ', (answer) => {
    const trt = answer.replace(/ /ig,'%20');
    request({
            url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&lang=en-ru&text=${trt}`,
            method: 'POST',
            json: true,
        },
        (err, res, data) => {
        if (!err && res.statusCode === 200) {
            console.log(`Перевод текста "${answer}": ${data.text[0]}`);
        } else {
            console.log('Error: ' + err);
        }
    });
    rl.close();
});



