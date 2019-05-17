const request = require('request');
const cheerio = require('cheerio');

request('http://www.pisatoday.it/notizie/tutte/', (err, res, html) => {
	if(!err){
		const $ = cheerio.load(html);
		console.log('PISATODAY:\n1.', $('.link').eq(18).text());
		console.log('2.',$('.link').eq(19).text());
		console.log('3.',$('.link').eq(20).text());
		console.log('4.',$('.link').eq(21).text());
		console.log('5.',$('.link').eq(22).text());
		console.log('6.',$('.link').eq(23).text());
		console.log('7.',$('.link').eq(24).text());
		console.log('8.',$('.link').eq(25).text());
		console.log('9.',$('.link').eq(26).text());
		console.log('10.',$('.link').eq(26).text())
	} else {
		console.log(err);
	}
});