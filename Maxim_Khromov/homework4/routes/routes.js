const appRouter = function (app) {
    const newsSetting = {
        apiKey: 'apiKey=c66ae4a42de04c80a8d61cc6040662cb',
        language: 'country=ru',
        newsAmount: 10,
    }

    app.get("https://newsapi.org/v2/top-headlines?" +
        "country=ru&" +
        "apiKey=c66ae4a42de04c80a8d61cc6040662cb", (req, res) => {

        });

    app.get('/', (req, res) => {
        res.render('hello', {
            title: 'Hello World!'
        });
    });
}

module.exports = appRouter;