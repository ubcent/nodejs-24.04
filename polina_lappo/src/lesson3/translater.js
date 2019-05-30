const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const API = 'trnsl.1.1.20190519T212553Z.f6ea43b3a1519241.2325c67a324d6678bb6ee3a64331322402d97726'
let lang;

function setLang () {
    rl.question('Выбери вариант перевода: \n'+
                '1 - с русского на английский \n'+
                '2 - с английского на русский \n'+
                '3 - изменить язык\n'+
                '4 - выход\n', (answer) => {
        switch(answer) {
            case '1': 
                lang = 'ru-en';
                break;
            case '2': 
                lang = 'en-ru';
                break;
            case '3':
                setLang();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Доступны только русский и английский языки');
                rl.close();
        }
    });
}

setLang();


rl.on('line', (text) => {
    if (text == '3') {
        setLang();
    }
    if (text == '4') {
        rl.close();
    }
    else {
        text = encodeURIComponent(text);
        request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API}&lang=${lang}&text=${text}&`, (err, res, body) => {
            if(!err && res.statusCode === 200) {
                const obj = JSON.parse(body);
                console.log(obj.text)
            }
            else {
                console.log(err);
            }
        })
    }
})