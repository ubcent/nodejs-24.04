'use strict';

const request = require('request');
const cheerio = require('cheerio');


function getNews120() {
    const news = {
        title: null,
        content: null,
    };
    return new Promise((resolve, reject) => {
        request('https://120.su/', (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                news.title = $('.entry-title');
                news.content = $('.entry-content').find('p');
            } else {
                console.log('Error: ' + err);
            }
            resolve(news);
        });
    });
}

function getAnimalNews() {
    const news = {
        title: null,
        content: null,
    };
    return new Promise((resolve, reject) => {
        request('http://goodnewsanimal.ru/', (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                news.title = $('.newsTitle').find('a');
                news.content = $('.newsMessage');
            } else {
                console.log('Error: ' + err);
            }
            resolve(news);
        });
    });
}
