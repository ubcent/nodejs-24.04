class Employee{
    constructor(){
        this.getData();
    }
    init(){
        Object.entries({...document.querySelectorAll('input[type="date"]')}).forEach(([key, value])=>{
            if(value.dataset.date){
                let a = new Date(value.dataset.date).toJSON();
                value.value = a.substring(0, 10);
            }
        });

        const $_id = document.querySelector('input[class="id"]');
        const $firstName = document.querySelector('input[class="firstName"]');
        const $lastName = document.querySelector('input[class="lastName"]');
        const $birthDate = document.querySelector('input[class="birthDate"]');
        const $hireDate = document.querySelector('input[class="hireDate"]');
        const $gender = document.querySelector('input[class="gender"]');
        const $saveBtn = document.querySelector('.addBtn');

        this.setEventListeners({$saveBtn,$_id, $firstName, $lastName,$birthDate, $hireDate, $gender});
    }
    setEventListeners({$saveBtn,$_id, $firstName, $lastName,$birthDate, $hireDate, $gender}){
        $saveBtn.addEventListener('click', (e)=>{
           e.preventDefault();
           if ($_id.value){
               this.sendData('/employees', 'PUT', {_id:$_id.value, firstName:$firstName.value, lastName:$lastName.value, birthDate:$birthDate.value, hireDate:$hireDate.value, gender:$gender.value})
                   .then(response =>response.json())
                   .then(res =>{
                       if (res._id){
                           window.location.href = "/employees";
                       }
                   })
                   .catch(err => console.log(err))
           } else{
                this.sendData('/employees', 'POST', {firstName:$firstName.value, lastName:$lastName.value, birthDate:$birthDate.value, hireDate:$hireDate.value, gender:$gender.value})
                    .then(response =>response.json())
                    .then(res =>{
                        if (res._id){
                            window.location.href = "/employees";
                        }
                    })
                    .catch(err => console.log(err))
           }
        });
    }
    getData(){
        const id = localStorage.getItem('employeeId');
        if(!id){
            let data = {_id:'', firstName:'', lastName:'', birthDate:'', hireDate:'', gender:''};
            this.render(data);
        } else{
            this.sendData(`/employees/${id}`, 'GET', )
                .then(response =>response.json())
                .then(data=>{
                    this.render(data)
                })
                .catch(err => console.log(err))
        }
    }
    render(data){
        let body = `<form action="/employees/{{data._id}}" method="POST" name="update">
                <label class="hide">id
                    <input class="id" type="text" name="update[id]" value="${data._id}" required>
                    <p>{{data._id}}</p>
                </label>
                <label>First name
                    <input class="firstName" type="text" name="update[firstName]" value="${data.firstName}" required>
                </label>
                <label>Last name
                    <input class="lastName" type="text" name="update[lastName]" value="${data.lastName}" required>
                </label>
                <label>Birth-date
                    <input class="birthDate" type="date" data-date-format="DD/MM/YYYY" name="update[birthDate]" data-date="${data.birthDate}"  required>
                </label>
                <label>Hire-date
                    <input class="hireDate" type="date" data-date-format="DD/MM/YYYY" name="update[hireDate]" data-date="${data.hireDate}" required>
                </label>
                <label>Gender
                    <input class="gender" list="mylist" name="update[gender]" value="${data.gender}" required>
                </label>
                <datalist id="mylist">
                    <option value="M" label="Male"></option>
                    <option value="F" label="Female"></option>
                </datalist>
                <button class="addBtn">Save</button>
            </form>`;
        let root = document.createElement('div');
        root.classList.add('employee_container');
        root.innerHTML = body;
        document.querySelector('.addForm').append(root);
        this.init();
        localStorage.removeItem('employeeId');
    }
    sendData(route, method, data){
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
let newEmployee = new Employee();