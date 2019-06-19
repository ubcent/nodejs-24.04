// генерация случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// запись в лог файл
var fs = require('fs');
const newLine = require('os').EOL;
function writeToLog(strFileName, strLogString) {
    fs.appendFile(strFileName, `${newLine}${strLogString}`, 'utf8', (err) => {
        if (err) throw err;
      });
}

// вывод игровой статистики
function printGameStat(strFileName) {
    console.log('Start game stat report:');
    fs.readFile( strFileName, function (err,data) {
        if(err) throw err;
        
        const arrString = data.toString().split(newLine);
        var gameCount = arrString.length;
        var gameWon = 0;
        var gameLost = 0;
        var lastState = '-';
        
        var gameWonSeq = 0;
        var gameWonSeqMax = -1;

        var gameLostSeq = 0;
        var gameLostSeqMax = -1;

        for(line of arrString) {
            const resultArray = line.toString().split('|');
            if(resultArray.length===2) {
                if(resultArray[1] === 'w') {
                    gameWon++;
                    if(lastState === resultArray[1]) {
                        gameWonSeq++;
                    }
                    else {
                        gameLostSeqMax = gameLostSeqMax > gameLostSeq ? gameLostSeqMax : gameLostSeq;
                        gameLostSeq = 0;
                        lastState = resultArray[1];
                        gameWonSeq++;
                    }
                }
                else {
                    gameLost++;

                    if(lastState === resultArray[1]) {
                        gameLostSeq++;
                    }
                    else {
                        gameWonSeqMax = gameWonSeqMax > gameWonSeq ? gameWonSeqMax : gameWonSeq;
                        gameWonSeq = 0;
                        lastState = resultArray[1];
                        gameLostSeq++;
                    }
                }
            }
        }

        var ratioWonLost = gameLost === 0 ? 0 : gameWon / gameLost;

        console.log('Всего сыграно игр: ', gameCount);
        console.log('Выграно: ', gameWon);
        console.log('Проиграно: ', gameLost);
        console.log('Соотношение Won/Lost: ', ratioWonLost);
        console.log('Максимальное число побед подряд: ', gameWonSeqMax);
        console.log('Максимальное число поражений подряд: ', gameLostSeqMax);
    })
}

// Приветствие
console.clear();
const chalk = require('chalk');
console.log(chalk`{blue Игра орел или решка}`);

// логфайл
var strLogFile = 'game.log';
var strLogData = '';

// обработка параметров
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    log: 'l',
    stat: 's'
  }
});
//console.dir(argv);
if( argv['help'] === true ) {
    console.log('Игра орел или решка. Вводите число 1 или 2. Если угадаете - победа. для выхода из игры введите exit');
    console.log('--help вывод справки');
    console.log('--log имя_файла используйте для указания имени файла хранения лога игровой статистики');
    console.log('--stat используйте для изучения игровой статистики');
}
if( argv['log'] ) {
    strLogFile = argv['log'];
    console.log('Файл для записи/чтения лога изменен:', strLogFile);
}
if( argv['stat'] === true ) {
    printGameStat(strLogFile);
    return;
}

// Приветствие пользователя
var strUserName = process.env['USERNAME'];
console.log(chalk`{yellow Hello, }`, strUserName);

// обработка комманд пользователя
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var intGameCount = 0;
var intUserWon = 0;
var intUserLost = 0;
var intMachineState = 0;
var intUserState = 0;
var parserByte = '';

rl.on('line', (cmd) => {
    console.clear();
 
    intMachineState = getRandomInt(1,2);
    console.log(chalk`{blue Введите число 1 или 2 для продолжения игры или exit для завершения партии}`);
    if(cmd==='') {
        console.log('алиса так не поймет...');
    }
    else if(cmd === 'exit' || cmd === 'q') {
        console.log(chalk`{green До встречи в новой партии!}`);
        rl.close();
    }
    else if(cmd === 'stat' || cmd === 's') {
        printGameStat(strLogFile);
    }
    else {
        intGameCount++;
        console.log(chalk`{green Вы ввели:}`, cmd);
        intUserState = parseInt(cmd);
        if(intUserState === intMachineState) {
            console.log(strUserName, 'Ура! Вы угадали!');
            intUserWon++;
            parserByte='w';
        }
        else {
            console.log(strUserName,'Мимо! Комьютер выйграл!');
            intUserLost++;
            parserByte='l';
        }
        strLogData = 'User:[' + strUserName + '] Count:[' + intGameCount + '] Won:[' + intUserWon + '] Lost:[' + intUserLost+']' + '|' + parserByte;
        console.log(chalk`{yellow Game report:}`,strLogData);
        writeToLog(strLogFile, strLogData);
    }
});

