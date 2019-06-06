const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const templating = require('consolidate');
const path = require('path')

const routes = require('./routes/routes.js');

const port = 3000;

app.engine('hbs', templating.handlebars);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, '/views/public')));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

routes(app);

app.listen(port, () => console.log(`App is listenning port: ` + JSON.stringify(port)));