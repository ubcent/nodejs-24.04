const request = require('request');
const cheerio = require('cheerio');

request('https://www.banki.ru/products/currency/cash/sankt-peterburg/', (err, req, html) => {
  if(!err && req.statusCode === 200) {
    const $ = cheerio.load(html);
    console.log('Курс доллара', $('.currency-table__large-text').eq(1).text());
  }
})