let startTime;
let elapsedTime=0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startPauseButton.addEventListener('click',()=>{
    if(isRunning){
        pauseTimer();
    }else{
        startTimer();
    }
});

resetButton.addEventListener('click',resetTimer);
lapButton.addEventListener('click',recordLap);

function startTimer(){
    startTime=Date.now()-elapsedTime;
    timerInterval=setInterval(updateDisplay,10);
    startPauseButton.textContent='pause';
    startPauseButton.style.background='#ffc107';
    isRunning=true;
}

function pauseTimer(){
    clearInterval(timerInterval);
    elapsedTime=Date.now()-startTime;
    startPauseButton.textContent='start';
    startPauseButton.style.background='#28a745';
    isRunning=false;
}

function resetTimer(){
    clearInterval(timerInterval);
    startTime=null;
    elapsedTime=0;
    isRunning=false;
    display.textContent='00:00:00';
    startPauseButton.textContent='start';
    startPauseButton.style.background='#28a745';
    lapsContainer.innerHTML='';
}

function updateDisplay(){
    elapsedTime=Date.now()-startTime;
    display.textContent=timeToString(elapsedTime);
}

function timeToString(time){
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2,'0');
    let formattedMM = mm.toString().padStart(2,'0');
    let formattedSS = ss.toString().padStart(2,'0');
    let formattedMS = ms.toString().padStart(2,'0');

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function recordLap(){
    const lapTime=timeToString(elapsedTime);
    const lapDiv=document.createElement('div');
    lapDiv.textContent=lapTime;
    lapsContainer.appendChild(lapDiv);
}