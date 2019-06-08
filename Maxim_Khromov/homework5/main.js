const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const templating = require('consolidate');
const path = require('path');

//Setup handlebars
app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//Setup the app
app.use(express.static(pathjoin(__dirname, '../views')));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

router(app);

app.listen(port, () => console.log(`App is listenning port: ` + JSON.stringify(port)));