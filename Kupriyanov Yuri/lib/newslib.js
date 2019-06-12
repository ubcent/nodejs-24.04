const request = require('request');
const cheerio = require('cheerio');

async function siteParser(url, markerText) {

    let news = [];

    const $ = await sendRequest(url);
    $(markerText).each(function () {
        news.push({content: $(this).text().trim()});
    });  

    return news;
}

async function sendRequest(url) {
    return new Promise((resolve, reject) => {
      request(url, (err, req, body) => {
        if(err) {
          reject(err);
        }
        resolve(cheerio.load(body));
      });
    })
}

module.exports = { 
    siteParser, 
    sendRequest,
};