/*jshint esversion: 6 */

const ansi = require('ansi');
const readline = require('readline');
const figlet = require('figlet');
const fs = require('fs');


const cursor = ansi(process.stdout);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(figlet.textSync('Heads or Tails'));
cursor
    .black().bg.hex('#FF8000')
    .write('Выберите сторону: орел(1), решка(2), выход(3)')
    .reset().write('\n');

rl.on('line', (input) => {
    const random = '' + (Math.floor(Math.random() * (3 - 1)) + 1);
    let result = '';

    if (!['1', '2', '3'].includes(input)) {
        cursor
            .black().bg.white()
            .write('Выберите сторону: орел(1), решка(2), выход(3)')
            .reset().write('\n');
    } else if (input === random) {
        console.log(figlet.textSync('You WIN!!!'));
        cursor
            .beep().white().bg.hex('#000080')
            .write('Выберите сторону: орел(1), решка(2), выход(3)')
            .reset().write('\n');
        result = 'win';
    } else if (input === '3') {
        setTimeout((cb) =>{
            rl.close();
        }, 2000);
        console.log(figlet.textSync('GOOD BYE!'));
    } else {
        console.log(figlet.textSync('You LOSSE ((('));
        cursor
        .black().bg.hex('#FF0000')
        .write('Выберите сторону: орел(1), решка(2), выход(3)')
        .reset().write('\n');
        result = 'loss';
    }
    fs.appendFile('logs.txt', `${result}\n`, 'utf-8', (err) => {
        if (err) throw err;
    });
});