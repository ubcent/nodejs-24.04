class logOut{
    constructor(){
        this.init();
    }
    init(){
        const $logout = document.querySelector(`.logoutBtn`);
        this.setEventListeners({$logout});
    }
    setEventListeners({$logout,}){
        $logout.addEventListener('click', (e)=>{
            e.preventDefault();
            this.postData('/logout','POST',)
                .then(res =>{
                    window.location.href = res.url;
                    localStorage.removeItem('token');
                })
                .catch(err => console.log(err))
        });
    }
    postData(route, method, data){
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
}

let newLogOut = new logOut();