const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const readline = require('readline');
const write = fs.writeFile;
const util = require('util');
const read = util.promisify(fs.readFile);


class blackJack extends EventEmitter{
    constructor(fileName = './log.txt'){
        super();
        this.gameCount = 0;
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.fileName = fileName;
        process.nextTick(()=> this.emit('start'));
    }
    start(){
        setTimeout(()=>{
            this.emit('finish', {username: 'Your result'});
        },1000);
    }
    game(){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.on('line', (cmd)=>{
            this.gameCount++;
            let rand = this.randomNumber();

            if(cmd==='exit'){
                rl.close();
                this.emit('finish', {
                    gameCount: this.gameCount,
                    correctCount: this.correctCount,
                    incorrectCount: this.incorrectCount,
                });

            } else if(!isNaN(parseInt(cmd))){
                console.log('Ты ввел ', parseInt(cmd),', случайное число : ', rand);
                if (parseInt(cmd)===rand){
                    console.log('Ты угадал');
                    this.correctCount++;
                }else{
                    console.log('Ты ошибся');
                    this.incorrectCount++;
                }
            } else{
                console.log('Пожалуйста введи число от 1 до 2');
            }
        });
    }
    randomNumber(){
        return Math.ceil( Math.random() *2);
    }
    writeResults(message){
        write(this.fileName, message, err=>( ()=>{
            if (err){
                console.log(err);
            }
        }));
    }
}

const negroJack = new blackJack('./log1.txt');

negroJack.on('start', event=>{
    console.log('Привет, это игра Орел или решка, хочешь сыграть?');
    negroJack.game();
});
negroJack.on('finish', event=>{
    let {gameCount, correctCount, incorrectCount} = event;
    let message =`Игра окончена. Количество попыток : ${gameCount} , из них угадано : ${correctCount} , не угадано : ${incorrectCount}`;
    console.log(message);
    negroJack.writeResults(message);
});

