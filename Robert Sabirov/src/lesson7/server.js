const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const consolidate = require('consolidate');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const config = require('./config');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(session({ keys: ['testingServer'] }));

app.use(express.json());
app.use(cors());

app.use('/public', express.static(path.resolve(__dirname, 'public')));

mongoose.connect(`mongodb://${config.hostDb}:${config.portDb}/${config.dbName}`, { useNewUrlParser: true });

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

// app.get('/reg', (req, res) => {
//     res.render('regPage');
// })

// app.post('/reg', async (req, res) => {
//     let user = new User(req.body);
//     user = await user.save();

//     res.send(user);
// })

app.get('/auth', (req, res) => {
    res.render('loginPage');
})

const redirestions = {
    successRedirect: '/user',
    failureRedirect: '/auth'
};

// app.post('/auth', passport.authenticate('local', redirestions));

app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ name: 'Administrator', surname: '' }, 'secretString');
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Wrong credentials' });
    }
})

const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        const [type, token] = req.headers.authorization.split(' ');
        jwt.verify(token, 'secretString', (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Wrong token' });
            }
        });
    } else {
        res.status(401).json({ message: 'No token present' });
    }
}

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

app.listen(config.port, () => {
    console.log(`Server has been started (port ${config.port})`);
})