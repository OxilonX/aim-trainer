const reset = document.querySelector(".reset");
const trg = document.querySelector(".target");
const timerDisplay = document.querySelector(".timer-display");
const lastScore = document.querySelector(".last-score");
let counter = document.getElementById("js-counter");
let l = 0;
let p = 0;
let seconds = 30;
let timer;
function changeVol() {
  let v;
  do {
    v = (Math.random() * 100).toFixed();
  } while (v < 20);
  document.documentElement.style.setProperty("--volume", `${v}px`);
  document.documentElement.style.setProperty("--radius", `${v}px`);
}
function resetTimer() {
  document.documentElement.style.setProperty("--volume", "30px");
  p = 0;
  l = 0;
  i = 50;
  document.documentElement.style.setProperty("--x", `${i}%`);
  document.documentElement.style.setProperty("--y", `${i}%`);
  counter.innerHTML = `${l}`;
  clearInterval(timer);
  timer = null;
  seconds = 30;
  timerDisplay.innerHTML = `30 `;
  counter.innerHTML = `00`;
}
trg.onclick = () => {
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
  changeVol();
  let i = 50;
  let j = 50;
  do {
    i = (Math.random() * 100).toFixed();
    j = (Math.random() * 100).toFixed();
  } while (i > 92 || i < 10 || j < 0 || j > 92);
  document.documentElement.style.setProperty("--x", `${i}%`);
  document.documentElement.style.setProperty("--y", `${j}%`);
  l++;
  if (l < 10) counter.innerHTML = `0${l}`;
  else counter.innerHTML = `${l}`;
};
reset.onclick = resetTimer;
