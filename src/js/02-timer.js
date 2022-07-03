import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startTimerBtn = document.querySelector('button[data-start]');
const startTime = document.querySelector('input[type="text"]');
// startTimerBtn.addEventListener('click', makeBtnDisabled)
startTimerBtn.setAttribute('disabled', 'disabled');
daysEl = document.querySelector('[data-days]');
hoursEl = document.querySelector('[data-hours]');
minutesEl = document.querySelector('[data-minutes]');
secondsEl = document.querySelector('[data-seconds]');
console.log(daysEl.textContent)
inventId = null;

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
        inventId = setInterval(() => {
            const current = Date.now();
            let timerValue = selectedTime - current;
            const { days, hours, minutes, seconds } = convertMs(timerValue);
            startTimerBtn.setAttribute('disabled', 'disabled');
            console.log({ days, hours, minutes, seconds });
            daysEl.textContent = `${days}`;
            hoursEl.textContent = `${hours}`;
            minutesEl.textContent = `${minutes}`;
            secondsEl.textContent = `${seconds}`;
            if ( timerValue = 0) {
                clearInterval(inventId)
            }
          }, 1000);
    },
  }
flatpickr('input[type="text"]', options);

// function makeBtnDisabled () {
//     startTimerBtn.removeAttribute('disabled');
// }



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
