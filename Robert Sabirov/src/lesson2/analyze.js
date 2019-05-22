const minimist = require('minimist');
const fs = require('fs');
const path = require('path')

const argv = minimist(process.argv.slice(2));

if (argv.length === 0) {
    console.error('Ошибка! Не задан лог-файл для анализа.')
} else {
    if (argv._.length > 0) {
        const logFile = path.join(__dirname, '/../', argv._[0]);

        try {
            const innerText = fs.readFileSync(logFile).toString();
            console.log(getStatistics(innerText))

        } catch (err) {
            console.error(err);
        }
    }
}

// Получение общей статистики
function getStatistics(innerText) {
    const countTotalSessions = (innerText.match(/Запуск игры./g) || []).length;
    const countErrorSessions = (innerText.match(/Ошибка./g) || []).length;
    const countTotalWins = (innerText.match(/Пользователь выйграл./g) || []).length;
    const countTotalLoses = (innerText.match(/Пользователь проиграл./g) || []).length;
    const countTotalGames = countTotalWins + countTotalLoses;
    const percentTotalWins = Math.round((countTotalWins * 100) / countTotalGames);
    const percentTotalLoses = Math.round((countTotalLoses * 100) / countTotalGames);
    const [countLuckyLine, countUnluckyLine] = getFortuneStats(innerText);

    return `
Общее количество сыгранных игр: ${countTotalGames}
Количество выйгрышей: ${countTotalWins} ( ${percentTotalWins} % )
Количество проигрышей: ${countTotalLoses} ( ${percentTotalLoses} % )
Общее количество сессий: ${countTotalSessions}
Количество ошибочных сессий: ${countErrorSessions}
Максимальное количество побед подряд: ${countLuckyLine}
Максимальное количество проигрышей подряд: ${countUnluckyLine}
`
}


// Получение значений максимального количества побед и проигрышей подряд
function getFortuneStats(innerText) {
    let countLuckyLine = 0;
    let countUnluckyLine = 0;
    let pos = 0;
    let posLucky = 0;
    let posUnlucky = 0;
    let tempLucky = 0;
    let tempUnlucky = 0;
    while (pos != -1) {
        posLucky = innerText.indexOf('выйграл', pos);
        posUnlucky = innerText.indexOf('проиграл', pos);

        if (posLucky >= 0 && posUnlucky >= 0) {
            pos = Math.min(posLucky, posUnlucky);
        } else {
            pos = (posLucky === -1 ? posUnlucky : posLucky);
        }
        if (pos != -1 && pos === posLucky) {
            tempUnlucky = 0;
            tempLucky++;
            pos++;
        } else if (pos !== -1) {
            tempLucky = 0;
            tempUnlucky++;
            pos++;
        }
        countUnluckyLine = Math.max(countUnluckyLine, tempUnlucky);
        countLuckyLine = Math.max(countLuckyLine, tempLucky);
    }
    return [countLuckyLine, countUnluckyLine];
}