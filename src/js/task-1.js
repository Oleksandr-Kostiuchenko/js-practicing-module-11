//TODO: Отримання списку постів (GET)
//? Напиши функцію getPosts(), яка отримує список постів із https://jsonplaceholder.typicode.com/posts і виводить їх у консоль.
//? Відобрази заголовки постів у списку на сторінці.
//? Оброби помилку (catch), якщо сервер недоступний.

//* Load library
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//* Find elements
const postsContainer = document.querySelector('.posts-container');
const getPostBtn = document.querySelector('.get-post-btn');
const postContainer = document.querySelector('.post-container');
const idInput = document.querySelector('.user-id-input');
const idBtn = document.querySelector('.get-info-btn');

//* Add event listener & function
const onGetPostClick = event => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        }
    ).then(postData => {
        const postsHTML = [];
        console.log(postData);

        postData.forEach(post => {
            postsHTML.push(`
            <div class="post-container">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-content">${post.body}</p>
                <p class="post-id">POST ID:${post.id}</p>
            </div>`
            );
        });

        postsContainer.insertAdjacentHTML('beforeend', postsHTML.join(''));
    })
    .catch(err => {
        console.log(err);
    })
}

getPostBtn.addEventListener('click', onGetPostClick);

//TODO: Отримання інформації про пост за ID (GET)
//? Створи функцію getUser(id), яка приймає id і виконує запит на https://jsonplaceholder.typicode.com/users/{id}.
//? Відобрази ім'я та email користувача в консоль.
//? Якщо користувача немає (404), виведи повідомлення "Користувача не знайдено".

const getUser = async id => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
            throw new Error(response.status);
        }

        const postData = await response.json();
        return {
            name: postData.name,
            email: postData.email
        };
    } catch (err) {
        
    }
}

idBtn.addEventListener('click', async event => {
    if (idInput.value.trim() === '') {
        return;
    }

    try {
        const user = await getUser(idInput.value);

        iziToast.info({
            timeout: 7000,
            overlay: true,
            title: 'User Info:',
            titleSize: '55',
            message: `Name: ${user.name} | Email: ${user.email}`,
            messageSize: '50',
            position: 'center',
            drag: false,
        });

        idInput.value = '';
    } catch (err) {
        iziToast.error({
            timeout: 2000,
            overlay: true,
            title: 'Error',
            titleSize: '55',
            message: `User is not found!`,
            messageSize: '50',
            position: 'center',
            drag: false,
        });
    }

        idInput.value = '';
})