const easyButton = document.querySelector(".easy");
const normalButton = document.querySelector(".normal");
const hardButton = document.querySelector(".hard");
const dur30Button = document.querySelector(".js-dur-30");
const dur60Button = document.querySelector(".js-dur-60");
const dur90Button = document.querySelector(".js-dur-90");
const dur120Button = document.querySelector(".js-dur-120");
const heartsToggle = document.querySelector(".js-toggle-1");
const penaltyToggle = document.querySelector(".js-toggle-2");
const sfxToggle = document.querySelector(".js-toggle-3");
const musicToggle = document.querySelector(".js-toggle-4");
const heartsSwitch = document.querySelector(".js-switch-1");
const penaltySwitch = document.querySelector(".js-switch-2");
const sfxSwitch = document.querySelector(".js-switch-3");
const musicSwitch = document.querySelector(".js-switch-4");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
let hearts = false;
let penalty = false;
let sfx = true;
let music = true;
let duration = 60;
let mode = 2;
easyButton.onclick = () => {
  mode = 1;
  normalButton.classList.remove("active");
  hardButton.classList.remove("active");
  easyButton.classList.add("active");
};
normalButton.onclick = () => {
  mode = 2;
  easyButton.classList.remove("active");
  hardButton.classList.remove("active");
  normalButton.classList.add("active");
};
hardButton.onclick = () => {
  mode = 3;
  normalButton.classList.remove("active");
  easyButton.classList.remove("active");
  hardButton.classList.add("active");
};
function pickDuration(element) {
  element.classList.add("duration-active");
  for (let i = 30; i < 150; i += 30) {
    const durButton = document.querySelector(`.js-dur-${i}`);
    if (durButton.className !== element.className) {
      durButton.classList.remove("duration-active");
    }
  }
}
function toggleOptions(element, elementSwitch, option) {
  if (element.classList.contains("active")) {
    option = false;
    element.classList.remove("active");
    elementSwitch.classList.remove("active");
  } else {
    option = true;
    element.classList.add("active");
    elementSwitch.classList.add("active");
  }
  return option;
}
function resetToDeffaultOptions() {
  for (i = 30; i < 150; i += 30) {
    const durButton = document.querySelector(`.js-dur-${i}`);
    durButton.classList.remove("duration-active");
  }
}
dur30Button.onclick = () => {
  pickDuration(dur30Button);
  duration = 30;
};
dur60Button.onclick = () => {
  pickDuration(dur60Button);
  duration = 60;
};
dur90Button.onclick = () => {
  pickDuration(dur90Button);
  duration = 90;
};
dur120Button.onclick = () => {
  pickDuration(dur120Button);
  duration = 120;
};
heartsSwitch.onclick = () => {
  hearts = toggleOptions(heartsToggle, heartsSwitch, hearts);
  console.log(hearts);
};
penaltySwitch.onclick = () => {
  penalty = toggleOptions(penaltyToggle, penaltySwitch, penalty);
};

sfxSwitch.onclick = () => {
  sfx = toggleOptions(sfxToggle, sfxSwitch, sfx);
};
musicSwitch.onclick = () => {
  music = toggleOptions(musicToggle, musicSwitch, music);
};

reset.onclick = () => {
  resetToDeffaultOptions();
  heartsToggle.classList.remove("active");
  heartsSwitch.classList.remove("active");
  penaltyToggle.classList.remove("active");
  penaltySwitch.classList.remove("active");
  normalButton.classList.add("active");
  hardButton.classList.remove("active");
  easyButton.classList.remove("active");
  dur60Button.classList.add("duration-active");
  hearts = false;
  penalty = false;
  duration = 60;
  mode = 2;
};
start.onclick = () => {
  let userInput = {
    mode: mode,
    duration: duration,
    hearts: hearts,
    penalty: penalty,
    sfx: sfx,
    music: music,
  };

  localStorage.setItem("userOptions", JSON.stringify(userInput));

  window.location.href = "https://oxilonx.github.io/aim-trainer/options.html";
};
