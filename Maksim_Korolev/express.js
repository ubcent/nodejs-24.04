
const express = require('express');
const consolidate = require('consolidate');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.listen(8888, () => {
    console.log('Server has been started!');
});
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/news120', async (req, res) => {
    const news = await getNews120();
    res.render('news120', {news});
});

app.get('/animalnews', async (req, res) => {
    const news = await getAnimalNews();
    res.render('animalNews', {news});
});

function getNews120() {
    const news = [];
    return new Promise((resolve, reject) => {
        request('https://120.su/', (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                for (let i = 0; i < 10; i++) {
                    let newsData = {};
                    newsData.title = $('.entry-title').eq(i).text();
                    newsData.content = $('.entry-content').find('p').eq(i).text();
                    news.push(newsData);
                }
            } else {
                console.log('Error: ' + err);
            }
            resolve(news);
        });
    });
}

function getAnimalNews() {
    const news = [];
    return new Promise((resolve, reject) => {
        request('http://goodnewsanimal.ru/', (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                for (let i = 0; i < 10; i++) {
                    let newsData = {};
                    newsData.title = ($('.newsTitle').find('a').eq(i).text());
                    newsData.content = ($('.newsMessage').eq(i).text());
                    news.push(newsData);
                }
            } else {
                console.log('Error: ' + err);
            }
            resolve(news);
        });
    });
}
