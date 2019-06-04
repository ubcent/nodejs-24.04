 const request = require('request');

 const newsApiSettings = {
     apiKey: 'apiKey=c66ae4a42de04c80a8d61cc6040662cb',
     language: 'ru',
     page: '1',
 };

 const languageList = [
    'ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'se', 'ud', 'zh', 
 ];

 const appRouter = function (app) {

     app.get('/', (req, res) => {

         const newsApiUrl = `https://newsapi.org/v2/top-headlines?language=${newsApiSettings.language}&${newsApiSettings.apiKey}&page=${newsApiSettings.page}`;

         request(newsApiUrl, (err, response, body) => {
             if (!err && response.statusCode === 200) {
                 const newsApiBody = JSON.parse(body);

                 (async function () {
                     const articles = [];

                     const getNewsTitles = await newsApiBody.articles.map(article => {
                         articles.push(article);
                     });
                     res.render('hello', {
                         filter: newsApiSettings,
                         article: articles,
                         languageList: languageList,
                     });

                 })().catch(e => {
                     console.error(e)
                 })

             } else {
                 return response.statusCode;
             };
         });

     });

     app.post('/', (req, res) => {
         newsApiSettings.language = req.body.language;
         res.redirect('/');
     });
 }

 module.exports = appRouter;