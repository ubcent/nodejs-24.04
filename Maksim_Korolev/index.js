//Задание 1
const ansi = require('ansi');

const cursor = ansi(process.stdout);

console.log('Задание 1 \n');

cursor
	.blue()
	.bg.grey()
	.write('Hello!')
	.bg.reset()
	.reset()
	.write('\n');

cursor.beep();


//Задание 2
console.log('Задание 2 \n');

const minify = require('html-minifier').minify;

let result = minify('<div style="" class="myClass">Text</div>', {
  removeAttributeQuotes: true,
  removeEmptyAttributes: true
});
console.log(result);

//Задание 3
console.log('Задание 3 \n');

const colors = require('colors');
const readWrite = require('console-read-write');
 
async function main() {
	readWrite.write('Type the name of the color you want to see the text or type \"beep\" to play a beep. \n');
	readWrite.write('Supported colors: \x1b[47;30mblack\x1b[0m, \x1b[31mred\x1b[0m, \x1b[32mgreen\x1b[0m,' +
		' \x1b[33myellow\x1b[0m, \x1b[34mblue\x1b[0m, \x1b[35mmagenta\x1b[0m, \x1b[36mcyan\x1b[0m, \x1b[37mwhite\x1b[0m, \x1b[90mgrey\x1b[0m. \n');
	readWrite.write('To exit enter \"end\".');
	let exit = false;
	let text;
	while(!exit) {
		text = await readWrite.read();
		switch(text) {
			case 'black':
				console.log(text.black);
				break;
			case 'red':
				console.log(text.red);
				break;
			case 'green':
				console.log(text.green);
				break;
			case 'yellow':
				console.log(text.yellow);
				break;
			case 'blue':
				console.log(text.blue);
				break;
			case 'magenta':
				console.log(text.magenta);
				break;
			case 'cyan':
				console.log(text.cyan);
				break;
			case 'white':
				console.log(text.white);
				break;
			case 'grey':
				console.log(text.grey);
				break;
			case 'beep':
				console.log("\007");
				break;
			case 'end':
				exit = text === 'end';
				break;
			default:
			console.log('Я не знаю такого цвета!');
			break;
		}
	}
}

main();
