
const chalk = require('chalk');

console.log(chalk`{blue Голубое небо}`);


console.log(chalk`{green Whats up!}`);

function say(word) {
    console.log(word);
}
  
function execute(someFunction, value) {
    someFunction(value);
}
  
execute(say, chalk`{yellow Hello Yellow!}`);

execute(function(word){ console.log(word) }, chalk`{gray Hey }`);

  var ansi = require('ansi')
  , cursor = ansi(process.stdout)
 
// You can chain your calls forever:
cursor
  .red()                 // Set font color to red
  .bg.grey()             // Set background color to grey
  .write('Hello World!') // Write 'Hello World!' to stdout
  .bg.reset()            // Reset the bgcolor before writing the trailing \n,
                         //      to avoid Terminal glitches
  .write('\n')           // And a final \n to wrap things up
 
// Rendering modes are persistent:
cursor.hex('#660000').bold().underline()
 
// You can use the regular logging functions, text will be green:
console.log('This is blood red, bold text')
 
// To reset just the foreground color:
cursor.fg.reset()
 
console.log('This will still be bold')

// Clean up after yourself!
cursor.reset()