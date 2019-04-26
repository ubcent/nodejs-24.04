const ansi = require('ansi');
const cursor = ansi(process.stdout);

cursor
    .grey()
    .bg.green()
    .write('Let\'s use axios a little bit. ')
    .write('We got here some data(json honestly) from jsonplaceholder.typicode.com.')
    .bg.reset()
    .reset()
    .write('\n');

const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        // console.log(response.data);
        response.data.map((item)=>{
            console.log(`Name: ${item.name}; Username: ${item.username}; Email: ${item.email}`);
        })
    })
    .then(()=>{
        cursor
            .grey()
            .bg.green()
            .write('Finita!')
            .bg.reset()
            .reset()
            .write('\n');
    })
    .catch(error => {
        console.log(error);
    });

