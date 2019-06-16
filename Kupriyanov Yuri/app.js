const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const task = require('./models/task');
const user = require('./models/user');
const newslib = require('./lib/newslib');
const serverConfing = require('./config/server');

serverParams = serverConfing.getParams();

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ keys: ['secret'], site: 'lenta' }));

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(async (username, password, done) => {
  const authuser = await user.findOne(username);

  if(authuser && user.checkPassword(password)) {
    delete authuser.password;
    return done(null, authuser);
  } else {
    return done(null, false);
  }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const authuser = await user.getByID(id);
  done(null, authuser);
});

app.get('/auth', async (req, res) => {
  res.render('auth', {
        title: 'sign in',
    });
});

const authHandler = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth',
});

app.post('/auth', authHandler);

const mustBeAuthenticated = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect('/auth');
  }
}

app.all('/user*', mustBeAuthenticated);

app.get('/user', (req, res) => {
  res.send(`User profile: ${req.user.username} `);
});

app.get('/user/settings', (req, res) => {
  res.send('TODO: User settings: letter');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth');
});

app.get('/register', async (req, res) => {
    res.render('register', {
        title: 'Регистрация',
    });
});

app.post('/register', async (req, res) => {
    const newUser = req.body;
    const id = await user.add(newUser);
    res.redirect('/auth');
});

app.get('/users', async (req, res) => {

    res.render('users', {
        title: 'Список пользователей',
        users: await user.getAll(),
    });
});

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

app.use(function (req, res, next) {
    cookie = req.cookies;
    res.cookie('site', text.site, { maxAge: 10000000, httpOnly: true });
    next();
});

app.post('/', function(req, res) {
  text = req.body;
  res.cookie('site', text.site, { maxAge: 10000000, httpOnly: true });
  res.redirect("/news");
  return text;
});

app.get('/news', async (req, res) => {
  
    const listItem = list.filter( l => l.name === cookie.site)[0];
 
    if( listItem ) {
        newsName = listItem.name;
        const news = await newslib.siteParser(listItem.URL, listItem.markerText);
        res.render('news', {
            name: newsName,
            news: news,
        });
    }
    else {
        res.send('не удалось получить новости');
    }
     
});

app.listen(serverParams.port, () => {
    console.log(`Server has been started at port: ${serverParams.port}`);
});
