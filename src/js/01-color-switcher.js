function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stoptBtn = document.querySelector('[data-stop]');
stoptBtn.disabled = true;

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function switchButtonsDisable(param) {
  stoptBtn.disabled = param ? false : true;
  startBtn.disabled = param ? true : false;
}

startBtn.addEventListener('click', () => {
  switchButtonsDisable(true);
  changeColor();
  timerId = setInterval(changeColor, 1000);
});

stoptBtn.addEventListener('click', () => {
  switchButtonsDisable(false);
  clearInterval(timerId);
});
