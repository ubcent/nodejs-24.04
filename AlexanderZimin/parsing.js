const request = require('request');
const cheerio = require('cheerio');

request('https://vc.ru/new', (err, req, html) => {
    if (!err && req.statusCode === 200) {
        const $ = cheerio.load(html);
        const feeds = $('.feed__item');
        const news = [];

        feeds.each(i => {
            const title = feeds.eq(i).find('h2').text().replace(/\s+/g,' ');
            const author = feeds.eq(i).find('.entry_header__subsite__author').text()
            const text = feeds.eq(i).find('p').text().replace(/\s+/g,' ');

            news.push({
                title: title,
                author: author,
                text: text
            });
        });

        console.log(news);
    }
});

