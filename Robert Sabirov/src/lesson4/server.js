const path = require('path');
const express = require('express');
const consolidate = require('consolidate');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('main', {
        title: '',
        topics: []
    });
})

const TheNextWebGrabber = require('./grabbers/TheNextWebGrabber');
const HabrahabrGrabber = require('./grabbers/HabrahabrGrabber');
const parsers = {
    'TheNextWeb': (new TheNextWebGrabber()),
    'Habrahabr': (new HabrahabrGrabber())
}

app.post('/*', async (req, res) => {
    if (parsers.hasOwnProperty(req.body.src)) {
        res.render('main', {
            title: req.body.src,
            topics: await parsers[req.body.src].getTopics()
        });
    } else {
        res.status(404).json('Ошибка 404. Запрашиваемая страница не найдена');
    }
})

app.all('*', (req, res) => {
    res.status(404).json('Ошибка 404. Запрашиваемая страница не найдена')
})

app.listen(8888, () => console.log(`Server started with port 8888`));
