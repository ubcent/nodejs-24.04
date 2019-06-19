// подключение express
const express = require('express');
// подключение path
const path = require('path');
// consolidate handlebars
const consolidate = require('consolidate');


// создаем объект приложения
const app = express();


const users = {
    '1' : {
        name : 'Vasia',
        online : true,
    },
    '2' : {
        name : 'Kolya',
        online : false,
    },
};

// зарегистрируем в express шаблонизатор consolidate
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

// Если у пользователя есть права доступа то пропскает, если нет то проиходит редирект на страницу авторизации.
app.use((req, res, next) => {
    user.access ? next() : res.redirect('/auth');
});


// body-parser - в случае старой версии express - app.use(bodyParser.json());
app.use(express.json()); // парсер запроса

// Промежуточный обработчик.
app.use(function(request, response, next){
    console.log(request.url);
    console.log("Middleware 1");
    next();
});

//передача содержимого папки
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Промежуточный обработчик.
app.use(function(request, response, next){
    console.log("Middleware 2");
    next();
});

//Общий обработчик для маршрута '/'.
app.all ('/', (request, response, next)=> {
    console.log('Common handler');
    next();
});

// определяем обработчик для маршрута '/'.
app.get('/', (req, res) => {
    console.log('Exact handler');
    res.send('<h2>Выбери страницу с которой хочешь почитать новости!</h2>');
});

// определяем обработчик для маршрута '/users'.
app.get('/users', (req, res) => {
    res.send(`Hello users`);
});

// определяем обработчик для маршрута '/users/:id'.
app.get('/users/:id', (req, res) => {
    res.render('news.hbs.hbs', users[req.params.id]);
});

app.get('*', (req, res) => {
    res.send(`Error`);
});

// req.body появится после парсера запросов
app.post('/users', (req, res) => {
    console.log(req.body);
    res.send(`OK`);
});

app.listen(8888, ()=>{
    console.log('Server started');
});