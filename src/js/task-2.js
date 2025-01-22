//TODO: Practice with mock api

//! =============================== Отримання списку постів (GET) ===============================
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

//* Add event listener
const onGetPostClick = event => {
    fetch('https://67911779af8442fd7378ff4e.mockapi.io/UserPosts')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        })
        .then(postsObj => {
            postsHTML = [];

            postsObj.forEach(element => {
                postsHTML.push(`
                    <div class="post-container">
                        <h2 class="post-title">${element.title} - ${element.author}</h2>
                        <p class="post-content">${element.content}</p>
                        <p class="post-id">POST ID:${element.id}</p>
                    </div>
                    `);
            });

            postsContainer.insertAdjacentHTML('beforeend', postsHTML.join(''));
        })
}

getPostBtn.addEventListener('click', onGetPostClick);

//! =============================== Отримання інформації про користувача за ID ===============================
const getUser = async id => {
    try {
        const response = await fetch(`https://67911779af8442fd7378ff4e.mockapi.io/UserPosts/${id}`);
        
        if (!response.ok) {
            throw new Error(response.status);
        }

        const postData = await response.json();
        return {
            name: postData.author,
            email: postData.email
        }
    } catch (err) {
        console.log(err);
    }
}


const userInfo = await getUser(1);
console.log(userInfo.name);

idBtn.addEventListener('click', async event => {
    if (idInput.value.trim() === '') {
        return;
    }

    try {
        const author = await getUser(idInput.value.trim());
        
        iziToast.info({
            timeout: 7000,
            overlay: true,
            title: 'User Info:',
            titleSize: '55',
            message: `Name: ${author.name} | Email: ${author.email}`,
            messageSize: '50',
            position: 'center',
            drag: false,
        });

        idInput.value = ''
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
});

//! =============================== Створення нового поста (POST) ===============================
const createPost = postInfo => {
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(postInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(`https://67911779af8442fd7378ff4e.mockapi.io/UserPosts`, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }

            onGetPostClick();
            return response.json();
        })
}

createBtn.addEventListener('click', async event => {
    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        return;
    }

    const newPost = {
        author: 'Alex',
        email: 'test@gmail.com',
        title: `${titleInput.value}`,
        content: `${contentInput.value}`
    }

    const response = await createPost(newPost);
})