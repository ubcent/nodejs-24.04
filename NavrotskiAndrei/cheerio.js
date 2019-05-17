const request = require('request');
const cheerio = require('cheerio');
const colors = require('colors');

colors.setTheme({
	custom: ['red', 'underline']
});

request('http://www.pisatoday.it/notizie/tutte/', (err, res, html) => {
	if(!err){
		const $ = cheerio.load(html);
		console.log('PISATODAY:'.custom);
		for(let i = 1, n = 18; i < 11; i++, n++){
			console.log(`${i}.`,$('.link').eq(n).text().green);
		}
	} else {
		console.log(err);
	}
});