const readline = require('readline');

const fs = require('fs');

const argv = require('minimist')(process.argv.slice(2));

if (argv.a) {
    try {
        fs.readFile(argv._[0], 'utf-8', (err, data) => {
            if (err) throw err;
                        
            let arrData = data.split(',').filter(elem => {return elem!=='';}); //уберём пустой элемент после окончания игры, если он есть
            const total = arrData.length;
            console.log('games:', total);
             
            if (total ===0) {return};
            
            let arrWin = arrData.filter(elem => {return elem === '1'});
            let arrDef = arrData.filter(elem => {return elem === '0'});
            
            const wins = arrWin.length;
            const defs = arrDef.length;
                    
            const persWins = Math.round(parseFloat(wins/total*100) * 100) / 100;
            
            console.log('wins:', wins + ',', Math.round(parseFloat(wins/total*100) * 100) / 100 + '\%');
            console.log('defs:', defs + ',', 100-persWins + '\%');
            
            let maxWinsRow = 0;
            let maxDefsRow = 0;
            let nowWin = 0;
            let nowDef = 0;
            
            for (i=0; i<total; i++){
                if (arrData[i]==='1'){
                    if (nowDef>0){ //Первая победа в серии, обработаем серию поражений
                        if(nowDef>maxDefsRow) {
                            maxDefsRow = nowDef;
                            nowDef = 0;
                        }
                    }
                    nowWin++;
                }else if (arrData[i]==='0'){
                    if (nowWin>0){ //Первое поражение в серии, обработаем серию побед
                        if(nowWin>maxWinsRow) {
                            maxWinsRow = nowWin;
                            nowWin = 0;
                        }
                    }
                    nowDef++;
                };
                
                if (i===total-1){
                    if(nowWin>maxWinsRow) {maxWinsRow = nowWin;}    
                    if(nowDef>maxDefsRow) {maxDefsRow = nowDef;}
                };
            };
            
            console.log('max wins:', maxWinsRow, 'max defs:', maxDefsRow)
            
        });
    } catch (err) {
        console.error(err);
    }
} else {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('The game is started. Try to guess the number! (1/2)');

    let firstGame = true;
    let systemQuestion = false;

    let test = Math.floor(Math.random() * (2)) + 1; //Math.floor(Math.random() * (max - min + 1)) + min;

    rl.on('line', (cmd) => {
        if (cmd === 'exit') {
            rl.close();
            if (systemQuestion === false) { //Выход во время игры, запишем поражение
                fs.appendFile(argv._[0], '0,', (err, data) => {
                    if (err) throw err;
                });
            }
        } else if ((cmd === 'y') && (systemQuestion === true)) {
            systemQuestion = false;
            console.log('The game is started. Try to guess the number! (1/2)');
            test = Math.floor(Math.random() * (2)) + 1;
        } else if ((cmd === 'n') && (systemQuestion === true)) {
            systemQuestion = false;
            console.log('bye!');
            rl.close();
        } else if ((Number(cmd) === test) && (systemQuestion === false)) {
            console.log('You win! New game?(y/n)');
            systemQuestion = true;
            fs.appendFile(argv._[0], '1,', (err, data) => {
                if (err) throw err;
            });
        } else {
            if (systemQuestion === false) {
                console.log('Wrong :(. New game?(y/n)');
                fs.appendFile(argv._[0], '0,', (err, data) => {
                    if (err) throw err;
                    systemQuestion = true;
                });
            } else {
                console.log('New game?(y/n)');
            }
        };
    });
}
