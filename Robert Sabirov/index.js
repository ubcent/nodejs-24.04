const cursor = require('./cursorAnsi');
const https = require('https');
const cheerio = require('cheerio');

cursor.writeGreen('testing ');
cursor.writeGreenLn('string1');
cursor.writeGreenLn('testing string2');

cursor.writeRed('testing ');
cursor.writeRedLn('string1');
cursor.writeRedLn('testing string2');

cursor.writeBlue('testing ');
cursor.writeBlueLn('string1');
cursor.writeBlueLn('testing string2');

////////////////////////////////////////////////////////
console.log('\n\n\n');
////////////////////////////////////////////////////////

const urlString = 'https://geekbrains.ru/events';
let countDataSize = 0;
let page = null;

cursor.writeBlue('Url: ');
cursor.writeGreenLn(urlString);

https.get(urlString, (res) => {
    cursor.writeBlue('Status Code: ');
    cursor.writeGreenLn("" + res.statusCode);
    cursor.writeBlueLn('Headers:');
    cursor.writeGreenLn(JSON.stringify(res.headers, null, 4));

    res.on('data', (data) => {
        countDataSize += data.length;
        page += data;
    });

    res.on('close', () => {
        cursor.writeBlueLn('\nTotal Data Size:');
        cursor.writeGreenLn('\t' + countDataSize);

        const parser = cheerio.load(page);

        cursor.writeBlueLn('\nTopics:');
        const topics = parser('.gb-event-info__title a');
        for (let i = 0; i < topics.length; i++) {
            cursor.writeGreenLn('\t' + cheerio(topics.get(i)).text());
        }
    })

}).on('error', (e) => {
    cursor.writeRedLn(e.stack);
});