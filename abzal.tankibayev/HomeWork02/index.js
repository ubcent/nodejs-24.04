"use strict"
var readline = require('readline-sync');
var fs = require('fs');

const COIN = {                                  // Heads or Tails | Орел или решка:
    HEADS : {value: 1, name: "Орел", code: "H"},
    TAILS: {value: 2, name: "Решка", code: "T"}
  };
const CODE = {
    EXIT : {value: 0, name: "Exit", code: "E"}
}
const LOG_FILE = "HeadsOrTails.log";
function randomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GAME { 
    constructor() {        
        this.compMove = -1; // ход компьютера
        this.userMove = -1; // ход игрока
        this.step = 0;      // партия
        this.win = -1;      // выигрыш
        this.nextGame = 1;  // следующая игра?
        this.logger = fs.createWriteStream(LOG_FILE, {
            flags: 'a' // 'a' means appending (old data will be preserved)
        })      
    }
    Start(){
        while(this.nextGame == 1){
            this.win = -1;
            this.step++;
            this.compMove = this.Move();            
            this.userMove = this.UserMove();
            (this.compMove === this.userMove)? this.Win() : this.Loss();                        
            let log = this.win + '\r\n';
            this.logger.write(log);
            this.nextGame = this.Continue();
        }
        this.logger.end();
    }
    Win(){
        this.win = 1;
        console.log("Вы выиграли!");
    }
    Loss(){
        this.win = 0;
        console.log("Вы проиграли!");
    }
    Move(){
        return randomNumber(COIN.HEADS.value,COIN.TAILS.value);       
    }
    UserMove(){
        return parseInt(readline.question('Ваш ход, введите 1 (орел) или 2 (решка):'));        
    }
    Continue(){                       
        return (parseInt(readline.question('Если желаете закончить игру, нажмите 0:')) == CODE.EXIT.value)?0:1; 
    }
}
let game = new GAME();
game.Start();
  