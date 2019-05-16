const EventEmitter = require('events').EventEmitter;

class Kettle extends EventEmitter {
  constructor() {
    super();

    process.nextTick(() => this.emit('created'));
  }

  start() {
    setTimeout(() => {
      this.emit('ready', { username: 'Vasya Pupkin' });
    }, 1000);
  }
}

const k = new Kettle();
k.start();

k.on('created', () => {
  console.log('Чайник создан');
});

k.on('ready', (event) => {
  console.log('Чайник готов', event);
});