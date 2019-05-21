//ПОДКЛЮЧАЕМ ТРЕБУЕМЫЕ МОДУЛИ
const request = require("request");
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ОБЪЯВЛЯЕМ ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
var translateYandexApiKey =
  "trnsl.1.1.20190521T011558Z.be03708c69b1e639.4c35ecfa5a13f25a151066ab9565f6b88f70ad0e";
var yandexApi;

//ПРОВЕРЯЕМ ЯЗЫК С КОТОРОГО И НА КАКОЙ ПЕРЕВОДИМ
function checkLang(answer) {
  var regexpRu = /[а-яА-ЯЁё]/.test(answer);
  if (regexpRu === true) {
    return (yandexApi = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateYandexApiKey}&lang=ru-en&text=`);
  } else {
    return (yandexApi = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateYandexApiKey}&lang=en-ru&text=`);
  }
}

//ЗАПУСКАЕМ ПРОГРАММУ
console.log("Введите слово, фразу или текст, который необходимо перевести: ");

rl.on("line", answer => {
  if (answer) {
    checkLang(answer);
    console.log("\nВы ввели: " + answer);
    var frase = encodeURI(answer);
    //console.log(lang);
    request(yandexApi + frase, (err, req, body) => {
      if (!err && req.statusCode === 200) {
        var answerObj = JSON.parse(body);
        var translate = answerObj.text;
        console.log("Перевод: " + translate[0]);
      }
      console.log(
        "\nДля выхода из программы наберите: 'Ctrl + c'\n\na, eсли хотите продолжить, то \nвведите слово, фразу или текст, который необходимо перевести: \n"
      );
    });
  }
});
