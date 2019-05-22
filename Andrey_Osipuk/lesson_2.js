const ansi = require('ansi');
const readline = require('readline');
const minimist = require('minimist');
const fs = require('fs');
const util = require('util');

const cursor = ansi(process.stdout);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const argv = minimist(process.argv.slice(2), {
    alias: {
        help: 'h',
        log: 'l'
    }
});
const writeFile = util.promisify(fs.writeFile);

if (argv.help) {
    cursor
        .write('Правила просты:')
        .write('\n')
        .write('Загадывайте орел или решка в виде цифр 1 или 0')
        .write('\n')
        .write('--log  -l Вести лог игры в файл')
        .write('\n')
        .write('Если файла нет, то он будет создан')
        .write('\n');
    rl.close();
} else {
    if (argv.log) {
        fs.stat(argv.log.toString(), (err, stats) => {
            if (err) {
                writeFile(argv.log.toString(), 'Лог файла игры "Ореш и решка"')
                    .then(
                        (data) => {
                            console.log("Лог " + argv.log + " создан");
                        },
                        (err) => {
                            console.log(err);
                            rl.close();
                        }
                    ).then(() => {
                        coin();
                    })
            } else {
                if (!stats.isFile()) {
                    console.log("Ошибка. Файл является папкой");
                    rl.close();
                } else {
                    coin();
                }
            };
        });
    } else {
        console.log('Неверные параметры');
        rl.close();
    }
}

function coin() {
    cursor
        .red()
        .bg.yellow()
        .write('Добро пожаловать в игру "Орел и решка"')
        .bg.reset()
        .write('\n')
        .yellow()
        .bg.grey()
        .write('Введите "exit" для выхода из игры')
        .bg.reset()
        .reset()
        .write('\n')
        .write('Введите 1 если орёл, и 0 если решка')
        .write('\n');
    const x = Math.round(Math.random()).toString();
    rl.on('line', (cmd) => {
        if (cmd === x) {
            console.log('Вы угадали');
            fs.appendFile(argv.log.toString(), '\nВы угадали', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            rl.close();
        } else if (cmd === '0' || cmd === '1') {
            console.log('Вы проиграли');
            fs.appendFile(argv.log.toString(), '\nВы проиграли', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            rl.close();
        } else if (cmd === 'exit') {
            console.log('Вы вышли из игры')
            rl.close();
        } else {
            console.log('Неверный ввод')
        }
    });
}
//blackJack
/*
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max - min + 1)) + min;
}

function getCard() {
    var cards = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[getRandomInt(0, cards.length - 1)];
}

function getSum(arr) {
    var sum = 0;

    for (var i=0; i<arr.length; i++) {

        if (arr[i] != 'A') {
            if (arr[i] == 'J' || arr[i] == 'Q' || arr[i] == 'K') {
                    sum = sum + 10;
            } else {
                    sum = sum + parseInt(arr[i]);
                }
        } else {
            if (sum>10) {
                sum = sum + 1;
            } else {
                sum = sum + 11;
            }
        }
    }
    return sum;
}

function getStatus() {
    return 'Дилер: ' + dealer.join(' ') + '; Игрок: ' + player.join(', ') +   '\nТекущая сумма карт у игрока: ' + getSum(player) + '; у дилера: ' + getSum(dealer);
}

var dealer = [getCard()];
var player = [getCard(), getCard()];
var answer = '';

if (getSum(player) == 21) {
        alert(getStatus() + '\nBlack Jack!');
    }  
    else {
        do {
            answer = prompt(getStatus() + '\nЕще карту? ok-да, иначе-нет.');

            if (answer == '') {
                player.push(getCard());
            }
        } while(answer == '' && getSum(player) < 21);

        if (getSum(player) == 21) {
                alert(getStatus() + '\nBlack Jack!');
            } 
            else if (getSum(player) > 21) {
                alert(getStatus() + '\nПеребор');
            } 
            else {
                while (getSum(dealer) < 17) {
                    dealer.push(getCard());
                }
                var sumD = getSum(dealer);
                var sumP = getSum(player);

                if (sumD == 21) {
                    alert(getStatus() + '\nПродул =( у дилера Black Jack');
                } else if (sumD > 21) {
                    alert(getStatus() + '\nПобеда! у дилера перебор');
                } else if (sumP == sumD) {
                    alert(getStatus() + '\nНичья -_-');
                } else if (sumP > sumD) {
                    alert(getStatus() + '\nПобеда! У тебя больше =)');
                } else {
                    alert(getStatus() + '\nПродул =( у дилера больше');
                }
            }
    }   

*/