
const cheerio = require('cheerio');
const request = require('request');
// const readline = require('readline');


request('https://news.mail.ru/', (err, res, html) => {
  if(!err || res.statusCode === 200) {
    console.log('test-good');
    const $ = cheerio.load(html);
    for(let i = 0; i<=5 ; i++) {
      console.log($('.list__text').eq(i).text(), '\n');
    }
    
  } else {
    console.log('err');
  }
})


