const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../Views'));

app.get('/', (req, res) => {
    res.render('main.hbs');
});

app.get('/lenta', (req, res) => {
    requestNews(res, 'https://lenta.ru/', '.js-top-seven .item a');
});

app.get('/ria', (req, res) => {
    requestNews(res, 'https://ria.ru/', '.cell-list__item .cell-list__item-title');
});


app.get('/aif', (req, res) => {
    requestNews(res, 'https://aif.ru/', '.news_list li a');
});

app.listen(8888, ()=>{
    console.log('Server started');
});

function requestNews (res, url, selector) {
    request(url, (err, req, html) => {
        if (!err && req.statusCode == 200) {
            let $html = cheerio.load(html);
            let news = $html(selector);
            let arr = {};
            arr.news = [];

            for (let i = 0; i < news.length; i++) {
                arr.news.push(news.eq(i).text());
            }

            res.render('news.hbs', arr);
        }
    });
}