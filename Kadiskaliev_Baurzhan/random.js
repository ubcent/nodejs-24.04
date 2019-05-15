const arrGame = ['орел', 'решка'];

function random() {
  return  arrGame[Math.floor(Math.random()*2)]
}
exports.random = () => random();