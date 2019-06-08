 const request = require('request');
 const Stopwatch = require('statman-stopwatch');
 // const sw = require('./views/components/stopwatch/stopwatch.js');

 const appRouter = function (app) {
     app.get('/', (req, res) => {

         res.render('./components/stopwatch/stopwatch', {
             title: 'Jira Stopwatch',
             //currentTime: currentTime,
         });

     });
 }

 module.exports = appRouter;