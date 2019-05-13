const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let coinToss = (userChoice) => {
	let outcome = "1";
	if (Math.random() > 0.5) {
		outcome = "2"
	}
	if (outcome === userChoice) {
		console.log('Вы угадали!');
	} else {
		console.log('Вы не угадали.');
	}
};
console.log('Вас приветствует игра "Орел или решка"\nВведите 1 - орел или 2 - решка и нажмите Enter\nДля выхода из игры наберите exit');
rl.on('line', (answer) => {
	if(answer === 'exit'){
		rl.close();
	} else {
		coinToss(answer);
	}
});