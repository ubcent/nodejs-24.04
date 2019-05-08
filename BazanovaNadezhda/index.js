const ansi = require('ansi');
const moment = require('moment');

const cursor = ansi(process.stdout);

cursor
    .red()
    .bg.yellow()
    .write('Hello World')
    .bg.reset()
    .reset()
    .write('\n');

console.log(moment("20111031", "YYYYMMDD").fromNow());

console.log(moment()
    .add(7, 'days')
    .subtract(1, 'months')
    .year(2019)
    .hours(5)
    .minutes(45)
    .seconds(30));

