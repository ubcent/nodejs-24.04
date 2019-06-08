const express = require('express'); //-save
const app = express();
const bodyParser = require('body-parser');
const templating = require('consolidate');
const path = require('path');

const router = require('./router.js');
const config = require('./config.js');

//Setup handlebars
app.engine('hbs', templating.handlebars);
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