import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onBtnSubmit);

function createPromise(delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      }
      reject(delay);
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
    createPromise(delayEl)
      .then(resultOfPromise => successInPromise(i, resultOfPromise))
      .catch(resultOfPromise => errorInPromise(i, resultOfPromise));
    delayEl += stepEl;
  }
}

function successInPromise(a, b) {
  console.log(`✅ Fulfilled promise ${a} in ${b}ms`);
  Notify.success(`Fulfilled promise ${a} in ${b}ms`);
}
function errorInPromise(a, b) {
  console.log(`❌ Rejected promise ${a} in ${b}ms`);
  Notify.failure(`Rejected promise ${a} in ${b}ms`);
}
