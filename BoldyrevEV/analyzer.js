var fs = require('fs');

fs.readFile("text.txt", 'utf8', (err, data) => {
    if (err) throw err;

    let valueOn = "Правильный ответ";
    let valueOff = "Правильный ответ";
    let pos = 0;
    let positiv = [];
    let negativ = [];

    while (true) {
        let foundPos = data.indexOf(valueOn, pos);

        if (foundPos == -1) break;

        positiv.push(foundPos)
        pos = foundPos + 1;
    }

    while (true) {
        let foundNeg = data.indexOf(valueOff, pos);
        if (foundNeg == -1) break;

        negativ.push(foundNeg)

        pos = foundNeg + 1;
    }

    console.log('Количество правильных ответов - ' + positiv.length);
    console.log('Количество неправильных ответов - ' + positiv.length);
});