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
