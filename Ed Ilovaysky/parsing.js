// npm i cheerio который распарсит html
const request = require('request');
const cheerio = require('cheerio');

request(
  "https://www.banki.ru/products/currency/cash/irkutsk/",
  (err, req, html) => {
      if (!err && req.statusCode === 200) {
          const $ = cheerio.load(html);
          console.log($)
          console.log('Курс доллара к рублю: ', $('.currency-table__large-text').eq(1).text());
      }
  }
);