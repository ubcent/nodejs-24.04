const ansi = require('ansi');
const text = require('ansi-colors');
const cursor = ansi(process.stdout);

cursor
  .red()
  .bg.green()
  .write('Привет_от_node.js')
  .bg.reset()
  .reset()
  .write('\n');

cursor.beep();  

console.log('Hello World!!!');


console.log(text.bold.red('this is a bold red message'));
console.log(text.bold.yellow.italic('this is a bold yellow italicized message'));
console.log(text.green.bold.underline('this is a bold green underlined message'));

console.time('100-elements');
for (let i = 0; i < 100; i++) {}
console.timeEnd('100-elements');