const fs = require('fs');

function maxInRow(data, separator){
    return data.split(separator).reduce((a,b) => {
        return a.length > b.length ? a : b
    }, '')
}

fs.readFile('log.txt', 'utf8', (err, data) => {
    const totalGames = data.length;
    const totalLoss = data.match(/0/g).length;
    const totalWins = data.match(/1/g).length;
    const proportion = totalWins/totalLoss;
    const lossInRow = maxInRow(data, 1).length;
    const winsInRow = maxInRow(data, 0).length;

    console.log(
        `Статистика игры:
        Всего игр: ${totalGames}
        Игр выиграно: ${totalWins}
        Игр проиграно: ${totalLoss}
        Соотношение выигранных к проигранным: ${proportion}
        Максимум выигрышей подряд: ${winsInRow}
        Максимум проигрышей подряд: ${lossInRow}
        `
    );
});