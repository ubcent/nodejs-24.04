const readline = require('readline');
const request = require('request');

/**
 * Класс Translater - консольный переводчик.
 */
class Translater {
    /**
     * Конструктор класса Translater.
     */
    constructor() {
        this.rl = null;
        this.translate = null;
    }

    /**
     * Инициализирует класс Translater.
     */
    init() {
        let ans = 'Выберите язык перевода: для перевода с русского нажмите 1, для перевода на русский нажмите 2, для выхода нажмите - 0';
        let rusTr = 'Введите фразу на русском языке, для выхода введите - 0';
        let enTr = 'Введите фразу на английском языке, для выхода введите - 0';
        let err = 'Вы ни чего не ввели из необходимых значений -  1,2 или 3';
        let lang = '';

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.__log(ans);

        this.rl.on('line', (answer) => {
            switch (answer) {
                case '0':
                    this.rl.close();

                    break;
                case '1':
                    lang = 'ru-en';

                    this.rl.close();

                    this.__log(rusTr);
                    this.__trans(lang);
                    break;
                case '2':
                    lang = 'en-ru';

                    this.rl.close();

                    this.__log(enTr);
                    this.__trans(lang);

                    break;
                default:
                    this.__log(err);
                    this.rl.close();

                    break;
            }
        });
    }

    /**
     * Выводит в консоль необходимую фразу.
     * @param {string} sentence - фраза.
     */
    __log(sentence) {
        console.log(sentence);
    }

    /**
     * Обрабатывает пользовательский ввод текста.
     * @param {string} language - условие: с какого на какой язык выполнять перевод.
     */
    __trans(language) {
        this.translate = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.translate.on('line', (answer) => {
            let str = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
            let key = '******';
            let text = encodeURIComponent(answer);
            let lang = language;

            if (answer === '0') {
                this.translate.close();
            } else {
                this.__request(str, key, text, lang);
            }
        });
    };

    /**
     * Выполняет POST запрос на перевод текста.
     * @param {string} str - адрес запроса.
     * @param {string} key - ключ.
     * @param {string} text - введенный пользователем текст.
     * @param {string} lang - направление перевода.
     * @private
     */
    __request(str, key, text, lang) {
        request({
            method: 'POST',
            uri: str + '?key=' + key + '&text=' + text + '&lang=' + lang,
            json: true,
        }, (err, resp, body) => {
            if (!err && resp.statusCode == 200) {
                console.log('перевод - ' + body.text[0]);
                console.log('Введите фразу на русском языке, для выхода введите - 0');
            }
        });
    };
}

let translate = new Translater();
translate.init();