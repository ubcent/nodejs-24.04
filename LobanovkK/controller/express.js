const express = require('express');
const path = require('path');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, '../views'))

app.use('/public', express.static(path.resolve(__dirname, '../views/css/style.css')));

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/lenta', async (req, res) => {
    const params = await requestNews('https://lenta.ru/', '.js-top-seven .item a');
    res.render('news.hbs', params);
})

app.get('/ria', async (req, res) => {
   const params = await requestNews('https://ria.ru/', '.cell-list__item .cell-list__item-title');
   res.render('news.hbs', params);
});

app.listen(8888, () => console.log('Server started'));

const requestNews = (url, selector) => {
    request(url, (err, req, body) => {
        if (!err && req.statusCode === 200)  {
            const $ = cheerio.load(body);
            const news = $(selector);
            const arr = {};
            arr.news = news.map((item, idx) => news.eq(idx).text);
            return arr;
        }
    })
}