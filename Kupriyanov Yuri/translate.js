
const minimist = require('minimist');
const request = require('request');
const url = require('url');

// обработка параметров
const argv = minimist(process.argv.slice(2), {
  alias: {
    word: 'w'
  }
});

let sourceWord = 'Translate please';

if( argv.word ) {
    sourceWord = argv.word;
}

console.log('Слово для перевода:', sourceWord);

YandexTranslate(sourceWord);

console.log('Переведено сервисом «Яндекс.Переводчик» http://translate.yandex.ru/');

function YandexTranslate(someText) {
  
  /* Syntax:
      https://translate.yandex.net/api/v1.5/tr.json/translate
    ? [key=<API-ключ>]
    & [text=<переводимый текст>]
    & [lang=<направление перевода>]
    & [format=<формат текста>]
    & [options=<опции перевода>]
    & [callback=<имя callback-функции>]
  */

    const apiKey = 'trnsl.1.1.20190521T205759Z.04de95c6c34e6fc1.3288b3f5cd76f1cb2e078a0034cacc72b00365ab';
    const apiURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

    const params      = url.parse(apiURL, true);
    params.query.key  = apiKey;
    params.query.text = someText;
    params.query.lang = 'en-ru';
     
    request(url.format(params), (err, res, body) => {
      if ( !err && res.statusCode === 200 ) {
        /* Return:
          {
            "code": 200,
            "lang": "en-ru",
            "text": [
                    "Здравствуй, Мир!"
                  ]
          }
        */
        result = JSON.parse(body);
        console.log('Перевод: ', result.text);
      } else {
        throw Error; 
      }
    });

}

  
  
