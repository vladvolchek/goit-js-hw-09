import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const input = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');

const timer = document.querySelector('.timer');

const days = document.querySelector('[data-days]');

const hours = document.querySelector('[data-hours]');

const minutes = document.querySelector('[data-minutes]');

const seconds = document.querySelector('[data-seconds]');

let targetDate = null;
let timerId = null;





const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const data = selectedDates[0];
        if (data > Date.now()) {
            targetDate = data;
            startBtn.disabled = false;
        } else {
            Notiflix.Notify.failure('Please choose a date in the future')
        }
    },
};

flatpickr(input, options);

const addLeadingZero = value => {
    return value < 10 ? `0${value}` : value;
};


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}



const updateTimer = () => {
    const res = targetDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(res);
    const formattedDays = addLeadingZero(days);
    const formattedHours = addLeadingZero(hours);
    const formattedMinutes = addLeadingZero(minutes);
    const formattedSeconds = addLeadingZero(seconds);
    timer.querySelector('[data-days]').textContent = formattedDays;
    timer.querySelector('[data-hours]').textContent = formattedHours;
    timer.querySelector('[data-minutes]').textContent = formattedMinutes;
    timer.querySelector('[data-seconds]').textContent = formattedSeconds;
    if (res <= 0) {
        clearInterval(timerId);
        Notiflix.Notify.success('Time is up!');
        timer.querySelector('[data-days]').textContent = '00';
        timer.querySelector('[data-hours]').textContent = '00';
        timer.querySelector('[data-minutes]').textContent = '00';
        timer.querySelector('[data-seconds]').textContent = '00';
        startBtn.disabled = false;
    }

};


startBtn.addEventListener('click', () => {
    timerId = setInterval(updateTimer, 1000);
    startBtn.disabled = true;

});