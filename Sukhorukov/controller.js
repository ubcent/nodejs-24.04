const path = require('path');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const consolidate = require('consolidate');

const app = express();

app.engine('hbs', consolidate.handlebars);

app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:category', async (req, res) => {
    const category = req.params.category;

    const news = await getNewsByCategory(category);
    res.render('news', { news });
});

function getNewsByCategory(category){
    return new Promise((resolve, reject) => {
        const news = [];
        request(`https://www.lemonde.fr/${category}/`, (err, req, html) => {
            if (!err && req.statusCode === 200) {
                const $ = cheerio.load(html);
                for (let i = 0; i <= 10; i++) {
                    let title = $('#river .teaser__link').eq(i).text();
                    let text = $('#river .teaser__desc').eq(i).text();
                    news.push({
                        title: title,
                        text: text,
                    });
                }
            }
            resolve(news);
        });
    })
}

// Переход на 404 страницу
app.get('*', (req, res) => {
    res.send('404')
});

app.listen(8888, () => {
    console.log('Server has been started ...');
});