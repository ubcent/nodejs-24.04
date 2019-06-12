const express = require('express');
const mongoose = require('mongoose');
const consolidate = require('consolidate');
const path = require('path');
const session = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const PORT = 13013;

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(session({ keys: ['testingServer'] }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.resolve(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true });

const User = require('./models/user');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (user && user.checkPassword(password)) {
        delete user.password;
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.use(new FacebookStrategy({
    clientID: '687343025036707', //FACEBOOK_APP_ID
    clientSecret: 'f0f030262371f3c3e9f22901296b4b4a', //FACEBOOK_APP_SECRET
    callbackURL: `http://localhost:${PORT}/auth/facebook/callback`
},
    async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ facebookId: profile.id });
        if (user) {
            delete user.password;
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
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

const redirestions = {
    successRedirect: '/user',
    failureRedirect: '/auth'
};

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', redirestions));

app.post('/auth', passport.authenticate('local', redirestions));

const mustBeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
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

app.listen(PORT, () => {
    console.log(`Server has been started (port ${PORT})`);
})