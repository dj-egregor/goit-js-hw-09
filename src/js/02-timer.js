import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timeSetup = document.querySelector('#datetime-picker');

startBtn.addEventListener('click', startTimer);

startBtn.disabled = true;
let timeObj = {};
let timeLeft = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentUnixTime = new Date().getTime();
    const selectedTime = new Date(selectedDates[0]).getTime();
    if (selectedTime <= currentUnixTime) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
    timeLeft = selectedTime - currentUnixTime;
    timeObj = convertMs(timeLeft);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, '0');
  }
  return value;
}

function startTimer() {
  startBtn.disabled = true;
  const timer = setInterval(() => {
    timeObj = convertMs(timeLeft);
    let { days, hours, minutes, seconds } = timeObj;
    daysEl.innerHTML = addLeadingZero(days);
    hoursEl.innerHTML = addLeadingZero(hours);
    minutesEl.innerHTML = addLeadingZero(minutes);
    secondsEl.innerHTML = addLeadingZero(seconds);
    timeLeft -= 1000;
    if (timeLeft <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}
