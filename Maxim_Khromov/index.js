const readline = require('readline');

const oneLinerJoke = require('one-liner-joke');

const ansi = require('ansi');
cursor = ansi(process.stdout);

let message = cursor
    .black()
    .bg.white()
    .write('Welcome to the joke generator. Type a tag to hear a joke. For example: "stupid"')
    .bg.reset()
    .reset()
    .write('\n');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(message, (tag) => {
    rl.close();
    console.log(`The joke for the tag "${tag}":\n`);
    const getRandomJoke = oneLinerJoke.getRandomJokeWithTag(tag);

    cursor.green();
    console.log(getRandomJoke.body);
    cursor.reset();


});