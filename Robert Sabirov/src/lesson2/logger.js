const fs = require('fs');
const path = require('path');
module.exports = class Logger {
    constructor(filePath = '') {
        this.stream = null;
        if (filePath.length !== 0) {
            this.setFilePath(filePath);
        }
    }
    _open() {
        if (this.filePath == null || this.filePath.length == 0) {
            this.stream = null;
            throw new Error('Logger: Uncorrected filePath');
        } else {
            try {
                const dir = path.dirname(this.filePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                this.stream = fs.createWriteStream(this.filePath, { flags: 'a' });
                this.stream.write(`Start session: ${this._getDateNow()}\n`);
            } catch (err) {
                console.error(err.message);
                this.stream = null;
                throw err;
            }
        }
    }
    _getDateNow() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
    setFilePath(filePath) {
        this.filePath = filePath;
        this._open();
    }
    write(msg) {
        if (this.stream != null) {
            this.stream.write(`${this._getDateNow()}: ${msg}\n`);
        }
    }
    end() {
        if (this.stream != null) {
            this.stream.write(`End session: ${this._getDateNow()}\n`);
            this.stream.end();
            this.stream = null;
        }
    }
}