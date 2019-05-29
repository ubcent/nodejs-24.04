'use strict';

const request = require('request');
const cheerio = require('cheerio');

export const newsData = {
	news120: {
		title: null,
		content: null,
	},

	newsAnimal: {
		title: null,
		content: null,
	},
};

function getParsNews(newsData) {
	request('https://120.su/', (err, req, html) => {
		if (!err && req.statusCode === 200) {
			const $ = cheerio.load(html);
			newsData.news120.title = $('.entry-title');
			newsData.news120.content = $('.entry-content').find('p');
		} else {
			console.log('Error: ' + err);
		}
	});

	request('http://goodnewsanimal.ru/', (err, req, html) => {
		if (!err && req.statusCode === 200) {
			const $ = cheerio.load(html);
			newsData.newsAnimal.title = $('.newsTitle').find('a');
			newsData.newsAnimal.content = $('.newsMessage');
		} else {
			console.log('Error: ' + err);
		}
	});
}
