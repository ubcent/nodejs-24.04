const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname));

app.get('/(:time)?', async (req, res) => {
    const news = await requestNews(req.params.time);

    res.render('news', { news });
});

app.listen(8888, () => {
    console.log('Server has been started.')
});

function requestNews(time) {
    return new Promise((resolve, reject) => {
        let news = [];

        request('https://vc.ru/' + (time ? `top/${time}` : ''), (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                news = $('.feed__item').map(function () {
                    return {
                        title: $(this).find('h2').text().trim(),
                        author: $(this).find('.entry_header__subsite__author').text(),
                        text: $(this).find('p').text().trim(),
                    }
                }).get();
            }

            resolve(news);
        });
    })
}
