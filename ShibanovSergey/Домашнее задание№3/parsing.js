var request = require('request');
var cheerio = require('cheerio');

request('http://www.rbc.ru/', function (error, response, html) {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        for (let i = 0; i <= 14; i++) {
           let stroke =  $('.main__feed__title').eq(i).text();
            console.log(stroke);
        }
    }
});