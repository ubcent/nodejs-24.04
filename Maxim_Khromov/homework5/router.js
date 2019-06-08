 const request = require('request');

 const appRouter = function (app) {
     app.get('/', (req, res) => {
         res.render('template', {

         });
     });
 }

 module.exports = appRouter;