const readline = require('readline');
const request = require('request');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


rl.question('Type the sentence to translate.\n', (textToTranslate) => {
    request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190520T175646Z.4664238820e08c19.6397ef0ba023dd3355a164908763ef5f6d47673c&text=${textToTranslate}&lang=en-ru`,
        (err, response, body) => {
            const translatedText = JSON.parse(body);

            console.log(translatedText.text[0]);
            console.log();
        });
    rl.close();
});