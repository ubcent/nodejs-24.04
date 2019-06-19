const minimist = require('minimist');
const readline = require('readline');
const Logger = require('./logger');
const path = require('path')

let logFile = '';
let logger = new Logger();

// Get path to log file from arguments
const argv = minimist(process.argv.slice(2));
if (argv._.length > 0) {
    logFile = path.join(__dirname, '/../', argv._[0]);

    try {
        logger.setFilePath(logFile);
        logger.write('Запуск игры.');
        console.log(`Лог-файл: ${logFile}\n`);
    } catch (err) {
        logFile = '';
        console.error(err)
    }

} else {
    console.log('Логирование отключено\n');
}


//Start game
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomValue = Math.floor(Math.random() * (2)) + 1;

rl.write(`
Игра Орел и Решка

Сделайте ставку:
    1) Орел
    2) Решка
`);

const answers = { 1: 'Орел', 2: 'Решка' };

rl.question('=> ', answer => {
    if (answer.length === 0 || isNaN(answer) || (answer != 1 && answer != 2)) {
        rl.write('Ошибка. Некорректный ответ: ' + answer);
        logger.write('Ошибка. Некорректный ответ: ' + answer);
    } else {
        if (Number(answer) === randomValue) {
            rl.write(`Вы угадали! Поздравляю!\n`);
            logger.write('Пользователь выйграл.');
        } else {
            rl.write('Вы не угадали...\n');
            logger.write('Пользователь проиграл.');
        }
        rl.write(`Ваш ответ: ${answers[answer]}; Загаданное число: ${answers[randomValue]}\n`);
    }
    rl.close();

    logger.write('Конец игры.');
    logger.end();
})

