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

const makePromise = new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    resolve('promise succes')
  }
  reject('promise error');
}, 2000);
});
makePromise.then(succes, mistake);
function succes(result) {
  console.log(`${result}`)
}
function mistake(error) {
  console.log(`${error}`)
}
function onBtnSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
}














