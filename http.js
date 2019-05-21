const https = require('https');

https.get('https://geekbrains.ru', (res) => {
  console.log('Response', res.statusCode);
}).on('error', (err) => {
  console.log('Error', err);
});