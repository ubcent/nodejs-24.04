const express = require('express');
const mongoose = require('mongoose');
const consolidate = require('consolidate');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

// app.use(cookie());
// app.use(session({ keys: ['testingServer'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.resolve(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true });

const User = require('./models/user');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(async (username, password, done) => {
    console.log(`In auth function: u - ${username}, p - ${password}`)
    const user = await User.findOne({ username });
    console.log(`user:`);
    console.dir(user);
    if (user && user.checkPassword(password)) {
        delete user.password;
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {

    console.log('deserializeUser')
    const user = await User.findById(id);
    done(null, user);
});

app.get('/', (req, res) => {
    res.render('loginPage');
})

app.get('/reg', (req, res) => {
    res.render('regPage');
})

app.post('/reg', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();

    res.send(user);
})

app.get('/auth', (req, res) => {
    res.render('loginPage');
})

const authHandler = passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth'
})

app.post('/auth', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth'
}));

const mustBeAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth');
    }
}

app.all('/user*', mustBeAuthenticated);

app.get('/user', (req, res) => {
    res.render('userPage', {
        user: req.user.name
    })
})

app.get('/user/settings', (req, res) => {
    res.send('TODO: User settings for ' + req.user.name);
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
})

app.listen(13013, () => {
    console.log('Server has been started (port 13013)');
})