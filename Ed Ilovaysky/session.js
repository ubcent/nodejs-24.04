//npm i cookie-parser cookie-session

const express = require('express');
const cookie = require('cookie-parser');
const session = require('cookie-session');

const app = express();

app.use(cookie());
app.use(session({ keys: ['secret'] }));

app.use((req, res) => {
  let n = req.session.views || 0;
  req.session.views = ++n;

  res.end(`${n} views`);
});

app.listen(4444, () => {
  console.log('Server has been started on 4444!');
});
