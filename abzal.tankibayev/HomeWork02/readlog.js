"use strict"
var readline = require('readline-sync');
var fs = require('fs');
var LOG_FILE = "";
var DEFAULT_LOG_FILE = "HeadsOrTails.log";
var LOG_CONTENT = "";
var logArray = [];
var inRowMax = function(gameResult) {
    return logArray.join('').split(gameResult).filter(item => item !== '').reduce((a,b) => {return Math.max(a, b);}).length;     
}
// Чтение лога
LOG_FILE = readline.question("Укажите имя файла журнала событий (лог): ");
if(LOG_FILE == '') LOG_FILE = DEFAULT_LOG_FILE; 
try{
console.log("Чтение файла: " + LOG_FILE);
LOG_CONTENT = fs.readFileSync(LOG_FILE, "utf8");             
}
catch(error){
    if(error.code === 'ENOENT') {
        console.log('Файл не найден!');
        process.exit(1);                    
    }
    else{
        console.log("Возникла ошибка: " + error.message);
    } 
}

logArray = LOG_CONTENT.split('');
logArray = logArray.filter(item => item!='\r' && item!='\n' && item!=' ');
console.log(logArray);  // выводим считанные данные

// Статистика
console.log("Статистика: ");
let totalGames = logArray.length;           // Всего игр
var result = logArray.reduce((acc, el) => { // Сортировка количества побед и поражений
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  },{});

let totalWins = result[1];                  // Вариант 2 - logArray.filter(item => item === '1').length;
let totalLoss = result[0];                  // Вариант 2 - totalGames - totalWins;

var result = {
    "Всего игр": totalGames,
    "Всего выигрышей": totalWins,
    "Всего проигрышей": totalLoss,
    "Соотношение выигрышей к проигрышам": totalWins/totalLoss,
    "Всего выигрышей подряд": inRowMax(0),
    "Всего проигрышей подряд": inRowMax(1)
}
console.table(result);