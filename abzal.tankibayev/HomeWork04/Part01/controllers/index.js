"use strict";

const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const request = require('request');
const cheerio = require('cheerio');

const app = express();
const PORT = 8888;
const HOST = `http://localhost`;

app.use(express.static('../part01'));

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'));

app.get('/', (req, res) => {
    res.render('main.hbs');
});

app.get('/tengrinews', (req, res) => {
    requestNews(res, 'https://tengrinews.kz/', '#lenta_block .item');
});

app.get('/bnews', (req, res) => {
    requestNews(res, 'https://bnews.kz/', 'ul.list span.text.blck');
});

app.get('/today', (req, res) => {
    requestNews(res, 'http://today.kz/', '.feed__list .feed__item.-icon .feed__content');
});

app.listen(PORT, ()=>{
    console.log(`Server started on ${HOST}:${PORT}`);
});

function requestNews (res, url, selector) {
    request(url, (err, req, html) => {
        if (!err && req.statusCode == 200) {
            const $html = cheerio.load(html);
            const news = $html(selector);
            const arr = {};
            arr.news = [];

            /* for (let i = 0; i < news.length; i++) {
                arr.news.push(news.eq(i).text());
            } */

            arr.news.array.forEach(element => {
                element.push(news.eq(i).text());
            });

            res.render('news.hbs', arr);
        }
    });
}