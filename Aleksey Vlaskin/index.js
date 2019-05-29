const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const consolidate = require('consolidate');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/1c', (requ, res) => {
    request('http://1c.ru', (err, req, html) => {
        if (!err && req.statusCode === 200) {
            const $ = cheerio.load(html);
            const $news = $('.span6').eq(0).children('dl').children();

            const $datesArray = $news.filter((index, elem) => {
                return elem.tagName === 'dt';
            });

            const datesArray = $datesArray.map((index, elem) => {
                return elem.children[0].children[0].data;
            }).get();

            const $newsArray = $news.filter((index, elem) => {
                return elem.tagName === 'dd';
            });

            const newsItems = $newsArray.map((index, elem) => {
                let strnews = ($(elem).text().replace(/(\s{22,})+/g, ''));
                strnews = strnews.replace(/(\s{21,})+/g, '\n');
                strnews = strnews.replace(/(курсы:)+/g, 'курсы:\n')+'\n'; //Курсы всегда оглашаются списками, оформим
                return {
                    newsDate: datesArray[index],
                    newsText: strnews,
                };
            }).get();
            
            const newsObj = {
                newsTitle: 'Новости фирмы 1С',
                newsItems: newsItems,
            };
            res.render('head');
            res.render('news', newsObj);
        };                
    });
});

app.listen(8048, () => {
    console.log('Server has been started!');
});
