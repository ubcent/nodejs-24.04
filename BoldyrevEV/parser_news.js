const request = require('request');
const cheerio = require('cheerio');

request('https://lenta.ru/', (err, req, html) => {
    if (!err && req.statusCode == 200) {
        let $html = cheerio.load(html);
        let news = $html('.js-top-seven .item a');

        for (let i = 0; i < news.length; i++) {
            console.log(news.eq(i).text());
        }
    }
});