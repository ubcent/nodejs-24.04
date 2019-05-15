const text = require('ansi-colors');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var countUser = 0;
var countComp = 0;
const arrGame = ['орел', 'решка'];

console.log('Игра ОРЕЛ или РЕШКА. Ответ должен быть "орел" или "решка"');
console.log('Играем????');


rl.on('line', (input) => {
  if( input === 'exit' || input === 'e' || input === 'выход' || input === 'нет' || input === 'no' || input === 'n') {
    console.log('Скучно будет - приходи))))))');
    rl.close();
  } else if( input === 'да' || input === 'yes' || input === 'y' ) {
    console.log(`Received: ${input}`);

    rl.question('Компьтер подбросил монетку и поймал, зажав в лодони. Отгадай какая из сторон лежит вверху? ', (answer) => {
      // const randomGame = random.random();
      randomGame = () => {
        return arrGame[Math.floor(Math.random()*2)]
      };
      const fff = randomGame();
      console.log(text.green.bold.underline(`Правильный ответ: ${fff}`));
      if (answer[0] == fff[0] ) {
            countUser++;
            console.log('Ура Вы выграли');  
          } else {
            countComp++;
            console.log('Вы Проиграли');    
          }
          console.log(`Счет: Человке ${text.bold.red(countUser)} - Комп ${text.bold.red(countComp)}`);
          console.log('Eще играем????');  
    }); 
  }  
});