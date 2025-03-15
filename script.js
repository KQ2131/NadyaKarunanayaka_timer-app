let time = 300;
let interval;
let running = false;
const timerDisplay = document.querySelector(".timer");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const resetButton = document.querySelector(".reset");

// Function to update the displayed timer
function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to start the countdown timer with firework effect
function startTimer(event) {
    if (!running) {
        running = true;
        createFirework(event.clientX, event.clientY);
        interval = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(interval);
                running = false;
            }
        }, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(interval);
    running = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(interval);
    running = false;
    time = 300;
    updateDisplay();
}

// Function to set custom time
function setCustomTime() {
    let minutes = document.getElementById("customMinutes").value;
    let seconds = document.getElementById("customSeconds").value;
    time = parseInt(minutes) * 60 + parseInt(seconds);
    updateDisplay();
}

// Function to create a firework effect
function createFirework(x, y) {
    for (let i = 0; i < 20; i++) {
        let spark = document.createElement('div');
        spark.classList.add('spark');
        document.body.appendChild(spark);
        
        let angle = Math.random() * Math.PI * 2;
        let distance = Math.random() * 150 + 50;
        
        spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        setTimeout(() => { spark.remove(); }, 2000);
    }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();