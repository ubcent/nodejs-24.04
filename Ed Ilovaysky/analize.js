var fs = require("fs");
function getMaxRow(arr) {
  var max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i];
  }
  return max;
}
fs.readFile("./log.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Ошибка при прочтении файла");
  }
  var loseRows = data.split(1);
  var vinRows = data.split(0);

  console.log("Сыграно раундов: " + data.length);
  console.log("Выиграно раз: " + data.match(/1/g).length);
  console.log("Выиграно раз подряд маскимально: " + getMaxRow(vinRows).length);
  console.log("Проиграно раз: " + data.match(/0/g).length);
  console.log(
    "Проиграно раз подряд максимально: " + getMaxRow(loseRows).length
  );
  console.log(
    "Процент выигранных раундов: " +
      (data.match(/1/g).length / data.length) * 100 +
      " %"
  );
  console.log(
    "Процент проигранных раундов: " +
      (data.match(/0/g).length / data.length) * 100 +
      " %"
  );
  console.log(
    "Соотношение угаданых к неугаданым: " +
      data.match(/1/g).length / data.match(/0/g).length
  );
});
