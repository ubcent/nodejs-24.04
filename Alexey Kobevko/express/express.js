/*jshint esversion: 8 */

const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

const sources = {
    'mk.ru': {
        url: 'https://www.mk.ru/news/', 
        selector: '.news_list>li',
    },
};

app.get('/', async (req, res) => {
    res.render('newsBox');
});

app.post('/news', async (req, res) => {

    const news = await getNews(req.body);
    res.render('mkRu', news);
});

async function getNews(obj) {

    return new Promise((resolve, reject) => {

        const news = [];
        const url = sources[obj.source].url;
        const selector = sources[obj.source].selector;
        const count = obj.count;

        request(url, (err, req, html) => {

            if (!err && req.statusCode === 200) {

                const $ = cheerio.load(html);

                $(selector).each((i, elem) => {
                    news.push(
                        {
                            title: $(elem).text(), 
                            link: $(elem).find('a').attr('href')
                        });
                });
            }
        });
        news.slice(0, count);
        resolve(news);
    });
}

app.listen(8888, () => {
    console.log('Server has been started!');
});
