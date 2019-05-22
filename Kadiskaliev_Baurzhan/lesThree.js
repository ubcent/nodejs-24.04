const text = require('ansi-colors');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Какой текст перевети: \n', (answer) => {
  request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190522T102816Z.f87e8265b4fc2e61.7187af00ae65493df1dbb6811548bbc05532687b&text=${encodeURI(answer)}&lang=ru-en`, (err, res, html) => {
    if(!err || res.statusCode === 200) {
      console.log(text.bold.red(JSON.parse(html).text[0]));
    } else {
      console.log('err');
    }
  })
})