const fs = require('fs');
const util = require('util');

/*
const read = util.promisify(fs.readFile);

read('./package.json', 'utf-8')
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.error(err);
    }
  )
  */

const data = fs.readFileSync('./package.json', 'utf-8'); // не стоит использовать в веб-приложениях
console.log(data);