const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const consolidate = require('consolidate');

const app = express();

app.use(express.json());
app.use(cors());

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:32768/users', {
    useNewUrlParser: true
});

const User = require('./models/user');

// client - domain.com
// server(api) - api.domain.com

// OPTIONS -> api.domain.com
// server(api) -> Access-Control-Allow-Origin: domain.com

function verifyToken(req, res) {
    if (req.headers.authorization) {
        let user;
        const [type, token] = req.headers.authorization.split(' ');
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                res.status(401).json({
                    message: 'Wrong token'
                });
            }
            user = decoded.name;
        });
        return user;
    } else {
        res.status(401).json({
            message: 'No token present'
        });
    }
}



// app.get('/', verifyToken, async (req, res) => {
//     console.log(req.headers.authorization);
//     res.render('loginPage');
// })

app.get('/',(req, res) => {
    res.render('loginPage');
})


app.post('/auth', (req, res) => {
    if (req.headers.authorization) res.send('1234')
    
    // if (req.headers.authorization) {
    //     const user = verifyToken(req, res);
    //     console.log(user)
        
    //     res.render('userPage')
    // } 

});

// app.post('/auth', async (req, res) => {
//     const {
//         username,
//         password
//     } = req.body;

//     // const UserToken = req.headers.authorization;

//     let user = await User.find({
//         username: username,
//         password: password
//     });
//     user = user[0];

//     if (user && username === user.username && password === user.password) {
//         const token = jwt.sign({
//             name: user.username
//         }, 'secret');
//         res.json({
//             token
//         });
//     } else {
//         res.status(401).json({
//             message: 'Wrong credentials'
//         });
//     }
// });

app.all('/users*', verifyToken);

app.get('/users', async (req, res) => {
    console.log(req.user);
    // const users = await User.find();
    res.json([]);
});

// app.get('/users/:id', async (req, res) => {
//   const user = await User.findById(req.params.id);

//   res.json(user);
// });

app.post('/users', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();

    res.json(user);
});

// full update
// app.put('/users/:id', async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body);

//   res.json(user);
// });

// partial update
// app.patch('/users/:id', async (req, res) => {
//   const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });

//   res.json(user);
// });

app.listen(8888, () => {
    console.log('Server has been started!');
});

/*
 * Аутенификация. Результат - токен (2)
 * access_token
 * refresh_token
 */