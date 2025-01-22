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

const titleInput = document.querySelector('.post-title-input');
const contentInput = document.querySelector('.post-content-input');
const createBtn = document.querySelector('.create-btn');
let postsHTML = [];


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
        postsHTML = [];
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
        console.log(err);
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

//TODO:  Створення нового поста (POST)
//? Напиши функцію createPost(title, body), яка створює новий пост через POST-запит на https://jsonplaceholder.typicode.com/posts
const createPost = (postInfo) => {
    const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(postInfo),
    headers: {
        'content-type': 'application/json',
    },
    };

    return fetch('https://jsonplaceholder.typicode.com/posts', fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        })
        .then(newPost => {
            postsHTML.push(
                `
            <div class="post-container">
                <h2 class="post-title">${newPost.title}</h2>
                <p class="post-content">${newPost.body}</p>
                <p class="post-id">POST ID:${newPost.id}</p>
            </div>
            `
            );

            postsContainer.insertAdjacentHTML('beforeend', postsHTML[postsHTML.length - 1])
        })
}

createBtn.addEventListener('click', event => {
    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        return;
    }

    createPost({
    title: `${titleInput.value}`,
    body: `${contentInput.value}`
    })
    .then(book => {
        console.log(book);

        titleInput.value = '';
        contentInput.value = '';
    })
})

//TODO: Оновлення поста (PUT)
//? Напиши функцію updatePost(id, newTitle, newBody), яка змінює існуючий пост (PUT-запит на https://jsonplaceholder.typicode.com/posts/{id}).

const updatePost = (id, newTitle, newBody) => {
    const updatedData = {
        title: newTitle,
        body: newBody
    }

    const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(updatedData)
    }

    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }

            return response.json();
    })
}

updatePost(1, 'My title', 'My content')
    .then(data =>{
        console.log(data)
    })