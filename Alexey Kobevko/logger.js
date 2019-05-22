/*jshint esversion: 6 */

const fs = require('fs');
const ansi = require('ansi');


const cursor = ansi(process.stdout);

fs.readFile('logs.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    let arrLogs = data.split('\n').filter(el => el !== '');

    let wins = 0;
    let losses = 0;

    for (let i = 0; i <= arrLogs.length - 1; i++) {
        if (arrLogs[i] === 'win') {
            wins += 1;
        } else {
            losses += 1;
        }
    }

    let result = ` Игр сыграно: ${arrLogs.length}, из них побед: ${wins}, поражений: ${losses} `;

    cursor.beep().white().bg.hex('#000080').write(result).reset().write('\n');
});