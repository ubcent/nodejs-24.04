let socket = io.connect(`http://localhost:8889`);

class notifications{
    constructor(){
        this.init().catch(err => console.log(err));
    }
    async init(){
        const data = await this.getData();
        this.handleNewNote();
        this.noteEmit();
        this.setEventListeners();
    }
    setEventListeners(){
        const $btnClose = document.querySelectorAll('.btnCloseNote');
        const $btnMinimize = document.querySelectorAll('.btnMinimizeNote');

        // console.log($btnClose);
        // console.log($btnMinimize);
        [...$btnClose].map(item=>{
            item.addEventListener('click',e => {
                this.removeNote({id: e.currentTarget.dataset.id});
                e.currentTarget.parentNode.parentNode.remove();
            });
        });
        [...$btnMinimize].map(item=>{//hide the note for client window
            item.addEventListener('click',e => {
                e.currentTarget.parentNode.parentNode.remove();
            });
        });
    }
    handleNewNote(){// render an input form
        socket.on('note', (note)=>{
            const $li = document.createElement('li');
            const $btnClose = document.createElement('button');
            const $btnMinimize = document.createElement('button');
            const $btnContainer = document.createElement('div');
            const $root = document.querySelector('.notes');

            $li.innerHTML = `<p>${note.author} ${note.note}</p>`;
            $btnClose.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
            $btnClose.classList.add('btnCloseNote');
            // $btnClose.dataset.id = note.socketId;
            $btnMinimize.innerHTML =`<i class="fas fa-window-minimize"></i>`;
            $btnMinimize.classList.add('btnMinimizeNote');
            // $btnMinimize.dataset.id = note.socketId;
            $btnContainer.classList.add('btnContainer');
            $li.classList.add('noteItem');
            $btnContainer.appendChild($btnMinimize);
            $btnContainer.appendChild($btnClose);
            $li.appendChild($btnContainer);
            $root.appendChild($li);

            const $addNoteInputForm = document.querySelector('.addNoteFormInput');
            $addNoteInputForm.classList.add('hide');
        });


    }
    noteEmit(){// send a note
        const $send = document.querySelector('.sendMsg');
        const $author = document.querySelector('.author');
        const $note = document.querySelector('.note');

        $send.addEventListener('click', (event)=>{
            socket.emit('note', {
                note: $note.value,
                author: $author.value,
            });
            $note.value='';
            $author.value='';
        });
    }
    getData(){
        return new Promise((resolve, reject)=>{
            this.sendData('/notifications', 'GET',)
                .then(response => response.json())
                .then(data=>{
                    this.render(data);
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject();
                })
        })
    }
    removeNote(id){
        this.sendData('/notifications', 'DELETE', {id: id.id})
            .then(response =>response.json())
            .then(res =>{
                console.log(res);

            })
            .catch(err => console.log(err))
    }
    render(data){
        let body = data.data.reduce((acc, item)=>{
            return (
                acc + `<li class="noteItem">
                            <p>${item.author} ${item.noteText}</p>
                            <div class="btnContainer">
                                <button data-id="${item._id}" class="btnMinimizeNote">
                                    <i class="fas fa-window-minimize"></i>
                                </button><button data-id="${item._id}" class="btnCloseNote">
                                <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </li>`
            )
        },'');
        let root = document.createElement('ul');
        root.classList.add('notes');
        root.innerHTML = body;
        document.querySelector('.notesContainer').append(root);
    }
    sendData(route, method, data){
        let token = undefined;
        if (localStorage.getItem('token')){
            token = localStorage.getItem('token');
        }
        console.log(route, method, data);
        return(
            fetch(route, {
                method: method,
                mode: 'cors',
                cache: 'default',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `${token}`,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }))
    }
}

const newNoticifications = new notifications();


//todo: добавить наполнение листа из разных источников, из формы ввода, как сообщения
//todo: так и для добавления нового юзера, удаления, обновления

