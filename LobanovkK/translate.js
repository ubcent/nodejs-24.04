const request = require('request');
const readline = require('readline');
const api = 'trnsl.1.1.20190528T082819Z.b5640fc7dbbef8ba.85fca8bb398dd03574a965ac0a5c58ecb7a59b82';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
console.log('Добро пожаловать в переводчик');
rl.on('line' , text => {
  if (text === 'exit'){
    rl.close();
  }
  request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${api}&lang=en-ru&text=${text}` , (err, req, json) => {
    if (!err && req.statusCode === 200) {
      console.log(JSON.parse(json).text);
    }
  })
})