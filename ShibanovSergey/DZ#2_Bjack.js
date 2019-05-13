//Created by Sergey 13.05.2019 фойловая система

let namePlayer;
let totalPlayer = 0;
let totalDealer = 0;

const fs = require("fs");
//
// fs.appendFileSync('C:\\Users\\Admin\\Desktop\\Новая папка\\src\\node-write-stream-demo.txt');

// fs.appendFile('C:\\Users\\Admin\\Desktop\\Новая папка\\src\\node-write-stream-demo.txt',"Writing to a file using WriteStream:" + totalPlayer + "/" + totalDealer, function(error){
//     if(error) throw error; // если возникла ошибка
//     console.log("Запись файла завершена. Содержимое файла:");
// });

const readline = require("readline");

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

function getStatus() {
    let totalPlayer = 0;
    let totalDealer = 0;
    console.log( "y вашего соперника на руках: " + dealer +"  Что составляет " + getSum(dealer) + " очков.");
    if (getSum(player)>getSum(dealer)) {
        console.log("Вы победили");
        totalPlayer++;
    }else if (getSum(player)==getSum(dealer))    {
        console.log("Ничья!");
    } else  {
        console.log("Вы проиграли!");
        totalDealer++;
    }
    console.log("Total count: "+ totalPlayer + " / " + totalDealer);
    rl.close;
}
function getName() {
    rl.on('line', (cmd) => {
        // console.log("Здравствуйте," ,cmd);
        namePlayer = cmd;
        console.log("У вас на руках " + player + ", что составляет в сумме: " + getSum(player) + " очков.");
        console.log("Если хотите взять еще картру нажмите 'y', нажмите 'n' если считаете, что этого уже достаточно.");
        if (cmd === "y") {
            player.push(getCard());
            console.log(getSum("У вас на руках " + player + ", что составляет в сумме: " + getSum(player) + " очков."))
        } else if (cmd === "n") {
            console.log("y вашего соперника на руках: " + dealer + "  Что составляет " + getSum(dealer) + " очков.");
            if(getSum(player) >21) {
                console.log("У вас перебор. Вы проиграли!");
                totalDealer++;
            }
            else if (getSum(player) > getSum(dealer)||getSum(player)==21) {
                console.log("Вы победили");
                totalPlayer++;
            } else if (getSum(player) == getSum(dealer)) {
                console.log("Ничья!");
            } else {
                console.log("Вы проиграли!");
                totalDealer++;
            }
            console.log("Total count: " + totalPlayer + " / " + totalDealer);
            // rl.pause();
            var now = new Date();
            fs.appendFile('dz-node-txt.txt',"Текущее состоя-nние счета (игрок/комп): " + totalPlayer + "/" + totalDealer + " "+ now +"\n", function(error){
                if(error) throw error; // если возникла ошибка
                console.log("Запись файла завершена.");
            });
        }
    });
}
function pauseGame() {
    rl.on('pause') , ()=> {
        console.log("My pause");
    }
}
function continueGame() {
    rl.on('line') , (cmd1)=> {
        if(cmd1==='yes'){
            //добавить карту
            console.log("My pause");
            player.push(getCard());
        } else getStatus();
    }
}
function getCard() {
    let cards = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
// cards.length всего 9 значений, счет в массиве идет от 0 потому ставим -1
    return cards[Math.floor(Math.random() * cards.length)];
}
function getSum(arr) {
    let val;
    let sum = 0;
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] == "A") {
            arr[i] = 11;
        } else if (arr[i] == "J") {
            arr[i] = 2;
        } else if (arr[i] == "Q") {
            arr[i] = 3;
        } else if (arr[i] == "K") {
            arr[i] = 4;
        } else if (arr[i] == 6) {
            arr[i] = 6;
        } else if (arr[i] == 7) {
            arr[i] = 7;
        } else if (arr[i] == 8) {
            arr[i] = 8;
        } else if (arr[i] == 9) {
            arr[i] = 9;
        } else if (arr[i] == 10)
            arr[i] = 10;
    }
    for(var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
const dealer = [getCard(), getCard()];
const player = [getCard(), getCard()];
console.log("Введите ваше имя");
// do{
//     getName();
//     // getStatus();
//     // if(getSum(player)==21 || getSum(player)>21){
//     //     break;
//     // } else
//     // continueGame();
// // сдаем карту игроку либо прекращаем игру
// //     if (getStatus()) player.push(getCard());
// } while(rl.close);

getName();


// console.log("Хотите продолжить?");


