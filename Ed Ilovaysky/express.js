// npm i express
// npm i consolidate handlebars
//https://github.com/tj

const path = require("path");
const express = require("express");
const consolidate = require("consolidate");

const app = express(); // CREATING EXPRESS-APP OBJECT

//EMULATE SOME DB
const users = {
  "1": {
    name: "Mr.Smith",
    online: true
  },
  "2": {
    name: "Mr Doe",
    online: false
  }
};

//SWITCH ON  CONSOLIDATE WITH SEMANTIC TEMPLATE WICH IS HANDLEBARS AND CONFIG IT
app.engine("hbs", consolidate.handlebars); //РЕГИСТРИРУЕМ ШАБЛОНИЗАТОР В ПРИЛОЖЕНИИ
app.set("view engine", "hbs"); //УКАЗЫВАЕМ ШАБЛОНЫ ПО УМОЛЧАНИЮ
app.set("views", path.resolve(__dirname, "views")); //УКАЗЫВАЕМ ПУТЬ К НАШИМ VIEWS

// BODY-PARSER

app.use(express.json());
app.use("/public", express.static(path.resolve(__dirname, "public")));
//app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log("Middleware1");
  next();
});

//MIDDLEWARE FOR ANY REQUEST
/* 
app.use((req, res, next) => {
  // перехватываем запрос
  if (user.access) {
    // проверяем есть ли у пользователя доступ
    next(); // если есть то next() отправляет запрос дальше следующему обработчику или мидлвару
  } else {
    res.redirect("/auth"); // если нет прав, то отправляем на страницу авторизации например
  }
}); */

//ROUTING
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  res.send(`Hello, USERS`);
});

app.get("/users/:id", (req, res) => {
  //res.send(`Hello, User ${req.params.id}`);
  res.render("user", users[req.params.id]);
});

app.get("/users/:id/:name", (req, res) => {
  res.send(`Hello, User ${req.params.id} ${req.params.name}`);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("OK from POST request");
});

app.listen(8888, () => {
  console.log("Server has been started!");
});
