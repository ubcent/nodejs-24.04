//Задание 1
const ansi = require('ansi');

const cursor = ansi(process.stdout);

cursor
	.blue()
	.bg.grey()
	.write('Hello!')
	.bg.reset()
	.reset()
	.write('\n');

	cursor.beep();


//Задание 2
const minify = require('html-minifier').minify;

let result = minify('<div style="" class="myClass">Text</div>', {
  removeAttributeQuotes: true,
  removeEmptyAttributes: true
});
console.log(result);

//Задание 3

const colors = require('colors');
 
console.log('hello'.green); 
console.log('i like cake and pies'.underline.red) 
console.log('inverse the color'.inverse); 
console.log('OMG Rainbows!'.rainbow); 
console.log('Run the trap'.trap);
console.log('OMG Rainbows!'.bold);

console.log("\x07");