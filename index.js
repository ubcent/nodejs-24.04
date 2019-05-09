const ansi = require("ansi");

const cursor = ansi(process.stdout);

cursor
  .red()
  .bg.yellow()
  .write("Hello world")
  .bg.reset()
  .reset()
  .write("\n");

cursor.beep();
