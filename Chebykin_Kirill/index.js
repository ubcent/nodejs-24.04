const chalk = require('chalk');
const beep = require('beepbeep')

console.log(chalk.bgRgb(15, 100, 204).inverse('Hello!'))
beep()