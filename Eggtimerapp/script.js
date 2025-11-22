let timeLeft = 0;
let timerId = null;

const eggGif = document.getElementById("egg-gif");
const eggAnimation = document.getElementById("egg-animation");
const display = document.getElementById("display");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startBtn = document.getElementById("startbutton");
const stopBtn = document.getElementById("stopbutton");
const resetBtn = document.getElementById("resetbutton");

// Format mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
}

// Normalize inputs
function normalizeInputs() {
    let mins = parseInt(minutesInput.value, 10) || 0;
    let secs = parseInt(secondsInput.value, 10) || 0;

    if (secs >= 60) {
        mins += Math.floor(secs / 60);
        secs = secs % 60;
    }

    minutesInput.value = mins;
    secondsInput.value = secs;

    return { mins, secs };
}

// Update display
function updateTime() {
    const { mins, secs } = normalizeInputs();
    timeLeft = mins * 60 + secs;
    display.textContent = formatTime(timeLeft);
}

// Spinner +/- events
document.querySelectorAll(".spinner").forEach(spinner => {
    const minus = spinner.querySelector(".minus");
    const plus = spinner.querySelector(".plus");
    const input = spinner.querySelector("input");

    const clamp = (val) => {
        const min = Number(input.min) || 0;
        const max = input.max !== "" ? Number(input.max) : Infinity;
        return Math.max(min, Math.min(val, max));
    };

    minus.addEventListener("click", () => {
        input.value = clamp((parseInt(input.value, 10) || 0) - 1);
        updateTime();
    });

    plus.addEventListener("click", () => {
        input.value = clamp((parseInt(input.value, 10) || 0) + 1);
        updateTime();
    });

    input.addEventListener("change", () => {
        input.value = clamp(parseInt(input.value, 10) || 0);
        updateTime();
    });
});

// Start
startBtn.addEventListener("click", () => {
    updateTime();
    if (timerId || timeLeft <= 0) {
        if (timeLeft <= 0) alert("Please set a time greater than 0.");
        return;
    }

    // eggGif.style.display = "block";
    // eggAnimation.style.display = "none";

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            display.textContent = formatTime(timeLeft);
        } else {
            clearInterval(timerId);
            timerId = null;
            eggGif.style.display = "none";
            eggAnimation.style.display = "block";
            alert("⏰ Time’s up! Your egg is ready!");
        }
    }, 1000);
});

// Stop
stopBtn.addEventListener("click", () => {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
    // eggGif.style.display = "none";
    // eggAnimation.style.display = "block";
});

// Reset
resetBtn.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
    minutesInput.value = 10;
    secondsInput.value = 0;
    updateTime();
    // eggGif.style.display = "none";
    // eggAnimation.style.display = "none";
});

// Init
updateTime();
