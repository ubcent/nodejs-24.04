class loginForm{
    constructor(){
        this.init();
    }
    init(){
        const $username = document.querySelector('input[name=username]');
        const $password = document.querySelector('input[name=password]');
        const $btn = document.querySelector('.upd > button');

        $btn.addEventListener('click', (e)=>{
            e.preventDefault();
            this.postCredentials({username: $username.value, password: $password.value});
        });
    }
    postCredentials(data){
        fetch('/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response =>response.json())
            .then(res =>{
                localStorage.setItem('token', res.Bearer);
                if(localStorage.token){
                    window.location.href = "/employees";
                }
            })
            .catch(err => console.log(err))
    }

}

let newLoginForm = new loginForm();