//! ======================================== Асинхронність  ========================================

//TODO: Створіть веб-сторінку з кнопкою "Отримати дані". Після натискання кнопки через 3 секунди виведіть у консоль повідомлення "Дані отримано".
//? Використовуйте setTimeout для імітації затримки відповіді сервера.
//? Додайте індикатор завантаження ("Завантаження..."), який зникне після завершення затримки.

//* Find elements
const dataBtn = document.querySelector('.receive-data-btn'); 
const btnBox = document.querySelector('.button-box');

//* Add event listener
const onDataBtnClick = event => {
    setTimeout(() => {
        dataBtn.textContent = 'Nice! Data is downloaded';
        
        dataBtn.classList.add('disabled');
        const loadingBar = document.querySelector('.loading-bar');
        loadingBar.remove();
    }, 5000)

    btnBox.insertAdjacentHTML('beforeend', `
        <ul class = 'loading-bar'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        `)
}

dataBtn.addEventListener('click', onDataBtnClick);