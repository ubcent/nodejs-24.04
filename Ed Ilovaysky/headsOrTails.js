var choice, coin;
var roundCount = 1;
var stopGame = false;
var vinCount = 0;
var loseCount = 0;

var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require("fs");

function startGame() {
  console.log("Раунд: " + roundCount);
  console.log("Угадано раз: " + vinCount);
  console.log("Неугаданно раз: " + loseCount);
  console.log("Запомните 1 это Орел, 2 это Решка. Введите 1 или 2");
  compChoice();
  console.log(coin);
  rl.on("line", cmd => {
    roundCount++;
    if (stopGame == false) {
      if (cmd == 1) {
        console.log("Вы выбрали Орла!");
      } else if (cmd == 2) {
        console.log("Вы выбрали Решку!");
      } else {
        console.log("Вы должны ввести 1 или 2");
      }
      choice = cmd;
      if (choice == coin) {
        console.log("Вы угадали!");
        vinCount++;
         fs.appendFile("./log.txt", 1, error => {
           if (error) {
             return console.error(error);
           }
         });
      } else {
        console.log("Вы не угадали");
        loseCount++;
         fs.appendFile("./log.txt", 0, error => {
           if (error) {
             return console.error(error);
           }
         });
      }

      rl.question(
        "Хотите продолжить? Если да, то введите 1, если нет - любой символ. ввод: ",
        answer => {
          if (answer == 1) {
            console.log("Раунд: " + roundCount);
            console.log("Угадано раз: " + vinCount);
            console.log("Неугаданно раз: " + loseCount);
            console.log("Продолжаем игру, Введите 1 или 2: ");
             compChoice();
             console.log(coin);
          } else {
            console.log("Игра загончина\nнажмите  Ctrl + c для выхода из программы");
            stopGame = true;
          }
        }
      );
    }
  });
}

function compChoice() {
  var compChoice = Math.random();
  if (compChoice <= 0.5) {
    return (coin = 1);
  } else if (compChoice > 0.5) {
    return (coin = 2);
  }
}

rl.question(
  'Вы хотите сыграть в "Орел или Решка?" 1 = да, любой другой символ = нет  Ваш выбор:  ',
  answer => {
    if (answer == 1) {
      console.log("начинаем игру!");
      startGame();
    } else {
      console.log(
        "Удачи!!! ;)\nнажмите  Ctrl + c для выхода из программы"
      );
    }
  }
);
