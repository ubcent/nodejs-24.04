const express = require('express');
const path = require('path');
const consolidate = require ('consolidate');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

const titles = ['cronaca','politica','sport','attualita'];

class ParserNews{
	constructor(titles){
		this.titles = titles;
		this.pisatoday =  {};
	}
	requestNews(value){
		request(`http://www.pisatoday.it/${value}`, (err, res, html) => {
			if(!err){
				const $ = cheerio.load(html);
				for(let i = 18; i < 28; i++){
					this.pisatoday[value].news.push($('.link').eq(i).text());
				}
			} else {
				console.log(err);
			}
		});
	}
	createObjectNews(){
		this.titles.forEach(value => {
			this.pisatoday[value]= {
				title : value,
				news:[]
			};
			this.requestNews(value)
		});
		return this.pisatoday
	}
}
const parserNews = new ParserNews(titles);
const objectNews = parserNews.createObjectNews();


app.get('/', (req, res) => {
	res.render('home', {
		name: 'PISATODAY',
		title: titles
	})
});
app.get('/news/:id', (req, res) => {
	res.render('pisaNews', objectNews[req.params.id])
});
app.get('*', (req, res) => {
	res.send(`ERROR`)
});


app.listen(8888, () => {
	console.log('Server has been started!')
});