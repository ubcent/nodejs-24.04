class employeesList{
    constructor() {
        this.getData();
    }
    init(){
        const $remove = document.querySelectorAll(`.remove-btn`);
        const $employee = document.querySelectorAll(`.employee`);
        this.setEventListeners({$remove,$employee});
    }
    setEventListeners({$remove,$employee}){
        [...$remove].map(item=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault();
                this.sendData('/employees','DELETE',{id: e.currentTarget.dataset.id})
                    .then(response =>response.json())
                    .then(res =>{
                        if (res._id){
                            window.location.href = "/employees";
                        }
                        console.log(res);
                    })
                    .catch(err => console.log(err))
            });
        });
        [...$employee].map(item=>{
            item.addEventListener('click', (e)=> {
                e.preventDefault();
                console.log(1);
                localStorage.setItem('employeeId', e.currentTarget.dataset.id);
                if(localStorage.token){
                    window.location.href = "/employee";
                }
            });
        });
    }
    getData(){
        this.sendData('/employees/data', 'GET', )
            .then(response =>response.json())
            .then(data=>{
                this.render(data)
            })
            .catch(err => console.log(err))
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
        this.init();
    }
    sendData(route, method, data){
        console.log(route, method, data);
        return(
            fetch(route, {
                method: method,
                mode: 'cors',
                cache: 'default',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }))
    }

}
let newEmployeesList = new employeesList();