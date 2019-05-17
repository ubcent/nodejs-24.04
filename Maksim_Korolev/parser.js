'use strict';

const request = require('request');
const cheerio = require('cheerio');

request('https://120.su/', (err, req, html) => {
    if (!err && req.statusCode === 200) {
        const $ = cheerio.load(html);
        for (let i = 0; i < 10; i++) {
            console.log(`Новость: ${i + 1}\n ${$('.entry-title').eq(i).text()}\n`);
            console.log($('.entry-content').eq(i).find('p').text() + '\n');
        }

    } else {
        console.log('Error: ' + err);
    }
});