const fs = require('fs');

const fileNameLog = process.argv[2];

fs.readFile(fileNameLog, 'utf-8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    const count = data.length;
    const win = data.match(/1/g).length;
    const loss = data.match(/0/g).length;

    console.log('Всего игр: ' + count);
    console.log(`Побед: ${win} (` + (win / (count / 100)) + `%)`);
    console.log(`Поражений: ${loss} (` + (loss / (count / 100)) + `%)`);
});