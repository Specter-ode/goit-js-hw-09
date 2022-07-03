const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
const NOTIFICATION_DELAY = 1000;
let timeoutId = null;

stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', startChangingBackground);
stopBtn.addEventListener('click', stopChangingBackground);

function startChangingBackground() {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
  timeoutId = setInterval(() => {
    const colorName = getRandomHexColor();
    bodyEl.style.backgroundColor = colorName;
  }, NOTIFICATION_DELAY);
}

function stopChangingBackground() {
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
  clearInterval(timeoutId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
