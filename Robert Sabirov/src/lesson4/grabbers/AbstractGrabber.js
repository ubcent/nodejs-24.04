class AbstractGrabber {
    grabbingParsing($) {
        return '';
    }

    _grabbing(page) {
        const cheerio = require('cheerio');
        const $ = cheerio.load(page);
        return this.grabbingParsing($);
    }

    _doRequest(url) {
        const request = require('request');
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(err);
                }
            });
        });
    }

    async _request(url) {
        try {
            const result = await this._doRequest(url);
            return this._grabbing(result);
        } catch (err) {
            return err.message;
        }
    }

    async getTopics() {
        const results = await this._request(this.url);
        return results;
    }

}

module.exports = AbstractGrabber;