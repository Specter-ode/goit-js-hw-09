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
function successInPromise(position, timeOfDelay) {
  console.log(`✅ Fulfilled promise ${position} in ${timeOfDelay}ms`);
  Notify.success(`Fulfilled promise ${position} in ${timeOfDelay}ms`);
}
function errorInPromise(position, timeOfDelay) {
  console.log(`❌ Rejected promise ${position} in ${timeOfDelay}ms`);
  Notify.failure(`Rejected promise ${position} in ${timeOfDelay}ms`);
}