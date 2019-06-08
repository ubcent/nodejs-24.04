const Stopwatch = require('statman-stopwatch');
const sw = new Stopwatch(true);

while (true) {
    document.getElementsByClassName('stopwatch__display').value = sw.time;
};

/* stw = {
    create: function () {
        const stopwatch = new Stopwatch();
    },

    start: function () {
        stopwatch.start();
    },

    pause: function () {
        stopwatch.split();
    },

    resume: function () {
        stopwatch.unsplit();
    },

    getTime: function () {
        stopwatch.time();
    },
}
 */
module.exports = sw;