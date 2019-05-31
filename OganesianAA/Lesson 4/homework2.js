const path = require('path');
const express = require('express'); //подключаем express
const app = express(); // создаем express приложение
const consolidate = require('consolidate'); // подключаем поддержку шаблонизаторов
const cheerio = require('cheerio');
const request = require('request');
const chromeLauncher = require('chrome-launcher');

class News {
    constructor() {
        this.init();
        this.start();
        this.news = {};
    }
    init() {
        app.use(express.json());//body-parser since v4
        app.use(express.urlencoded({extended: true}));// Parse URL-encoded bodies (as sent by HTML forms)
        app.engine('hbs', consolidate.handlebars); // выбираем функцию шаблонизации для hbs
        app.set('view engine', 'hbs'); // используем .hbs шаблоны по умолчанию
        app.set(path.resolve(__dirname, 'views')); //указываем директорию для загрузки шаблонов
    }
    middleware(){
        app.use((req, res, next)=>{
            if (req.body.news){
                switch (req.body.news.source) {
                    case 'RiaNews':
                        this.requestNews('https://ria.ru/', '.cell-list__item','.cell-list__item-title', req.body.news.quantity);
                        setTimeout(()=>res.redirect('/news'),2000);

                        break;
                    case 'RT':
                        this.requestNews('https://www.rt.com/', '.main-promobox__item','.main-promobox__link',req.body.news.quantity);
                        setTimeout(()=>res.redirect('/news'),2000);
                        break;
                    default:
                        res.redirect('/main');
                }
            }
            next();
        });
    }
    requestNews(link, block, element, quantity){
        request(link, (err,res)=>{
            if(!err && res.statusCode === 200){
                const $ = cheerio.load(res.body);
                let data = $(block).find(element).toArray().slice(0,quantity);
                console.log(data.length);
                this.news.title = 'News block';
                let p = new Promise((res, rej)=>{
                    this.news.news = {...[...Object.entries(data).map(([key, value]) =>
                            Object.assign({},{value:value.children[0].data})
                        )]};
                    res();
                });
                p
                    .then(()=>{
                        console.log('news are ready');
                    })
                    .catch(err=>console.log(err))
            }
        });
    }
    get(){
        app.get('/main', (req,res)=>{
            console.log('main');
            res.render('newsMainPage',{});
        });
        app.get('/news', (req,res)=>{
            console.log('news');
            res.render('news', this.news);
        });
        //ловим 404
        app.get('*', (req, res)=>{
            res.send('<h1 class="404">404 page not found</h1>');
        });
    }
    post(){
        //логируем все пост запросы
        app.post('/', (req, res)=>{
            console.log(req.body);
            // res.send('OK');
            // res.end();
            if (req.body.news){
                // console.log(req.body.news.source);
            }
        });
    }
    listen(){
        //стартурем сервер и слушаем порт
        app.listen(8890, ()=>{
            console.log('server has been started');
        });
    }

    chromeLanuncher(){
        chromeLauncher.launch({
            startingUrl: 'http://localhost:8890/main'
        }).then(chrome => {
            console.log(`Chrome debugging port running on 8890`);
        });
    }
    start(){
        this.middleware();
        this.get();
        this.post();
        this.listen();
        // this.chromeLanuncher();
    }
}


const newNews = new News();

// сделать автоматическое открытие окна по нужному пути