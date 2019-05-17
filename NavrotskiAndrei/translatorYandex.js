const request =  require('request');
const url = require('url');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class Translator {
	constructor(text, key = 'trnsl.1.1.20190517T102753Z.13f81bc398e9e1aa.509a1837279fd9a7593036c9f53ec2db90a2a030'){
		this.text = text,
		this.key = key
	}
	requestYandex(url){
		request(url,( err, res, body) => {
			if (!err) {
				const  item = JSON.parse(body);
				console.log(item.text[0]);
			} else {
				console.log(err)
			}
		});
	}
	urlParse(){
		const params = url.parse('https://translate.yandex.net/api/v1.5/tr.json/translate?');
		delete params.search;
		params.query = {
			key: this.key,
			text: this.text,
			lang: 'en-ru'
		};
		this.requestYandex(url.format(params))
	}
}

console.log('Введите текст на английском языке и нажмите Enter.\nДля выхода наберите exit');
rl.on('line', (answer) => {
	if(answer === 'exit'){
		rl.close();
	} else {
		const translator = new Translator(answer);
		translator.urlParse()
	}
});