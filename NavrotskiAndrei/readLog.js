const fs = require('fs');
const util = require('util');


class ReadFile{
	constructor(filePath = './log.txt'){
		this.filePath = filePath
	}
	read(){
		const read = util.promisify(fs.readFile);
		read(this.filePath, 'utf-8')
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.error(err)
			});
	}
}

const readFile = new ReadFile();
readFile.read();
