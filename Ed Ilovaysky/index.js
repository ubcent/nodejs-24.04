// index.js
/* console.log('Hello world!!!');

const ansi = require("ansi");

const cursor = ansi(process.stdout);

cursor
  .yellow()
  .bg.blue()
  .write("Hello world")
  .bg.reset()
  .reset()
  .write("\n");

  cursor.beep(); */

// модуль faker помогает создавать рандомные фейковые данные такие как имена пользователей
// адреса, номера телефонов и так далее... используется для разработки

const faker = require('faker');
//faker.locale = "ru";
let name = faker.name.findName();
console.log(name);
let email = faker.internet.email();
console.log(email);
let avatar = faker.internet.avatar();
console.log(avatar);
//let card = faker.helpers.createCard();
//console.log(card);
