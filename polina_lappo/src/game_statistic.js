////////////////////////////////////////////
// `game_statistic.js -f [fileName]`      //
////////////////////////////////////////////

const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

let fileName = "game_log.txt"
if (argv.f != null ) {
    fileName = argv.f;
}


if (fs.existsSync(fileName)) {
    fs.readFile(fileName,'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        let arr = data.split(' ');
        console.log(arr);
        let win = 0, loss = 0, total = 0;
        total = data.split("\n").length-1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "Проигрыш")
                loss++;
            if (arr[i] === "Выигрыш")
                win++;     
        }

        console.log("Общее количество партий = " + total);
        console.log("Количество выигранных партий = " + win);
        console.log("Количество проигранных партий = " + loss);
        console.log("Соотношение выигранные / проигранные партиии = " + win / loss);

      });
}
else {
    console.log("Файл для подсчета статистики не найден")
}
