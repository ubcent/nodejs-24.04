const ansi = require('ansi');

const cursor = ansi(process.stdout);

exports.writeGreen = function (txt) {
    cursor.green().write(txt).reset();
}

exports.writeGreenLn = function (txt) {
    this.writeGreen(txt);
    cursor.write('\n');
}

exports.writeRed = function (txt) {
    cursor.red().write(txt).reset();
}

exports.writeRedLn = function (txt) {
    this.writeRed(txt);
    cursor.write('\n');
}

exports.writeBlue = function (txt) {
    cursor.blue().write(txt).reset();
}

exports.writeBlueLn = function (txt) {
    this.writeBlue(txt);
    cursor.write('\n');
}