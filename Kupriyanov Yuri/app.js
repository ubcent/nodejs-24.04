const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const path = require('path');
const lodash = require('lodash');

const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const task = require('./models/task');
const user = require('./models/user');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ keys: ['secret'] }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(async (username, password, done) => {
  const user = await user.findOne(username);
  if(user && user.checkPassword(password)) {
    delete user.password;
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = user.findById(id);
  done(null, user);
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
  res.send('TODO: User profile');
});

app.get('/user/settings', (req, res) => {
  res.send('TODO: User settings');
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
    console.log(newUser);
    const id = await user.add(newUser);
    res.redirect('/auth');
});

app.get('/listusers', async (req, res) => {

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

app.post('/', function(req, res) {
    text = req.body;
    res.redirect("/news");
    return text;
});


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
