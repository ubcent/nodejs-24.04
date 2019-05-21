const minimist = require('minimist');
const readline = require('readline');
const fs = require('fs');

const argv = minimist(process.argv.slice(2));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const fileNameLog = argv._.toString();
console.log(fileNameLog);

console.log('Угадайте какой стороной упадёт монета.\n 1(орёл)\n 2(решка)\n q - выход из игры.\n');

rl.on('line', (cmd) => {
    if (cmd === 'q') {
        rl.close();
    }
    else {
        let coin=Math.round(Math.random()) + 1;
        let value = parseInt(cmd);
        let result;
        if (value === coin) { 
            console.log('Вы выиграли!'); 
            result = 'win';
        }
        else {
            if ((value === 1)|(value === 2)) { 
                console.log('Вы проиграли!'); 
                result = 'loss';
            }
            else { 
                console.log('Ответ не равен 1 или 2. Вы проиграли.'); 
                result = 'loss';
            }
        }
        fs.appendFile(fileNameLog, `\r\n${result}`, function (err) {
            if (err) throw err;
        }); 
        
    }
});






