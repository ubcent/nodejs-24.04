const http = new XMLHttpRequest();


//Send the proper header information along with the request


let h1 = document.getElementById('time'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}
timer();


/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function () {
    clearTimeout(t);
    let timerValue = `timerValue=${h1.textContent}`;
    console.log(timerValue);

    http.open('POST', '/', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () { //Call a function when the state changes.
        if (http.readyState !== 4 && http.status !== 200) {
            return new Error;
        }
    }
    http.send(timerValue);
}

/* Clear button */
clear.onclick = function () {
    h1.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
}