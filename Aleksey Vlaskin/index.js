const readline  = require('readline');
const request   = require('request');
const cheerio   = require('cheerio');

request('http://1c.ru', (err, req, html) => {
    if (!err && req.statusCode === 200){
        const $ = cheerio.load(html.toString());
        const $news = $('.span6').eq(0).children('dl').children();
        
        const $datesArray = $news.filter((index, elem) => {
            return elem.tagName === 'dt';
        });
        
        const datesArray = $datesArray.map((index, elem) => {
            return elem.children[0].children[0].data;
        }).get();        
                
        const $newsArray = $news.filter((index, elem) => {
            return elem.tagName === 'dd';
        });        
          
        console.log('Новости фирмы 1С\n');
        $newsArray.each((index, elem) => {
            console.log(datesArray[index]);
            let strnews = ($(elem).text().replace(/(\s{22,})+/g, ''));              
            strnews = strnews.replace(/(\s{21,})+/g, '\n');              
            console.log(strnews.replace(/(курсы:)+/g,'курсы:\n'), '\n'); //Курсы всегда оглашаются списками, оформим
        });
    };
    translate();
});

function translate() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('Введите текст для перевода на русский язык (exit - выход)');

    rl.on('line', (userText) => {
        if (userText === 'exit') {
            rl.close();            
        } else {
            request({
                method: 'POST',
                uri: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190522T091046Z.916ae34ccf457875.bfcc3d1ad8074e27a7cb5e6e4138ee32627c0cd2&text=${userText}}&lang=ru`,}, function (error, response, body) {
                    if (error) {
                        console.error(error);
                    } else {
                        const answ = JSON.parse(body).text;
                        if (answ.length > 0) {
                            console.log(answ[0].replace(/[{}]+/g, ''), '\n\nВведите текст для перевода на русский язык (exit - выход)');    
                        };            
                        //console.log(response.statusCode);           
                    };
            });
        };
    });
}