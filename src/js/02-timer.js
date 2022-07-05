import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const containerEl = document.querySelector('.timer');
containerEl.style.display = 'flex';
containerEl.style.marginTop = '30px';
containerEl.style.justifyContent = 'space-evenly';
containerEl.style.fontSize = '50px';

const inputTime = document.querySelector('input[type="text"]');
const startTimerBtn = document.querySelector('button[data-start]');
startTimerBtn.setAttribute('disabled', 'disabled');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    const selectedTime = selectedDates[0].getTime();
    if (selectedTime < currentTime) {
      Report.failure('Error', 'Please choose a date in the future', 'Fix date');
      return;
    }
    startTimerBtn.removeAttribute('disabled');
  },
};

flatpickr('input[type="text"]', options);
startTimerBtn.addEventListener('click', startTimer);

function startTimer() {
  const selectedTimeAtInput = Date.parse(inputTime.value);
  let timerId = setInterval(() => {
    const current = Date.now();
    let timerValue = selectedTimeAtInput - current;
    const { days, hours, minutes, seconds } = convertMs(timerValue);
    inputTime.setAttribute('disabled', 'disabled');
    startTimerBtn.setAttribute('disabled', 'disabled');
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minutesEl.textContent = `${minutes}`;
    secondsEl.textContent = `${seconds}`;
    if (timerValue < 1000) {
      clearInterval(timerId);
    }
  }, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      }
      reject({position, delay});
    }, delay);
  });
}

function onBtnSubmit(e) {
  e.preventDefault();
  const { elements: { delay, step, amount },} = e.currentTarget;
  console.log(`First delay: ${delay.value}, Delay step: ${step.value}, Amount: ${amount.value}`);
  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, delayEl)
      .then(successInPromise)
      .catch(errorInPromise);
    delayEl += stepEl;
  }
}
function successInPromise({position, delay}) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}
function errorInPromise({position, delay}) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}