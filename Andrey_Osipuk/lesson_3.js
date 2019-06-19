const request = require('request');
const cheerio = require('cheerio');
const url = require('url');
const readline = require('readline');
const ansi = require('ansi');
const util = require('util');
const path = require('path');
// const express = require('express');
// const consolidate = require('consolidate');
// const app = express();
const cursor = ansi(process.stdout);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

cursor
    .red()
    .bg.yellow()
    .write('Введите номер задания (1 или 2)')
    .bg.reset()
    .reset()
    .write('\n');

rl.on('line', (cmd) => {
    if (cmd === '1') {
        task1();
        // console.log('Выберите задание')
    } else if (cmd === '2') {
        task2();
        console.log('Выберите задание')
    } else if (cmd === 'exit') {
        console.log('Выход');
        rl.close();
    } else {
        console.log('неверный ввод, для выхода напишите "exit"');
    }
});

function task1() {
    request('https://bash.im/', (err, req, html) => {
        if (!err && req.statusCode === 200) {
            const $ = cheerio.load(html);
            console.log('Вывод первых 10 цитат с bash.im')
            for (let i = 0; i < 10; i++) {
                cursor
                    .yellow()
                    .bg.grey()
                    .write('Цитата №' + (1 + i))
                    .write('\n')
                    .bg.reset()
                    .reset();
                // console.log($('.quote__body').eq(i + 1).text().trim());
            }
            console.log('\nВыберите задание')
        }
    });
};

function task2() {

    rl.question('Напишите фразу, которую надо перевести\n', (answer) => {
        // encodeURI()
        const API_KEY = 'trnsl.1.1.20190520T121259Z.fec495841090efdb.d801769108827913c264d021f12524d8bc6037b4';
        const API_URL = new URL(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=ru-en&key=${API_KEY}&text=${answer}`);
        
        
        request(API_URL.href, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                console.log(JSON.parse(body).text[0]);
            }
        });
        return;
    });

};