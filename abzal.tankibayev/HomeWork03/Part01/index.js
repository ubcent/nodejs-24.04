const request = require('request');
const cheerio = require('cheerio');
class Rate {
constructor(name,ratio,value){
    this.name = name;
    this.ratio = ratio;
    this.value = value;
    }
}

const options = {
    url:'https://www.nationalbank.kz/?furl=cursFull&switch=rus',
}

request(options, (err, req, html) => {
    if(!err) {
        const table = cheerio.load(html)('table tr td.gen7');
        let curs =[];
		// Прошу помочь с  использованием методов map, filter
        for(let i = 0; i < (table.length - 4); i += 5){
            curs.push(new Rate(table.eq(i).text().trim(), table.eq(i + 1).text(),table.eq(i + 2).text()));
        }

        console.table(curs);
    }
    else {console.log(err);}
})