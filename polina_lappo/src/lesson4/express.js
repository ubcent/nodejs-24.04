const path = require('path');

const express = require('express');
const consolidate = require('consolidate');
const handlebars = require('handlebars');

var cookieParser = require('cookie-parser');

const app = express();

const request = require('request');
const cheerio = require('cheerio');

app.engine('hbs', consolidate.handlebars);
handlebars.registerHelper('list', function(context, options) {
    var ret = '<div>';
  
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret  + options.fn(context[i]);
    }
  
    return ret + '</div>';
  });
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'view'));

const nav = {
    link1:'News'
};
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render('home', nav);
});

app.get('*/news', (req, res) => {
    let s1 = true;
    let s2 = false;
    if (req.cookies.source != '1') {
        s2 = true;
        s1 = false;
    }
    res.render('news', {sourceCount: req.cookies.sourceCount, source1: s1, source2: s2});
});


app.post('*/news', (req, res) => {

    res.cookie('source', req.body.source);
    res.cookie('sourceCount', req.body.sourceCount);

    const temp = {news: []};
  
    switch (req.body.source){
        case '1':
            request('https://lenta.ru/parts/news', (e, r, html) => {
                if(!e && r.statusCode === 200) {
                    const $ = cheerio.load(html);
                    for (let i = 0; i < req.body.sourceCount; i++) {
                        temp.news[i] = {
                            catalog: $('#more > div.item.news > div.info.item__info.g-date > a').eq(i).text(),
                            new: $('#more > div.item.news > div.titles > h3 > a').eq(i).text()
                        }
                    }
                    res.render('read', temp);
                }
            });
            break;
        case '2':
            request('https://www.newsru.com/allnews/', (e, r, html) => {
                if(!e && r.statusCode === 200) {
                    const $ = cheerio.load(html);
                    for (let i = 0; i < req.body.sourceCount; i++) {
                        temp.news[i] = {
                            catalog: $('.body-page-center-column > div.index-news-item > div.index-news-content > span.index-news-date > a').eq(i).text(),
                            new: $('.body-page-center-column > div.index-news-item > div.index-news-content > .index-news-title').eq(i).text()
                        }
                    }
                    res.render('read', temp);
                }
            });
            break;
        default: 
        console.log('error')
    }
    
});

app.listen(8080, () => {
  console.log('Server has been started at port 8080!');
}); 