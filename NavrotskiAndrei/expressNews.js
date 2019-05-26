const express = require('express');
const path = require('path');
const consolidate = require ('consolidate');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

const pisatoday = {
	'1':{
		title: 'PISATODAY:',
		news: []
	},
};

request('http://www.pisatoday.it/notizie/tutte/', (err, res, html) => {
	if(!err){
		const $ = cheerio.load(html);
		for(let i = 1, n = 18; i < 11; i++, n++){
			pisatoday["1"].news.push($('.link').eq(n).text());
		}
	} else {
		console.log(err);
	}
});


app.get('/', (req, res) => {
	res.render('home', {title: 'PISATODAY:'})
});
app.get('/news/:id', (req, res) => {
	res.render('pisaNews', pisatoday[req.params.id])
});
app.get('*', (req, res) => {
	res.send(`ERROR`)
});


app.listen(8888, () => {
	console.log('server running')
});