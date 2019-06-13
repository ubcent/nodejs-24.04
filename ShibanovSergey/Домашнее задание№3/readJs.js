const fs = require("fs");

fs.appendFile("dz-node-txt.txt", "Привет!", function(error){
    if(error) throw error; // если возникла ошибка
    console.log(" Содержимое файла:");
    let data = fs.readFileSync("dz-node-txt.txt", "utf8");
    console.log(data);  // выводим считанные данные
});
