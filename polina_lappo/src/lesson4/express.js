const path = require('path');

const express = require('express');
const consolidate = require('consolidate');
const handlebars = require('handlebars');

var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:32768/todo', { useNewUrlParser: true });
const Task = require('./model/task');

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


// lesson 5 

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.render('tasks', {tasks: tasks});
});
  
app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.send(task)
});

app.post('/tasks', async (req, res) => {
    let task = new Task(req.body);
    task = await task.save();
    res.send(task)
});

app.put('/tasks', async (req, res) => {
    const task = await Task.updateOne({_id: req.body.id}, {$set: {newTask: req.body.updateTask}});
    res.send(task)
});

app.delete('/tasks', async (req, res) => {
    const task = await Task.deleteOne({_id: req.body.id});
    res.send(task)
});

const session = require('cookie-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const app = express();

app.use(cookie());
app.use(session({ keys: ['secret'] }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(async (username, password, done) => {
  const user = await User.findOne({username});
  if(user && user.checkPassword(password)) {
    delete user.password;
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = User.findById(id);
  done(null, user);
});

app.get('/auth', (req, res) => {
  res.send('TODO: Auth form');
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

app.listen(8080, () => {
  console.log('Server has been started at port 8080!');
}); 