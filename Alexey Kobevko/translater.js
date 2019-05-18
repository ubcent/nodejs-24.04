/*jshint esversion: 6 */

const request = require('request');
const ansi = require('ansi');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const cursor = ansi(process.stdout);

const ADRESS = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const KEY = 'trnsl.1.1.20190517T202406Z.f038416151cc58dc.e4ecbf3328508bbaf96e81b1f2eebd37bc39b383';

cursor
    .black().bg.hex('#FF8000')
    .write(' Enter a word(s) to translate (to exit ^C) ')
    .reset().write('\n');

rl.on('line', (input) => {

    let encodeWord = encodeURI(input);

    request(`${ADRESS}?key=${KEY}&text=${encodeWord}&lang=ru-en`, (err, req) => {

        if (!err && req.statusCode === 200) {

            const answer = JSON.parse(req.body);
            console.log(answer.text[0]);
    }
    });
});
