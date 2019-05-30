const AbstractGrabber = require("./AbstractGrabber");

class TheNextWebGrabber extends AbstractGrabber {
    constructor() {
        super();
        this.url = 'https://thenextweb.com/latest/';
    }
    grabbingParsing($) {
        return $('.story-title a').map((i, item) => $(item).text().trim()).get()
    }
}

module.exports = TheNextWebGrabber;