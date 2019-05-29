const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const iconv = require('iconv-lite');

const app = express();


app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const posts = await news(req.body.check);
    res.render('news', {
        news: posts,
    });
})

async function news(site) {
    const arrNews = new Promise((resolve, reject) => {
        let posts = [];
        if (site === 'bash') {
            request('https://bash.im/', (err, req, html) => {
                if (!err && req.statusCode === 200) {
                    const $ = cheerio.load(html);
                    for (let i = 1; i <= 10; i++) {
                        let element = {};
                        element.href = 'http://bash.im' + $('.quote__frame .quote__header_permalink').eq(i).attr('href');
                        element.name = $('.quote__frame .quote__header_permalink').eq(i).text();
                        element.date = $('.quote__frame .quote__header_date').eq(i).text().trim();
                        element.text = $('.quote__frame .quote__body').eq(i).text().trim();
                        posts.push(element);
                    }
                }
                resolve(posts);
            });
        }
        if (site === 'pikabu') {
            request({
                    uri: 'http://pikabu.ru/best',
                    method: 'GET',
                    encoding: 'binary'
                },
                (err, req, html) => {
                    if (!err && req.statusCode === 200) {
                        const $ = cheerio.load(iconv.decode(html, 'win1251'));
                        for (let i = 0; i < 10; i++) {
                            let element = {};
                            element.href = $('.story .story__title a').eq(i).attr('href');
                            element.name = $('.story .story__title a').eq(i).text();
                            element.date = $('.story .story__datetime').eq(i).text().trim();
                            element.text = $('.story .story-block_type_text').eq(i).text().trim();
                            posts.push(element);
                        }
                    }
                    resolve(posts);
                });
        }
    });
    const result = await arrNews;
    return result;
};

app.listen(3000, () => {
    console.log('Server has been started!');
});