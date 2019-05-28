const request = require('request');
const cheerio = require('cheerio');

request('https://ria.ru/', (err, req, body) => {
  if ( !err && req.statusCode === 200) {
    const $ = cheerio.load(body);
    const feeds = $('.cell-list__item');
    const news = [];

    feeds.each(idx => {
      const text = feeds.eq(idx).find('.cell-list__item-title').text();
      const time = feeds.eq(idx).find('.elem-info__date').text();

      news.push({
        body : text,
        timeNews : time
      })
    })

    console.log(news);
  }
})