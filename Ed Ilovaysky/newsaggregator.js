const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const consolidate = require("consolidate");
const request = require("request");
const cheerio = require("cheerio");

let news = [];
let category;
let count;

app.engine("hbs", consolidate.handlebars);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(async (req, res, next) => {
  const chosenCat = req.body.category;
  let mapping = {
    ПОЛИТИКА: "politics",
    ЭКОНОМИКА: "economics"
  };
  category = mapping[chosenCat];
  console.log(category);
  getNewsByCategory(category);
  count = parseInt(req.body.count);
  news = await getNewsByCategory(category);
  news = news.slice(0, count);
  console.log(news);
  res.redirect("/news");
  next();
});

app.get("/news", async (req, res) => {
  res.render("newsview", { news: news });
});

function getNewsByCategory(category) {
  return new Promise((resolve, reject) => {
    request(`https://news.mail.ru/${category}/`, (err, req, html) => {
      const newsSource = [];
      const newsTitle = [];
      const newsBody = [];
      if (!err && req.statusCode === 200) {
        const $ = cheerio.load(html);
        for (let i = 1; i < 10; i++) {
          let valueTitle = $(".newsitem__title-inner")
            .eq(i)
            .text();
          newsTitle.push(valueTitle);
        }
        for (let i = 1; i < 10; i++) {
          let valueBody = $(".newsitem__text")
            .eq(i)
            .text();
          newsBody.push(valueBody);
        }
        for (let i = 1; i < 10; i += 2) {
          let valueSource = $(".newsitem__param")
            .eq(i)
            .text();
          newsSource.push(valueSource);
        }
        for (let i = 0; i < 10; i++) {
          totalNews = {
            source: newsSource[i],
            title: newsTitle[i],
            body: newsBody[i]
          };
          news.push(totalNews);
        }
      }
      return resolve(news);
    });
  });
}

app.listen(8888, () => {
  console.log("Server has been started at 8888!");
});
