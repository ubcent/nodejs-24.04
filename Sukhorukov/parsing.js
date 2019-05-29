const request = require('request');
const cheerio = require('cheerio');

request('https://www.lemonde.fr/international/', (err, req, html) => {
    if (!err && req.statusCode === 200) {
        const $ = cheerio.load(html)

        console.log(`Новости: \n`);
        for (let i = 0; i<=10; i++) {
            let title = $('#river .teaser__link').eq(i).text();
            let text = $('#river .teaser__desc').eq(i).text();
            console.log(`${title} \n ${text}`);
        }
    }
});