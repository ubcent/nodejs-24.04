//require npm i passport passport-local

const express = require('express');
const cookie = require('cookie-parser');
const session = require('cookie-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const path = require('path');
const consolidate = require('consolidate');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:32769/users', { useNewUrlParser: true });
const User = require('./models/mongoUser');

const app = express();

//SWITCH ON  CONSOLIDATE WITH SEMANTIC TEMPLATE WICH IS HANDLEBARS AND CONFIG IT
app.engine('hbs', consolidate.handlebars); //REGISTRATE TEMPLETS IN APP
app.set('view engine', 'hbs'); //SET UP DELAULT TEMPLATES
app.set('views', path.resolve(__dirname, 'views')); //SET UP PATH TO OUR VIEWS

app.use(cookie());
app.use(session({ keys: ['secret'] }));
app.use(express.json()); //PREPARING DATA FOR PASSPORT

app.use(passport.initialize());
app.use(passport.session()); // DON'T USE IT IN OTHER AUTH METHODS LOCAL-STRATEGY ONLY!

//MAKE A FORM FOR REGISTRATION
app.get('/registration', (req, res) => {
  //res.send('TODO: Auth form');
  res.render('mongouserreg', {
    login: 'Введите Ваш логин',
    password: 'Введите Ваш пароль',
    value: 'Отправить',
  });
});

//REGISTRATE AND RECORDING NEW USER IN MONGO DB
app.post('/registration', async (req, res) => {
  let user = new User(req.body);
  user = await user.save();
  res.send('hello, ' + user);
});

//CHECKIN OUT PAIR LOGIN-PASSWORD
passport.use(
  new Strategy(async (login, password, done) => {
    const user = await User.findOne({ login });
    if (user && user.checkPassword(password)) {
      delete user.password; //DELET THE PASSWORD THAT IT CAN'T GET THE SESSION AND BE IN SECURE
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

//LIMITING QUANTITY OF INFO THAT WILL BE KEEPING INSIDE SESSION-RECORD BY ID ONLY
passport.serializeUser(async (user, done) => {
  done(null, user._id); //RECORDIN USER DY ID
});

passport.deserializeUser(async (id, done) => {
  const user = User.findById(id); //FIND THE USER BY HIS/HER ID
  done(null, user);
});

app.use(async (user, res) => {
  if (user) {
    res.redirect('Hello, ' + user.login);
  } else {
    res.redirect('/registration');
  }
  next();
});

//FETCH REQUESTS FROM USERS AND HANDLE IT
app.get('/auth', (req, res) => {
  //res.send('TODO: Auth form');
  res.render('mongouser', {
    login: 'Введите Ваш логин',
    password: 'Введите Ваш пароль',
    value: 'Отправить',
  });
});
//make hendler for POST from users
const authHendler = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth',
});
//handle POST from users
app.post('/auth', authHendler);

//GUARDING PAGES WHICH MUST HAME AUTH ACCESS ONLY
const mustBeAuthenticated = (req, res, next) => {
  if (req.user) {
    //if req returned user in req then go ferther
    next();
  } else {
    res.redirect('/auth');
  }
};

app.all('/user*', mustBeAuthenticated); //hendle all requests to any page begins with user

//MAKING ROUTING OF USERS PAGES
app.get('user', (req, res) => {
  res.send('TODO: User profile');
});

app.get('user/settings', (req, res) => {
  res.send('TODO: User settings');
});

//GIVE USERS POSSIBILITY TO LOGOUT
app.get('user', (req, res) => {
  req.logout();
  res.redirect('/auth');
});

app.listen(4444, () => {
  console.log('Server has been started on 4444!');
});
