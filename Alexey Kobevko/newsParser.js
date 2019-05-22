/*jshint esversion: 6 */

const request = require('request');
const cheerio = require('cheerio');
const ansi = require('ansi');

const cursor = ansi(process.stdout);

// request('https://www.banki.ru/products/currency/cash/moskva/', (err, req, html) => {
//     if(!err && req.statusCode === 200) {
//         const $ = cheerio.load(html);
//         console.log('Курс доллара:', $('.currency-table__large-text').eq(1).text());
//     }
// });

request('https://www.mk.ru/news/', (err, req, html) => {
    if (!err && req.statusCode === 200) {

        const $ = cheerio.load(html);

        for (let i = 0; i < 10; i++) {

            if (i === 0 || i % 2 === 0) {
                cursor
                    .black().bg.hex('#FF8000')
                    .write($('.news_list>li>a')
                    .eq(i).text()).reset().write('\n');
            }  else {
                cursor.black().bg.hex('#0000FF')
                    .write($('.news_list>li>a')
                    .eq(i).text()).reset().write('\n');
            }
        }
    }
});