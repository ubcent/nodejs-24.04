Object.entries({...document.querySelectorAll('input[type="date"]')}).forEach(([key, value])=>{
    let a = new Date(value.dataset.date).toJSON();
    value.value = a.substring(0, 10);
});