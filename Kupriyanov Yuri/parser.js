const request = require('request');
const cheerio = require('cheerio');

siteParser('https://news.ru/category/rossiya/', 'a.title');
siteParser('https://lenta.ru', 'div.item.article');

function siteParser(URL, markerText) {
    request(URL, (err, req, html) => {
        if(!err && req.statusCode === 200) {
            const $ = cheerio.load(html);
            $(markerText).each( function() {
                console.log($(this).text().trim());
            });               
        }
    })
}