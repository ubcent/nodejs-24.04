const http = require("http");
const request = require("request");

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Disposition": "inline",
        "Content-Type": "text/plain; charset=utf-8"
    });

    request(
        "https://newsapi.org/v2/top-headlines?" +
        "country=ru&" +
        "apiKey=c66ae4a42de04c80a8d61cc6040662cb",
        (err, response, body) => {
            if (!err && response.statusCode === 200) {
                const newsApiBody = JSON.parse(body);
                let newsTitles = '';

                for (let i = 0; i < (newsApiBody.totalResults - 14); i++) { // Почему-то c api приходит на 14 статей меньше, чем указано
                    newsTitles += JSON.stringify(newsApiBody.articles[i].title) + '<br>';
                }

                res.write(newsTitles, () => {
                    console.log("Someone's here");
                });

                res.end();
            }
        }
    );
});

server.listen(3000);
console.log("Server is launched. Port: 3000");

/* request('https://newsapi.org/v2/top-headlines?' +
    'country=ru&' +
    'apiKey=c66ae4a42de04c80a8d61cc6040662cb', (err, response, body) => {
        console.log(response);
    });  */