const readline = require('readline');
const fs = require('fs');

function random(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let result = '';

let logGame = {
  coin: [],
  game: 0
};

console.log("Добро пожаловать в игру Монетка!!! Введите число");
rl.on('line', (cmd) => {
  if (cmd === 'exit') {
    console.log('Приятно было с вами поиграть!!!');
    rl.close();
  } else {
    let number = random(1, 2);
    console.log('Вы ввели:' + cmd);

    if (+cmd === number) {
      console.log('Вы победили!!!Попробуйте еще раз!!!');
      result = 'Win';
    } else {
      console.log(`Увы вы проиграли, правильный ответ ${number}. Попробуйте еще раз!!!`);
      result = 'Lose';
    }
    if ( logGame.game === 0) {
      logGame.game = 1;
    } else logGame.game++;

    logGame.coin.push({player: number, game: cmd, resultGame: result});

  }
  
  let json = JSON.stringify(logGame);
  fs.writeFileSync('./log.json', json);

});
