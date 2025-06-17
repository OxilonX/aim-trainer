const reset = document.querySelector(".reset");
const trg = document.querySelector(".target");
const timerDisplay = document.querySelector(".timer-display");
const lastScore = document.querySelector(".last-score");
const secTrg = document.querySelector(".sec-target");
const board = document.querySelector(".board");
const toggle = document.querySelector(".toggle");
const toggleSwitch = document.querySelector(".toggle-switch");
const body = document.body;
const timerIcon = document.querySelector(".timer-icon");
let counter = document.getElementById("js-counter");
const userOptions = JSON.parse(localStorage.getItem("userOptions"));
console.log(userOptions);
const mode = userOptions.mode;
const duration = userOptions.duration;
const hearts = userOptions.hearts;
const penalty = userOptions.penalty;
const sfx = userOptions.sfx;
const music = userOptions.music;
let genSec;
let maxVol;
let minVol;
function applyMode() {
  if (mode === 1) {
    genSec = 1800;
    maxVol = 50;
    minVol = 20;
  } else if (mode === 2) {
    genSec = 1200;
    maxVol = 40;
    minVol = 20;
  } else {
    genSec = 750;
    maxVol = 30;
    minVol = 18;
  }
}
applyMode();
if (!hearts) {
  document.querySelector(".trys").innerHTML = "";
}
let l = 0; // Score
let p = 0; // Timer started
let x = 1; // Hearts used
let seconds = duration;
let timer;
timerDisplay.innerHTML = duration;
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
  }
});

function changeVol(vol, rad) {
  let v;
  do {
    v = (Math.random() * 50).toFixed();
  } while (v > maxVol || v < minVol);
  document.documentElement.style.setProperty(vol, `${v}px`);
  document.documentElement.style.setProperty(rad, `200px`);
}

function resetTimer(vol, x, y) {
  clearInterval(autoRandomCoords);
  document.documentElement.style.setProperty(vol, "30px");
  p = 0;
  l = 0;
  document.documentElement.style.setProperty(x, `50%`);
  document.documentElement.style.setProperty(y, `50%`);
  counter.innerHTML = `00`;
  clearInterval(timer);
  timer = null;
  seconds = duration;
  timerDisplay.innerHTML = duration.toString();
}

function randomCoords(x, y, element) {
  let i, j;
  do {
    i = (Math.random() * 100).toFixed();
    j = (Math.random() * 100).toFixed();
  } while (i > 92 || i < 10 || j < 0 || j > 92);

  document.documentElement.style.setProperty(x, `${i}%`);
  document.documentElement.style.setProperty(y, `${j}%`);
  element.classList.add("popup");
  setTimeout(() => {
    element.classList.remove("popup");
  }, 300);
}

function scoreIncrement() {
  l++;
  counter.innerHTML = l < 10 ? `0${l}` : `${l}`;
}

function scoreDecrement() {
  l = Math.max(0, l - 1);
  counter.innerHTML = l < 10 ? `0${l}` : `${l}`;
}

function startTimer() {
  if (p === 0) {
    p++;
    timer = setInterval(() => {
      seconds--;
      timerDisplay.innerHTML = `${seconds} `;
      if (seconds <= 0) {
        lastScore.innerHTML = `Your last score: ${l}`;
        resetTimer(`--volume`, `--x`, `--y`);
        if (penalty) {
          resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
        }
        heartRetry();
      }
    }, 1000);
  }
}

function heartRetry() {
  for (let i = 1; i <= 3; i++) {
    let heart = document.querySelector(`.try-${i}`);
    heart.classList.remove("hitten");
  }
  x = 1;
}
function missClick(event) {
  if (event.target === board) {
    scoreDecrement();
  }
  if (event.target === board && x < 4) {
    let heart = document.querySelector(`.try-${x}`);
    x++;
    heart.classList.add("hitten");
  }
  if (x === 4) {
    lastScore.innerHTML = `Your last score: ${l}`;
    resetTimer(`--volume`, `--x`, `--y`);
    if (penalty) {
      resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
    }
    heartRetry();
  }
}

board.onclick = (event) => {
  if (hearts === true && seconds < duration - 1) {
    missClick(event);
  }
};
toggle.onclick = () => {
  toggleSwitch.classList.toggle("active");
  toggle.classList.toggle("active");
  if (toggle.classList.contains("active")) {
    body.classList.add("darkmode");
    timerIcon.src = "icons/icons8-timer-64.png";
    timerIcon.style.width = "34.5px";
    timerIcon.style.height = "34.5px";
  } else {
    body.classList.remove("darkmode");
    timerIcon.src = "icons/icons8-timer-60.png";
    timerIcon.style.width = "30px";
    timerIcon.style.height = "30px";
  }
};

secTrg.onclick = () => {
  scoreDecrement();
  if (penalty) {
    randomCoords(`--sec-x`, `--sec-y`, secTrg);
    changeVol(`--sec-volume`, `--sec-radius`);
  }
};
let autoRandomCoords;
function startAutoRandomCoords() {
  autoRandomCoords = setInterval(() => {
    randomCoords(`--x`, `--y`, trg);
    changeVol(`--volume`, `--radius`);

    if (penalty) {
      randomCoords(`--sec-x`, `--sec-y`, secTrg);
    }
  }, genSec);
}

trg.onclick = () => {
  if (penalty) {
    changeVol(`--sec-volume`, `--sec-radius`);
    randomCoords(`--sec-x`, `--sec-y`, secTrg);
  }
  startTimer();
  scoreIncrement();
  randomCoords(`--x`, `--y`, trg);
  changeVol(`--volume`, `--radius`);
  clearInterval(autoRandomCoords);
  startAutoRandomCoords();
};

reset.onclick = () => {
  lastScore.innerHTML = `Your last score: ${l}`;
  resetTimer(`--volume`, `--x`, `--y`);
  if (penalty) {
    resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
  }
  clearInterval(autoRandomCoords);
  heartRetry();
};
