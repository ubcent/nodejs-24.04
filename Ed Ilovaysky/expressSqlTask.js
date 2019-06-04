const path = require("path");
const express = require("express");
const consolidate = require("consolidate");

const app = express(); // CREATING EXPRESS-APP OBJECT

//SWITCH ON  CONSOLIDATE WITH SEMANTIC TEMPLATE WICH IS HANDLEBARS AND CONFIG IT
app.engine("hbs", consolidate.handlebars); //РЕГИСТРИРУЕМ ШАБЛОНИЗАТОР В ПРИЛОЖЕНИИ
app.set("view engine", "hbs"); //УКАЗЫВАЕМ ШАБЛОНЫ ПО УМОЛЧАНИЮ
app.set("views", path.resolve(__dirname, "views")); //УКАЗЫВАЕМ ПУТЬ К НАШИМ VIEWS

// BODY-PARSER

app.use(express.json());
app.use("/public", express.static(path.resolve(__dirname, "public")));
//app.use(express.urlencoded());

app.listen(8888, () => {
  console.log("Server has been started!");
});
