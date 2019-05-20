const readline = require('readline');
const fs = require('fs');

const fileNameLog = process.argv[2];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Игра Орел-Решка\nУправление:\n1 - Орел\n2 - Решка\n0 - Выход');

rl.on('line', (cmd) => {
    if (cmd === '1' || cmd === '2') {
        let result;

        if (cmd === (Math.floor(Math.random() * 2) + 1).toString()) {
            console.log('Победа');
            result = 1;
        } else {
            console.log('Поражение');
            result = 0;
        }

        fs.appendFile(fileNameLog, result, (err) => {
            if (err) {
                return console.error(err);
            };
        });

    } else if (cmd === '0') {
        rl.close();
    } else {
        console.error('Нет такой команды.');
    }
});