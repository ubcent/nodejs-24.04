const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const consolidate = require('consolidate');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/public', express.static(path.resolve(__dirname, 'public')));


function get1CNews() {
    return new Promise((resolve, reject) => {
        request('http://1c.ru', (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                const $news = $('.span6').eq(0).children('dl').children();

                const $datesArray = $news.filter((index, elem) => elem.tagName === 'dt');

                const datesArray = $datesArray.map((index, elem) => elem.children[0].children[0].data).get();

                const $newsArray = $news.filter((index, elem) => elem.tagName === 'dd');

                const newsItems = $newsArray.map((index, elem) => {
                    let strnews = ($(elem).text().replace(/(\s{22,})+/g, ''));
                    strnews = strnews.replace(/(\s{21,})+/g, '\n');
                    strnews = strnews.replace(/(курсы:)+/g, 'курсы:\n') + '\n'; //Курсы всегда оглашаются списками, оформим
                    return {
                        newsDate: datesArray[index],
                        newsText: strnews,
                    };
                }).get();
                resolve(newsItems);
            };
        });
    });
};

function getCrimeaNews() {
    return new Promise((resolve, reject) => {
        request('https://crimea.ria.ru/', (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                const datesArray = $('.b-index__newsfeed-item-time').map((index, elem) => $(elem).text().trim()).get();
                const newsArray = $('.b-index__newsfeed-item-title').map((index, elem) => $(elem).text().trim());
                const newsItems = newsArray.map((index, elem) => {
                    return {
                        newsDate: datesArray[index],
                        newsText: elem,
                    };
                }).get();                
                resolve(newsItems);
            };            
        });
    });
};

app.get('/1c', async (requ, res) => {
    const newsItems = await get1CNews();
    const newsObj = {
        newsTitle: 'Новости фирмы 1С',
        newsItems: newsItems,
    };
    res.render('news', newsObj);    
});

app.get('/crimea', async (requ, res) => {
    const newsItems = await getCrimeaNews();
    const newsObj = {
        newsTitle: 'Новости Крыма',
        newsItems: newsItems,
    };
    res.render('news', newsObj);     
});

app.get('*', (req, res) => res.send('404'));

app.listen(8050, () => {
    console.log('Server has been started!');
});
