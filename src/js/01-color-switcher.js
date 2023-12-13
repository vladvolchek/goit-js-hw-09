const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');


let timerId = null;



const changeBackgroundColor = () => {
    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    }
    document.body.style.backgroundColor = getRandomHexColor();
};

startBtn.addEventListener('click', () => {
    timerId = setInterval(changeBackgroundColor, 1000);
    startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.disabled = false;
});
