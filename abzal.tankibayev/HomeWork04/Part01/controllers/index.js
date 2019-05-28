"use strict";

const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const request = require('request');
const cheerio = require('cheerio');

const app = express();
const PORT = 8888;
const HOST = `http://localhost`;
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../Views'));

app.set('css', express.static(__dirname + '../css'));

app.get('/', (req, res) => {
    res.render('main.hbs');
});
app.get('/css', (req, res) => {
    res.render('styles.css');
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