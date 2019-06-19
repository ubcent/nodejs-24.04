/*jshint esversion: 6 */

const figlet = require('figlet');

figlet.text('Hello NodeJS!!!', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});