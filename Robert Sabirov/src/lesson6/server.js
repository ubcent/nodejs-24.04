const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const app = express();

app.use(cookie());
app.use(session({ keys: ['secret'] }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (user && user.checkPassword(password)) {
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
    const user = await User.findById(id);
    done(null, user);
});

app.get('/auth', (req, res) => {
    res.send('TODO: Auth form');

})

const authHandler = passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth'
})

app.post('/auth', authHandler);

const mustBeAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth');
    }
}

app.all('/user*', mustBeAuthenticated);

app.get('/user', (req, res) => {
    res.send('TODO: User profile');
})

app.get('/user/settings', (req, res) => {
    res.send('TODO: User settings');
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
})

app.listen(4444, () => {
    console.log('Server has been started (port 4444)');
})