var ansi = require('ansi');
var axios = require('axios');

var cursor = ansi(process.stdout);
var couter = 2;


/**
 * Выводит необходиму информацию из запроса.
 * @param {string} url - строка адреса запроса.
 * @param {number} couter - счетчик для массива данных.
 */
function get (url, couter) {
    axios.get (url)
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
}

get (`https://jsonplaceholder.typicode.com/users`, couter);