const chalk = require('chalk');
const beeper = require('beeper');
const randomText = require('random-textblock');

const options = {
    minWords: 3,
    maxWords: 7,
    minSentences: 1,
    maxSentences: 1
};

console.log(chalk.blue('Node.js -', chalk.underline('Lesson 1')));

console.log(
    chalk.green.bold('Random text:'),
    chalk.red.bgBlackBright(randomText.getTextBlock(options))
);

beeper('**-*-***');

