 const request = require('request');

const appRouter = function (app) {
    const newsSetting = {
        apiKey: 'apiKey=c66ae4a42de04c80a8d61cc6040662cb',
        language: 'country=ru',
        newsAmount: 10,
    }

    app.get('/', (req, res) => {

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
    
                    res.render('hello', {
                        title: 'newsTitles'
                    });
                }
            }
        );

    });
}

module.exports = appRouter;