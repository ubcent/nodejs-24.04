 const request = require('request');

 const appRouter = function (app) {
     app.get('/', (req, res) => {
         res.render('./components/stopwatch/stopwatch', {
             title: 'Jira Stopwatch',
         });
     });
 }

 module.exports = appRouter;