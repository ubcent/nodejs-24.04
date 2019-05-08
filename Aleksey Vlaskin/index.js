const ansi = require('ansi');

const cursor = ansi(process.stdout);

cursor
    .red()
    .bg.yellow()
    .write('Hello!!!')
    .bg.reset()
    .reset()
    .write('\n');
    
cursor.beep();

