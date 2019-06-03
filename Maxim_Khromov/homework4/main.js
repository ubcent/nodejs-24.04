const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const templating = require('consolidate');

const routes = require('./routes/routes.js');

const port = 3000;

app.engine('hbs', templating.handlebars);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

routes(app);

app.listen(port, () => console.log(`App is listenning port: ` + JSON.stringify(port)));