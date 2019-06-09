 const request = require('request');
 const express = require('express');
 const router = express.Router();
 const Stopwatch = require('statman-stopwatch');
 const mongoose = require('mongoose');
 const Lap = mongoose.model('Lap');

 router.get('/', (req, res) => {
     Lap.find((err, docs) => {
         if (!err) {
             res.render('./stopwatch/stopwatch', {
                 title: 'Jira Stopwatch',
                 list: docs,
             });
         } else {
             console.error(`Error in recieving laps: ${err}`);
         }
     });

 });

 router.post('/', (req, res, next) => {
     insertRecord(req, res);
     res.redirect('/');
 });


 function insertRecord(req, res) {
     const lap = new Lap();
     lap.time = req.body.timerValue;
     lap.save((err, doc) => {
         if (!err) {
             console.log(lap);
         } else {
             console.error(err);
         }
     });
 }

 module.exports = router;