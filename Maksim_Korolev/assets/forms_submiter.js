function submitNewUser(form) {
    const user = {};
    user.username = form.email.value;
    user.password = form.password.value;
    fetch('http://localhost:8888/new_user_page',{
        method: 'post',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
}

function submitLog (form) {
    const user = {
        username: form.email.value,
        password: form.password.value
    };
    fetch('http://localhost:8888/login_page',{
        method: 'post',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
}