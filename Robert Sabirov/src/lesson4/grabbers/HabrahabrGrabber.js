const AbstractGrabber = require("./AbstractGrabber");

class HabrahabrGrabber extends AbstractGrabber {
    constructor() {
        super();
        this.url = 'https://habr.com/ru/';
    }
    grabbingParsing($) {
        return $('.post__title_link').map((i, item) => $(item).text().trim()).get()
    }
}

module.exports = HabrahabrGrabber;