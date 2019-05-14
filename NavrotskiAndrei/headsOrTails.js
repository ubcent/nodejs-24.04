const readline = require('readline');
const fs = require('fs');
const write = fs.writeFile;

class Game {
	constructor(fileLog){
		this.fileLog = fileLog;
		this.counter = 0;
		this.correctAnswer = 0;
		this.incorrectAnswer = 0;
	}
	coinToss(answer){
		this.counter++;
		let outcome = "1";
		if (Math.random() > 0.5) {
			outcome = "2"
		}
		if (outcome === answer) {
			this.correctAnswer++;
			console.log('Вы угадали!');
		} else {
			this.incorrectAnswer++;
			console.log('Вы не угадали.');
		}
	};
	gameOver(){
		let results = `Игра окончена. Всего сыграно - ${this.counter}, Угадано - ${this.correctAnswer}, Не угадаго - ${this.incorrectAnswer}`;
		console.log(results);
		write(this.fileLog, results, err => {
			if(err){
				console.log(err);
			}
		})
	};


}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const game = new Game('./log.txt');
console.log('Вас приветствует игра "Орел или решка"\nВведите 1 - орел или 2 - решка и нажмите Enter\nДля выхода из игры наберите exit');
rl.on('line', (answer) => {
	if(answer === 'exit'){
		game.gameOver();
		rl.close();
	} else {
		game.coinToss(answer);
	}
});