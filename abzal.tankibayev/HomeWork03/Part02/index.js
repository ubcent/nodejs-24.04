const request = require('request');
const readline = require('readline');

const keyYandex = 'trnsl.1.1.20190519T185532Z.356b4af839e1512f.982f8e26d341c0543e4ea6d3c9965ccc98d0977b'
const urlYandex = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${keyYandex}&lang=en-ru&text=`
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function translateText(text) {
    return new Promise((resolve, reject) => {
        if (text && text.length > 0) {
            request(urlYandex + text, (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                try { 
                    resolve(JSON.parse(body).text[0]);
                } catch (err) {
                    reject(err);
                }
            });
        } else {
            reject({ message: 'Ошибка! Введено некорректное значение.' })
        }
    })
}


console.log('Введите текст на английском языке для перевода:');
rl.on('line', async (answer) => {
    if (answer === 'exit') {
        console.log('Выход')
        rl.close();
        return;
    }
    await translateText(answer).then(translate => console.log(translate)).catch(err => console.error(err.message));
    console.log('Для выхода введите "exit"\n');
    console.log('Введите текст на английском языке для перевода:');
});