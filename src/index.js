const minutesInputEle = document.getElementById("minutes");
const secondsInputEle = document.getElementById("seconds");
const timerButton = document.getElementById("timer-btn");
const ring = document.getElementsByClassName("ring");
let isTimerRunning = false
let seconds = parseInt(secondsInputEle.value)
let minutes = parseInt(minutesInputEle.value)
let timer
let timeLeft

timerButton.addEventListener('click',function toggleTimer(){
    timeLeft = minutes !== 0 || seconds !== 0
    isTimerRunning = !isTimerRunning
    if(isTimerRunning){
        runTimer();
    } else {
        stopTimer();
    }
    setRingColour();
    setInput(false)
    setButtonText()
});

secondsInputEle.addEventListener('change',function setSeconds(d){
    console.log("changed")
    seconds = parseInt(secondsInputEle.value)
});

minutesInputEle.addEventListener('change',function setSeconds(d){
    minutes = parseInt(minutesInputEle.value)
});

function setRingColour(){
    if(minutes ===0 && seconds === 0){
        ring[0].style.stroke = "#09A65A"
        return
    } 
    ring[0].style.stroke = "red"
}

function runTimer(){
    if(timeLeft){
        timer = setInterval(()=>{
            if(seconds === 0){
                minutes--;
                seconds=59;
            }else{
                seconds--;
            }
            if(minutes<10){
                minutesInputEle.value="0"+minutes;
            }else{
                minutesInputEle.value=minutes;
            }
            if(seconds<10){
                secondsInputEle.value="0"+seconds;
            }
            else{
                secondsInputEle.value=seconds;
            }
            if(minutes === 0 && seconds === 0){
                endTimer();
                return;
            }
        },1000);
    }
}

function endTimer(){
    isTimerRunning=false
    setRingColour();
    stopTimer();
    setButtonText();
}

function stopTimer(){
    clearInterval(timer);
}

function setButtonText(){
    if(isTimerRunning){
        timerButton.innerHTML = "Stop"
        return
    }
    timerButton.innerHTML = "Start"
}

function setInputAsEditable(){
    if(!isTimerRunning){
        setInput(true)
    }
}

function setInput(editable){
    minutesInputEle.disabled = !editable
    secondsInputEle.disabled = !editable
}