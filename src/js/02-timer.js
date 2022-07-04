import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const containerEl = document.querySelector('.timer');

containerEl.style.display = 'flex';
containerEl.style.marginTop = '30px';
containerEl.style.justifyContent = 'space-evenly';
containerEl.style.fontSize = '50px';

// const timerId = null
const inputTime = document.querySelector('input[type="text"]');
const startTimerBtn = document.querySelector('button[data-start]');
startTimerBtn.setAttribute('disabled', 'disabled');

daysEl = document.querySelector('[data-days]');
hoursEl = document.querySelector('[data-hours]');
minutesEl = document.querySelector('[data-minutes]');
secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    const selectedTime = selectedDates[0].getTime();
    console.log(selectedTime);
    if (selectedTime < currentTime) {
      Report.failure('Error', 'Please choose a date in the future', 'Fix date');
      return;
    }
    startTimerBtn.removeAttribute('disabled');
  },
};
flatpickr('input[type="text"]', options);

function startTimer() {
  const selectedTimeAtInput = Date.parse(inputTime.value);
  console.log(selectedTimeAtInput);
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
      clearInterval(timerId)
    }
  }, 0);

}
startTimerBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
