
class employeesList{
    constructor() {
        this.init().catch(err => console.log(err));
    }
    async init(){
        const data = await this.getData();
        this.showAddNoteForm();
        this.setEventListeners();
    }
    setEventListeners(){
        const $remove = document.querySelectorAll(`.remove-btn`);
        const $employee = document.querySelectorAll(`.employee`);

        [...$remove].map(item=>{// set remove btn listen
            item.addEventListener('click', async (e)=>{
                e.preventDefault();
                let data = await this.sendData('/employees','DELETE',{id: e.currentTarget.dataset.id})
                    .then(response =>response.json())
                    .catch(err => console.log(err));
                if (data._id){
                    socket.emit('note', {
                        author: 'System notification. Removed an employee: ',
                        note: `${data.lastName} ${data.firstName}`,
                    });
                    let note = await this.sendData('/notifications', 'POST', {
                        noteText: `${data.lastName} ${data.firstName}`,
                        author: 'System notification. Removed an employee: ',
                        createTime: new Date(),})
                        .then(response =>response.json())
                        .catch(err => console.log(err));
                    window.location.href = "/employees";
                }
            });
        });
        [...$employee].map(item=>{// set select employee btn listen
            item.addEventListener('click', (e)=> {
                e.preventDefault();
                localStorage.setItem('employeeId', e.currentTarget.dataset.id);
                if(localStorage.token){
                    window.location.href = "/employee";
                }
            });
        });
    }
    async getData(){
        let data = await this.sendData('/employees/data', 'GET', )
            .then(response =>response.json())
            .then(data=>{this.render(data)})
            .catch(err=>{console.log(err)});
    }
    render(data){
        let body = data.data.reduce((acc, item)=>{
            return (acc+ `<li class="employees-list-item">
                    <form action="/employees" method="POST" name="goupdate" class="upd">
                        <button class="employee" data-id="${item._id}">-- </button>
                        <input type="text" class="employeeidhide" name="goupdate[id]" value="{{_id}}">
                        <span class="employee-name">Name: </span>${item.lastName} ${item.firstName},
                        <span class="employee-name">gender: ${item.gender}</span>
                    </form>
                    <form action="/employees" method="POST" name="remove" class="rem">
                        <input type="text" class="employeeidhide" name="remove[id]" value="${item._id}">

                        <button class="remove-btn" data-id="${item._id}"><i class="fas fa-user-times"></i></button>
                    </form>
                </li>`)
        },``);
        body = `<ul class="employees_list"> ${body} </ul>`;
        let root = document.createElement('div');
        root.classList.add('employees_list_container');
        root.innerHTML = body;
        document.querySelector('.employees').append(root);
    }
    sendData(route, method, data){
        let token = undefined;
        if (localStorage.getItem('token')){
            token = localStorage.getItem('token');
        }
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
    showAddNoteForm(){
        let addNoteBtn = document.querySelector('.addNoteForm > a');
        addNoteBtn.addEventListener('click', (e)=>{
            let block = e.currentTarget.parentNode.children[1];
                if(block.classList.contains('hide')){
                    block.classList.remove('hide');
                } else {
                    block.classList.add('hide');
                }

        })
    }


}
let newEmployeesList = new employeesList();