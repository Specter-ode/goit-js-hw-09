import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input[name=delay]');
const stepEl = document.querySelector('input[name=step]');
const amountEl = document.querySelector('input[name=amount]');
console.log(stepEl.value)
formEl.addEventListener('submit', onBtnSubmit);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
console.log(delayEl.value += stepEl.value)
console.log(amountEl.value += stepEl)
const makePromise = () => {
  return new Promise ((resolve, reject))
}

function onBtnSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
}