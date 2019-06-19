var readline = require('readline');
var fs = require('fs');

let rl = readline.createInterface({
            input: process.stdin, // ввод из стандартного потока
            output: process.stdout // вывод в стандартный поток
        });

function game (fileName) {
    rl.question('Отгодай число: 1 или 2!', function(answer) {
        let count = Math.round(Math.random()+1);

        if (+answer === count){
            console.log('Угадал!');

            fs.appendFile(`${fileName}`, '\n Правильный ответ: ' + answer , 'utf8', (err, data) => {
                if (err) throw err;
            });
        } else {
            console.log('Повезет в следующий раз! Правильный ответ - ' + count);

            fs.appendFile(`${fileName}`, '\n Неправильный ответ: ' + answer, 'utf8', (err, data) => {
                if (err) throw err;
            });
        }
    });
}

game("text.txt");