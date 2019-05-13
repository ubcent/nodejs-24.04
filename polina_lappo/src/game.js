////////////////////////////////////////////
// `game.jf -f [fileName]` for use logger //
////////////////////////////////////////////

const argv = require('minimist')(process.argv.slice(2));
const readline = require('readline');
const fs = require('fs');

let fileName = "game_log.txt"
if (argv.f != null ) {
    fileName = argv.f;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

let coin = coinToss();

console.log("Орел или решка? 0 - орел, 1 - решка");
console.log("Для выхода введи `exit`");
rl.on('line', (cmd) => {
    if (cmd === 'exit') {
        rl.close();  
    }
    else {
        if (cmd == coin) {
            console.log('Вы угадали');
            fs.appendFile(fileName, 'Угадали, выпало - ' + coin + "\n", (err) => 
                {
                    if (err) throw err;    
            }); 
            coin = coinToss(); 
            console.log("Орел или решка? 0 - орел, 1 - решка");
        }
        else {
            console.log('Вы НЕ угадали');
            console.log("Правильный ответ - " + coin);
            fs.appendFile(fileName, 'Не Угадали, выпало - ' + coin + "\n", (err) => 
                {
                    if (err) throw err;    
            }); 
            coin = coinToss();
            console.log("Орел или решка? 0 - орел, 1 - решка");
        }
    }
});


function coinToss() {
    return Math.floor(Math.random() * 2);
}