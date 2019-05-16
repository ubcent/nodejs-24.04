const fs = require('fs');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

const logGame = fs.readFileSync('./log.json');
const log = JSON.parse(logGame);

let win = 0;
let lose = 0;

log.coin.forEach((element) => {
  if ( element.resultGame === 'Win'){
    win ++;
  } else lose++;
});

cursor
.blue()
.write('Всего партий ' + log.game)
.reset()
.write('\n')
.yellow()
.write('Выигранные партии ' + win)
.reset()
.write('\n')
.green()
.write('Проигранные партии ' + lose)
.reset()
.write('\n');
