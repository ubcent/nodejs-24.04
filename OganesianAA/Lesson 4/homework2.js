const path = require('path');
const express = require('express'); //подключаем express
const app = express(); // создаем express приложение
const consolidate = require('consolidate'); // подключаем поддержку шаблонизаторов
const cheerio = require('cheerio');
const request = require('request');
const util = require('util');

class News {
    constructor() {
        this.body = undefined;
        this.source = '';
        this.arr = [];
        this.init();
        this.start();
        this.c = {};
    }
    init() {
        app.use(express.json());//body-parser since v4
        app.use(express.urlencoded({extended: true}));// Parse URL-encoded bodies (as sent by HTML forms)
        app.engine('hbs', consolidate.handlebars); // выбираем функцию шаблонизации для hbs
        app.set('view engine', 'hbs'); // используем .hbs шаблоны по умолчанию
        app.set('views', path.resolve(__dirname, 'views')); //указываем директорию для загрузки шаблонов
    }
    get(){
        //ловим 404
        app.get('*', (req, res)=>{
            res.send('default page 404 not found')
        });
        //ловим параметр из адресной строки
        app.get('/people/:id', (req,res)=>{
            console.log(req.params.id);
        });
    }
    post(){
        //логируем все пост запросы
        app.post('/', (req, res)=>{
            // console.log(req.body);
            // res.send('OK');
        });
    }
    middleware1(){
        app.use((req, res, next)=>{
            if (req.body.news){
                Object.entries(req.body.news).map(([value, key])=>{
                    console.log(value," : ", key);
                });
                next();
            }
        });
    }
    listen(){
        //стартурем сервер и слушаем порт
        app.listen(8890, ()=>{
            console.log('server has been started');
        });
    }
    render(view, datasource) {
        app.get('/main', (req, res)=>{
            res.render(view,datasource)
        });

    }
    getNews(){
        request('https://ria.ru/', (err,res)=>{
            if(!err && res.statusCode === 200){
                const $ = cheerio.load(res.body);
                let a = $('.cell-list__item').find('.cell-list__item-title').toArray(); //.text()
                // Object.entries(a).map(([key, value]) =>
                //     console.log(key, ', ',value.children[0].data)
                // );
                let arr = [Object.entries(a).map(([key, value]) =>
                    [value.children[0].data])]
                ;
                // arr.map(item => console.log(item));
                // this.c.dataset = {...Object.entries(a).map((item) =>
                //        item[1].children[0].data)
                // };

                // this.c.dataset = Object.assign({}, Object.entries(a).map((item) =>
                //     item[1].children[0].data));
                // console.log(this.c);
                let d = Object.assign({},arr);
                console.log(d);
            }
        });
    }
    start(){
        this.render('newsMainPage', {});
        this.middleware1();
        this.get();
        this.post();
        this.listen();
        this.getNews();
    }
}

// this.body = read('./people.json', 'utf-8')
//     .then(
//         data=>{
//             // let people = JSON.parse(data);
//             // app
//             //     .get('/', (req, res)=>{
//             //         res.render('people', people)
//             //     })
//             //     // .get('/people', (req, res)=>{
//             //     //     res.render('people', people)
//             //     // })
//             //     // .get('/users', (req, res)=>{
//             //     //     res.render('people', people)
//             //     // })
//             // ;
//
//         },
//         err=>{
//             console.log(err);
//         }
//     )
//     .catch(err=>
//         console.log(err)
//     );


const newNews = new News();