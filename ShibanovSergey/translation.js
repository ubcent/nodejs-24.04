//Написано Шибановым Сергеем для выполнения домашнего задания Переводчик с английского 22.05.2019
let request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
console.log("Напишите что-нибудь на  английском языке");

rl.on("line", (text)=>{
request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190520T183353Z.6007dceab1dceb08.754fa20bc00faff51c754ef0e06dd92c2ba126d8&text=' + text + '&lang=en-ru', function (error, response, html) {
   if (!error && response.statusCode === 200) {
           console.log(JSON.parse(html).text[0]);
   }
 });
});

