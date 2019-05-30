const request = require('request');
const cheerio = require('cheerio');

request('https://lenta.ru/parts/news', (err, res, html) => {
    if(!err && res.statusCode === 200) {
        const $ = cheerio.load(html);
        for (let i = 1; i <= 10; i++) {
            console.log('Раздел: ', $('#more > div.item.news > div.info.item__info.g-date > a').eq(i).text(), '\n',
                'Новость: ', $('#more > div.item.news > div.titles > h3 > a').eq(i).text(), '\n');
        }
    }
})