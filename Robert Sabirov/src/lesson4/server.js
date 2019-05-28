const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());

app.get('/', (req, res) => {
    res.render('main', {
        title: '',
        topics: []
    });
})

app.get('/1', async (req, res) => {
    const Parser = require('./grabbers/TheNextWebGrabber');
    const parser = new Parser();
    res.render('main', {
        title: 'TheNextWeb',
        topics: await parser.getTopics()
    })
})

app.get('/2', async (req, res) => {
    const Parser = require('./grabbers/HabrahabrGrabber');
    const parser = new Parser();
    res.render('main', {
        title: 'Habrahabr',
        topics: await parser.getTopics()
    })
})

app.all('*', (req, res) => {
    res.status(404).json('Ошибка 404. Запрашиваемая страница не найдена')
})

app.listen(8888, () => console.log(`Server started with port 8888`));
