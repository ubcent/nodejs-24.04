const http = require('http');
http.get('https://geekbrains', (res) => {
    console.log('Response', res.statusCode);
}).on('error', (err) => {
    console.error('Error', err);
});

const https = require("https");
https
  .get("https://geekbrains", res => {
    console.log("Response", res.statusCode);
  })
  .on("error", err => {
    console.error("Error", err);
  });

