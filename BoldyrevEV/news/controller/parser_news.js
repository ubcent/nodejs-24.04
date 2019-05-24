const request = require('request');
const cheerio = require('cheerio');

function requestNews (url, selector) {
    let arr = [];

    request(url, (err, req, html) => {
        if (!err && req.statusCode == 200) {
            let $html = cheerio.load(html);
            let news = $html(selector);

            for (let i = 0; i < news.length; i++) {
                arr.push(news.eq(i).text());
            }
        }

        console.log(arr);
    });
}

requestNews('https://lenta.ru/', '.js-top-seven .item a');


request('https://lenta.ru/', (err, req, html) => {
    if (!err && req.statusCode == 200) {
        let $html = cheerio.load(html);
        let news = $html('.js-top-seven .item a');

        for (let i = 0; i < news.length; i++) {
            // console.log(news.eq(i).text());
        }
    }
});

request('https://ria.ru/', (err, req, html) => {
    if (!err && req.statusCode == 200) {
        let $html = cheerio.load(html);
        let news = $html('.cell-list__item .cell-list__item-title');

        for (let i = 0; i < news.length; i++) {
            // console.log(news.eq(i).text());
        }
    }
});

request('https://aif.ru/', (err, req, html) => {
    if (!err && req.statusCode == 200) {
        let $html = cheerio.load(html);
        let news = $html('.news_list li a');

        for (let i = 0; i < news.length; i++) {
            // console.log(news.eq(i).text());
        }
    }
});