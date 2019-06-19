const mysql = require("mysql");
const dbconfig = require('./config/dbconfig');
  
const connection = mysql.createConnection(dbconfig.getConnectionParams());

// Проверка установки соединения, проверка конфига
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

  // закрытие подключения
  connection.end(function(err) {
    if (err) {
      return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
  });