import './parser.js';
import { newsData } from './parser.js';

const express = require('express');
const consolidate = require('consolidate');
const path = require('path');

path.dirname

const app = express();
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {});
});
