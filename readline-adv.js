const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Выберите сторону. Орел (1), решка(2)');
rl.on('line', (answer) => {
  const rand = '1';

  if(answer === rand) {
    console.log('Вы победили');
  } else if(['1', '2'].includes(answer)) {
    console.log('Вы проиграли');
  } else if(answer === 'exit') {
    rl.close();
    return;
  } else {
    return;
  }
  console.log('Выберите сторону. Орел (1), решка(2)');
});

