const express = require('express'); //-save
const app = express();
const bodyParser = require('body-parser');
//const templating = require('consolidate');
const hbs = require('express-handlebars');
const path = require('path');

const router = require('./router');
const config = require('./config');

//Setup handlebars
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'template',
    layoutsDir: __dirname + '/views',
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Setup the app
app.use(express.static(path.join(__dirname, '/views/')));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

router(app);

app.listen(config.port, () => console.log(`App is listenning port: ` + JSON.stringify(config.port)));