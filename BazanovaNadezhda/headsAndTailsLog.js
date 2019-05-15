const fs = require('fs');

fs.readFile('log.txt', 'utf-8', (err, data) => {
    if(err){
        return console.error(err);
    }
    var dataLog = data.split('\r\n');
    console.log(dataLog);
    console.log('Общее число партий: ', dataLog.length);
    var win = 0;
    var loss = 0;
    for (var i = 0; i < dataLog.length; i++) {
        if (dataLog[i] === 'win') { win += 1;}
        if (dataLog[i] === 'loss') { loss += 1;}
      }
    console.log('Общее число партий: ', dataLog.length);
    console.log('Кол-во побед: ', win);
    console.log('Кол-во поражений: ', loss);
});

