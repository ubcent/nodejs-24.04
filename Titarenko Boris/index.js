const ansi = require('ansi');
const moment = require('moment');

const cursor = ansi(process.stdout);

cursor
    .red()
    .bg.yellow()
    .write('Hello World')
    .beep()
    .bg.white()
    .black()
    .write('\n');   
console.log('Today is ' + moment().format());

cursor
    .beep()
    .white()
    .bg.black();