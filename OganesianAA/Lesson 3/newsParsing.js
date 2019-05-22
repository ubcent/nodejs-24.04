const request = require('request');
const cheerio = require('cheerio');
const http = require('http');
const chromeLauncher = require('chrome-launcher');

class newsParsing{
    constructor(){
        let bb = [];

    }
    getNews(){
        request('https://ria.ru/', (err,res)=>{
            if(!err && res.statusCode === 200){
                // console.log(res.statusCode);
                // console.log(res.statusMessage);
                // console.log(res.body);
                const $ = cheerio.load(res.body);
                let a = $('.cell-list__item').find('.cell-list__item-title').toArray(); //.text()
                this.bb = a;
                a.forEach(i => {
                    console.log(i.children[0].data);
                });
            }
        });
    }
    render(){
        http.createServer((req, res)=>{
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            this.bb.forEach(i => {
                res.write(`<p>${i.children[0].data}</p>`);
                console.log(i.children[0].data);
            });
            res.end();
        }).listen(8888, ()=>{
            console.log('server has been started');

            chromeLauncher.launch({
                startingUrl: 'http://localhost:8888/'
            }).then(chrome => {
                console.log(`Chrome debugging port running on 8888`);
            });
        });
    }
}


let a = new newsParsing();
a.getNews();
a.render();


// новости 10 штук
// консольный переводчик