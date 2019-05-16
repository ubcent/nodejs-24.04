const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (cmd) => {
  console.log('Вы ввели: ', cmd);
  if(cmd === 'exit') {
    rl.close();
  }
});