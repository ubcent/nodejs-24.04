const api = 'AIzaSyDdpCYK5-xZ461bTB-UzOG9rvp4T13C58U';
const googleTranslate = require('google-translate')(api);
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const readline = require('readline');
const util = require('util');
const read = util.promisify(fs.readFile);

// googleTranslate.translate(strings, source, target, (err, res)=>{
//     console.log("Spanish :>", res.translatedText);
// });
// googleTranslate.translate(strings, target, (err, res)=>{
//     console.log("Spanish :>", res.translatedText);
// });

// googleTranslate.getSupportedLanguages(function(err, languageCodes) {
//     console.log(languageCodes);
//     // => ['af', 'ar', 'be', 'bg', 'ca', 'cs', ...]
// });

class turboTranslate extends EventEmitter{
    constructor(){
        super();
        this.targetLanguage = undefined;
        this.texttoTranslate = undefined;
        this.languagesList = [];

        process.nextTick(()=> this.emit('start'));
    }
    getLanguagesList(){
        read('./googleTranslateSupportedLanguagesList.json', 'utf-8')
            .then(
                data=>{
                    let listdata = JSON.parse(data);
                    console.log(listdata.title);
                    Object.entries(listdata.list).forEach(([value, key])=> {
                        console.log(value, key);
                        this.languagesList.push({value, key});
                    });
                    this.emit('readyToGetUserInputs'); //полсе получения списка идем в получение данных от пользователя
                },
                err=>{
                    console.log(err);
                }
            )
            .catch(err=>
            console.log(err)
        );


    }
    getUserInputs(el){
        console.log('Привет! Это консольный переводчик Google, \nвыбери пожалуйста язык на который ты хочешь выполнить перевод из списка выше и введи его символы (2 знака) или exit для выхода.');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.on('line', line=>{
            if(line === 'exit'){
                rl.close();
                this.emit('exit', {
                    status: 'exit',
                })
            } else{
                if (this.targetLanguage === undefined){ // Получем значение кода целевого языка
                    if (this.languagesList.some(item => item.key === line)){
                        this.targetLanguage = line;
                        console.log('Пожалуйста введите текст для перевода и нажмите Enter или введите exit для выхода.');
                        // this.emit('readyToGetTextToTranslate');
                    } else{
                        console.log('Вы ввели неверный символ языка, попробуйте еще раз или введите exit для выхода.');
                    }
                } else{ // Получем текст для перевода, петляем сюда после каждого ответа гугла
                    this.texttoTranslate = line;
                    this.emit('readyToSendRequest',{
                        text: this.texttoTranslate,
                        target: this.targetLanguage,
                    });
                }

            }
        })
    }
    sendRequest(text, target){
        console.log(`Your chosen language is: '${target}', and your text to translate: '${text}'`);

        googleTranslate.translate(text, target, (err, res)=>{
         console.log("Translation :>", res.translatedText);
        });
        this.emit('requestSent');
        this.texttoTranslate = undefined;
    }

}
const newturboTranslate = new turboTranslate();

newturboTranslate
    .on('start', event=>{ // Стартуем с json'а т.к. googleTranslate.getSupportedLanguages не дает полного назвнаия языка
    newturboTranslate.getLanguagesList();
    })
    .on('readyToGetUserInputs', event=>{
        newturboTranslate.getUserInputs();
    })
    .on('readyToSendRequest', event=>{
        let {text, target} = event;

        newturboTranslate.sendRequest(text, target);
    })
    .on('requestSent', event=>{
        console.log('requestSent');
    })
    ;

