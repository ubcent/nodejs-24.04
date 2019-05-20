const request = require('request');
const cheerio = require('cheerio');

request('https://thenextweb.com/latest/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        grabbing(body);
    }
});

function grabbing(page) {
    const $ = cheerio.load(page);
    console.log('\nLatest Articles from TheNextWeb.com:\n')
    $('.story-title a').map((i, item) => `${i + 1})${$(item).text()}`).get().forEach(item => {
        item = item.replace(/\s{2,100}/g, ' ');
        item = item.replace(/\n/g, '');
        console.log(item)
    })

}


