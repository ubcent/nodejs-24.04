const path = require('path');

const express = require('express');
const consolidate = require('consolidate');

const app = express();

const request = require('request');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'view'));

const nav = {
    link1:'News',
    link2: 'Translater'
};
const api = [{
        id: 1,
        link: "https://lenta.ru/parts/news"
    }]

app.use(express.json());


app.get('/', (req, res) => {
    res.render('home', nav);
});
app.get('*/news', (req, res) => {
    res.render('news', {});
});


app.post('*/read', (req, res) => {

    request('', (err, response, html) => {
        if(!err && response.statusCode === 200) {

            res.render('read', {text: html});
        }  
    })
});

app.listen(8080, () => {
  console.log('Server has been started at port 8080!');
}); 