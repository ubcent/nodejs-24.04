var ansi = require('ansi');
var axios = require('axios');

var cursor = ansi(process.stdout);
var couter = 2;

axios.get (`https://jsonplaceholder.typicode.com/users`)
    .then ((response) => {
        for (var i = 0; i < couter; i++) {
            var usersData = response.data[i];

            cursor
                .bg.green()
                .hex('#6bea28').bold().underline()

            console.log(usersData);
            cursor.reset();
        }
    });