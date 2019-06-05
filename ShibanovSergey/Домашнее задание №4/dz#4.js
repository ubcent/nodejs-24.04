const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const app = express();

var request = require('request');
var cheerio = require('cheerio');


const listNews = [];

// request('http://www.rbc.ru/', function (error, response, html) {
//     if (!error && response.statusCode === 200) {
//         const $ = cheerio.load(html);
//         for (let i = 0; i <= 10; i++) {
//             // news.title = $('.main__feed__title').eq(i).text();
//             listNews.push({title:$('.main__feed__title').eq(i).text()});
//             // listNews.push(news);
//             // console.log(news.number);
//             console.log(listNews[i]);
//         }
//     }
// });

function getNews() {
    return new Promise((resolve, reject) => {
        request('http://www.rbc.ru/', function (error, response, html) {
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);
                for (let i = 0; i <= 10; i++) {
                     listNews.push({title: $('.main__feed__title').eq(i).text()});
                }
            }
            resolve(listNews);
        });
    });
}

var newsHot = ' ';
request('https://echo.msk.ru/news/2435011-echo.html', function (error, response, html) {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        newsHot = $('.conthead.news h1').eq(0).text()
        console.log(newsHot);
    }
});
var newsDirt = ' ';
var titleDirt = '';

request('https://lenta.ru/news/2019/05/29/dirtyoil/', function (error, response, html) {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        titleDirt = $('h1').eq(0).text();
        newsDirt = $('.b-text.clearfix.js-topic__text p').text();
        console.log(titleDirt);
        console.log(newsDirt);
    }
});

app.get('/', (req, res) => {
    res.send(`Hello World!!!`);
});

app.get('/users', (req, res) => {
    res.send(`Hello World, USERS!!!`);
});

app.listen(8888, () => {
    console.log("Server has been started!");
});

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/users', async function (request, response) {
    const list = await getNews();
    response.render('ex', {
        mainNews: newsHot,
        NEW: newsDirt,
        TitleDirtyOil: titleDirt,
        list,
    });
});



