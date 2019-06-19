/*jshint esversion: 6 */

const ansi = require('ansi');

const cursor = ansi(process.stdout);

cursor
    .red()
    .bg.yellow()
    .write('Hello world')
    .reset()
    .write('\n');

cursor.beep();