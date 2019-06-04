const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser =  require ('cookie-parser');
const path = require('path');
const lodash = require('lodash');

const task = require('./models/task');

const app = express();
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

const list = [
    { 
        name: 'lenta',
        URL: 'https://lenta.ru',
        markerText: 'div.item.article',
    },
    { 
        name: 'newsRU',
        URL: 'https://news.ru/category/rossiya/',
        markerText: 'a.title',
    },
];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

    res.render('index', {
        title: 'новости',
        list: list,
        tasks: await task.getAll(),
    });
});

app.get('/add', async (req, res) => {
    res.render('taskAdd', {
        title: 'Добавить задачу',
    });
});

app.post('/add', async (req, res) => {
    const newTask = req.body;
    const id = await task.add(newTask);
    res.redirect(`/task/${id}`);
});

app.get('/task/:id', async (req, res) => {
    const id = req.params.id;
    res.render('taskview', {
        title: `task ${id}`,
        task: await task.getByID(id),
    });
});

app.post('/task/:id', async (req, res) => {
    const id = req.params.id;
    const updateTask = req.body;
    await task.update(id, updateTask);
    res.redirect(`/`);
});

app.get('/remove/:id', async (req, res) => {
    const id = req.params.id;
    await task.remove(id);
    res.redirect('/');
});

let text = [{site: list[0].name}];
let cookie;

app.post('/', function(req, res) {
    text = req.body;
    res.redirect("/news");
    return text;
});

app.use(cookieParser());
app.use(function (req, res, next) {
    cookie = req.cookies;
    res.cookie('site', text.site, { maxAge: 10000000, httpOnly: true });
    next();
});

app.get('/news', async (req, res) => {
    
    let listItem = lodash.filter(list, { 'name': cookie.site } ).pop();
 
    if( listItem ) {
        newsName = listItem.name;
        const news = await siteParser(listItem.URL, listItem.markerText);
        res.render('news', {
            name: newsName,
            news: news,
        });
    }
    else {
        res.send('не удалось получить новости');
    }
     
});

app.listen(8888, () => {
    console.log('Server has been started!');
});

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
