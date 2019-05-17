const readline = require('readline');
const url = require('url');
const request =  require('request');

class Translator {
	constructor(key = 'trnsl.1.1.20190517T102753Z.13f81bc398e9e1aa.509a1837279fd9a7593036c9f53ec2db90a2a030'){
		this.key = key
	}
	requestYandex(url){
		request(url,( err, res, body) => {
			if (!err) {
				console.log(body);
			} else {
				console.log(err)
			}
		});
	}
	urlParse(text){
		const params = url.parse('https://translate.yandex.net/api/v1.5/tr.json/translate?');
		delete params.search;
		params.query = {
			key: this.key,
			text: text,
			lang: 'en-ru'
		};
		this.requestYandex(url.format(params))
	}
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const translator = new Translator();
console.log('Введите текст на английском языке и нажмите Enter\nДля выхода наберите exit');
rl.on('line', (answer) => {
	if(answer === 'exit'){
		rl.close();
	} else {
		translator.urlParse(answer)
	}
});