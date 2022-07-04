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
