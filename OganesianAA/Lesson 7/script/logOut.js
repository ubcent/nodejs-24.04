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
                })
                .catch(err => console.log(err))
        });
    }
    postData(route, method, data){
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

let newLogOut = new logOut();