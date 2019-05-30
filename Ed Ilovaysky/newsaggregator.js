const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const consolidate = require("consolidate");
const request = require("request");
const cheerio = require("cheerio");

var cliChoce;
var category = "";
var newsArrPol = [];
var newsArrEco = [];
var isPolitic = false;
var isEconomic = false;
var isSport = false;

function checkPolitic() {
  isPolitic = !isPolitic;
}

app.engine("hbs", consolidate.handlebars);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

app.use("/public", express.static(path.resolve(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(` <div class="news-category">
        <form method="post">
            <p>Выберите категорию новостей:
                <select name="category">
                    <option>ПОЛИТИКА</option>
                    <option>ЭКОНОМИКА</option>
                </select>
            </p>
            <p>Выберите количество новостей:
                <select name="count">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </p>
            <input type="submit" value="Отправить"></p>
        </form>
    </div>`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  cliChoce = req.body;
  console.log(cliChoce);
  category = cliChoce.category;
  let arr = [];
  if (category === "ПОЛИТИКА") {
    let count = parseInt(cliChoce.count);
    for (let i = 0; i < count; i++) {
      arr.push(newsArrPol[i]);
    }
    console.log("polit");
    res.redirect("/news");
  } else if (category === "ЭКОНОМИКА") {
    let count = parseInt(cliChoce.count);
    for (let i = 0; i < count; i++) {
      arr.push(newsArrEco[i]);
    }
    res.redirect("/news");
  }
  app.get("/news", (req, res) => {
    res.render("newsview", { news: arr });
  });
  console.log(category);
  next();
});

async function getPolitic() {
  request("https://news.mail.ru/politics/", (err, req, html1) => {
    let newsTime = [];
    let newsSource = [];
    let newsTitle = [];
    let newsBody = [];
    let newsHref = [];
    if (!err && req.statusCode === 200) {
      const $ = cheerio.load(html1);
      for (let i = 2; i < 12; i++) {
        let valueTitle = $(".newsitem__title-inner")
          .eq(i)
          .text();
        newsTitle.push(valueTitle);
      }
      for (let i = 3; i < 13; i++) {
        let valueBody = $(".newsitem__text")
          .eq(i)
          .text();
        newsBody.push(valueBody);
      }
      for (let i = 3; i < 23; i += 2) {
        let valueTime = $(".newsitem__param")
          .eq(i)
          .text();
        newsTime.push(valueTime);
      }
      for (let i = 5; i < 25; i += 2) {
        let valueSource = $(".newsitem__param")
          .eq(i)
          .text();
        newsSource.push(valueSource);
      }
      for (let i = 3; i < 13; i++) {
        let valueHref = $(".newsitem__title.link-holder")
          .eq(i)
          .attr("href");
        newsHref.push(valueHref);
      }
    }
    for (let i = 0; i < 10; i++) {
      totalNewsPol = {
        time: newsTime[i],
        source: newsSource[i],
        title: newsTitle[i],
        body: newsBody[i],
        href: "https://news.mail.ru" + newsHref[i]
      };
      newsArrPol.push(totalNewsPol);
    }
  });
}

async function getEconomic() {
  request("https://news.mail.ru/economics/", (err, req, html2) => {
    let newsTime = [];
    let newsSource = [];
    let newsTitle = [];
    let newsBody = [];
    let newsHref = [];
    if (!err && req.statusCode === 200) {
      const $ = cheerio.load(html2);

      for (let i = 2; i < 12; i++) {
        let valueTitle = $(".newsitem__title-inner")
          .eq(i)
          .text();
        newsTitle.push(valueTitle);
      }
      for (let i = 3; i < 13; i++) {
        let valueBody = $(".newsitem__text")
          .eq(i)
          .text();
        newsBody.push(valueBody);
      }
      for (let i = 4; i < 24; i += 2) {
        let valueTime = $(".newsitem__param")
          .eq(i)
          .text();
        newsTime.push(valueTime);
      }
      for (let i = 2; i < 12; i++) {
        let valueSource = $(".newsitem__param.js-ago")
          .eq(i)
          .text();
        newsSource.push(valueSource);
      }
      for (let i = 3; i < 13; i++) {
        let valueHref = $(".newsitem__title.link-holder")
          .eq(i)
          .attr("href");
        newsHref.push(valueHref);
      }
    }
    for (let i = 0; i < 10; i++) {
      totalNewsEco = {
        time: newsTime[i],
        source: newsSource[i],
        title: newsTitle[i],
        body: newsBody[i],
        href: "https://news.mail.ru" + newsHref[i]
      };
      newsArrEco.push(totalNewsEco);
    }
  });
}
getPolitic();
setTimeout(() => {
  console.log(newsArrPol[0]);
}, 3000);
getEconomic();
setTimeout(() => {
  console.log(newsArrEco[0]);
}, 5000);

app.listen(8888, () => {
  console.log("Server has been started!");
});
