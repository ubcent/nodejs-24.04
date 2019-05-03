const {table} = require('table');
 
let data,
    output;
 
data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];
 
output = table(data);
 
console.log(output);