const readline = require('readline-sync');
const fs = require('fs');

class Game {
    constructor(logger, logFile){
        this.logger = logger;
        this.logFile = logFile;
        this.play();
    }

    play(){
        while (this.answer !== 0){
            this.question();
            if(!this.isValid()){
                this.question();
            }
            if(this.isWin()){
                this.logger.log(this.logFile, '1');
                console.log('Вы выиграли');
            } else {
                if(this.answer === 0)
                    break;
                this.logger.log(this.logFile, '0');
                console.log('Вы проиграли');
            }
        }
    }

    question(){
        let answer = readline.question('Enter 1(head), 2(tail), 0(exit)');
        this.answer = +answer
    }

    flipCoin() {
        return Math.floor(Math.random() * 2 + 1);
    }

    isWin() {
        return this.flipCoin() === this.answer;
    }

    isValid() {
        return this.answer === 1
            || this.answer === 2
            || this.answer === 0;
    }
}

class Logger {

    log(logFile, data){
        fs.appendFile(logFile, data, (err) => {
            if(err){
                this.logErr(err);
            }
        })
    }

    logErr(err){
        console.error(err);
        fs.appendFile('err.txt', err);
    }
}

let game = new Game(new Logger(), 'log.txt');