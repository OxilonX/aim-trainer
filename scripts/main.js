const reset = document.querySelector(".reset");
const trg = document.querySelector(".target");
const timerDisplay = document.querySelector(".timer-display");
const lastScore = document.querySelector(".last-score");
const secTrg = document.querySelector(".sec-target");
let counter = document.getElementById("js-counter");
let l = 0;
let p = 0;
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
  i = 50;
  document.documentElement.style.setProperty(x, `${i}%`);
  document.documentElement.style.setProperty(y, `${i}%`);
  counter.innerHTML = `${l}`;
  clearInterval(timer);
  timer = null;
  seconds = 30;
  timerDisplay.innerHTML = `30 `;
  counter.innerHTML = `00`;
}

function randomCoords(x, y, elemnt) {
  let i = 50;
  let j = 50;
  do {
    i = (Math.random() * 100).toFixed();
    j = (Math.random() * 100).toFixed();
  } while (i > 92 || i < 10 || j < 0 || j > 92);

  document.documentElement.style.setProperty(`${x}`, `${i}%`);
  document.documentElement.style.setProperty(`${y}`, `${j}%`);
  elemnt.classList.toggle("popup");
}
function scoreIncrement() {
  l++;
  if (l < 10) counter.innerHTML = `0${l}`;
  else counter.innerHTML = `${l}`;
}
function scoreDecreament() {
  l = Math.max(0, l - 1);
  if (l < 10) counter.innerHTML = `0${l}`;
  else counter.innerHTML = `${l}`;
}
function startTimer() {
  if (p === 0) {
    p++;
    timer = setInterval(() => {
      seconds--;
      timerDisplay.innerHTML = `${seconds} `;
      if (seconds <= 0) {
        lastScore.innerHTML = `Your last score :${l}`;
        resetTimer();
      }
    }, 1000);
  }
}
secTrg.onclick = () => {
  scoreDecreament();
  changeVol(`--sec-volume`, `--sec-radius`);
  randomCoords(`--sec-x`, `--sec-y`);
};
trg.onclick = () => {
  startTimer();
  scoreIncrement();
  changeVol(`--volume`, `--radius`);
  changeVol(`--sec-volume`, `--sec-radius`);
  randomCoords(`--x`, `--y`, trg);
  randomCoords(`--sec-x`, `--sec-y`);
};
reset.onclick = () => {
  resetTimer(`--volume`, `--x`, `--y`);
  resetTimer(`--sec-volume`, `--sec-x`, `--sec-y`);
};
