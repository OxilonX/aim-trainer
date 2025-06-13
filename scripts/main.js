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
let l = 0; // Score
let p = 0; // Timer started
let x = 1; // Hearts used
let seconds = 30;
let timer;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
  }
});

function changeVol(vol, rad) {
  let v;
  do {
    v = (Math.random() * 50).toFixed();
  } while (v < 20);
  document.documentElement.style.setProperty(vol, `${v}px`);
  document.documentElement.style.setProperty(rad, `${v}px`);
}

function resetTimer(vol, x, y) {
  document.documentElement.style.setProperty(vol, "30px");
  p = 0;
  l = 0;
  document.documentElement.style.setProperty(x, `50%`);
  document.documentElement.style.setProperty(y, `50%`);
  counter.innerHTML = `00`;
  clearInterval(timer);
  timer = null;
  seconds = 30;
  timerDisplay.innerHTML = `30`;
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
        resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
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

board.onclick = (event) => {
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
    resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
    heartRetry();
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
  changeVol(`--sec-volume`, `--sec-radius`);
  randomCoords(`--sec-x`, `--sec-y`, secTrg);
};

trg.onclick = () => {
  startTimer();
  scoreIncrement();
  changeVol(`--volume`, `--radius`);
  changeVol(`--sec-volume`, `--sec-radius`);
  randomCoords(`--x`, `--y`, trg);
  randomCoords(`--sec-x`, `--sec-y`, secTrg);
};

reset.onclick = () => {
  lastScore.innerHTML = `Your last score: ${l}`;
  resetTimer(`--volume`, `--x`, `--y`);
  resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
  heartRetry();
};
