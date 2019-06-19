const ansi = require('ansi');
const cursor = ansi(process.stdout);

cursor
    .red()
    .bg.yellow()
    .write("Hello World!")
    .bg.reset()
    .reset()
    .write('\n');
cursor.beep();

let cat = require("cat-me");
console.log(cat());
let joke = require("knock-knock-jokes");
console.log(joke());


