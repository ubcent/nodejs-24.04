const socket = io.connect(`http://localhost:8889`);
const $root = document.querySelector('.messages');
const $author = document.querySelector('.author');
const $message = document.querySelector('.message');
const $send = document.querySelector('.sendMsg');

socket.on('message', (message)=>{
    const $li = document.createElement('li');
    $li.textContent = `${message.author} ${message.message}`;
    $root.appendChild($li);
});

$send.addEventListener('click', (event)=>{
    socket.emit('message', {
        message: $message.value,
        author: $author.value,
    })
});