const request = require("request");
const cheerio = require("cheerio");

request("https://russian.rt.com/news", (err, req, html) => {
  if (!err && req.statusCode === 200) {
    const $ = cheerio.load(html);
    console.log("RT - лента новостей")
    for (let i = 0; i < 10; i++) {
        let newsNumber = i +1;
      console.log(
          "Новость " + newsNumber,
        $(".card__summary_all-news")
          .eq(i)
          .text()
      );
    }
  }
});
