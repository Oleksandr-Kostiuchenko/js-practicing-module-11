//! =================================== Дата і час ===================================

//TODO: Реалізуйте таймер зворотного відліку до певної дати, яку задає користувач у форматі YYYY-MM-DD HH:mm:ss.
//? Користувач вводить кількість хвилин у текстове поле.
//? Після натискання кнопки "Старт":
//? На екрані відображається залишок часу у форматі хвилини:секунди.
//? Таймер оновлюється щосекунди.
//? Коли таймер доходить до 00:00, відображається повідомлення "Час вийшов!".
//? Додайте кнопку "Зупинити", щоб користувач міг зупинити таймер раніше.

//* Find elements
const numInput = document.querySelector('.num-input'); 
const startBtn = document.querySelector('.startBtn'); 
const endBtn = document.querySelector('.stop'); 

const time = document.querySelector('.clock');

let timerId = null;


//* Add event listener
const onStartBtnClick = () => {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + Number(numInput.value) * 60000);

    const updateTimer = () => {
        const dateNow = new Date();
        const timeLeft = endDate - dateNow;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            time.textContent = "00:00";
            alert('Час вийшов');
            return;
        }

        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);

        time.textContent = `${minutes}:${seconds}`
    };

    timerId = setInterval(updateTimer, 1000);

    updateTimer();
};

startBtn.addEventListener('click', onStartBtnClick);