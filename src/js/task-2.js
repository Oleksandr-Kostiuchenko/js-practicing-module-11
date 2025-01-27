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

const updateTitleInput = document.querySelector('.post-title-update')
const updateContentInput = document.querySelector('.post-content-update')
const idInputUpdate = document.querySelector('.update-id-input');
const updateBtn = document.querySelector('.update-btn')

const deleteInput = document.querySelector('.post-id-delete');
const deleteBtn = document.querySelector('.delete-btn');

const loadBtn = document.querySelector('.load-btn');
loadBtn.classList.add('is-hidden');
let postsHTML = [];
let page = 1;
let actualSearch = [];

//* Add event listener
const onGetPostClick = event => {
    fetch(`https://67911779af8442fd7378ff4e.mockapi.io/UserPosts?limit=10&page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            loadBtn.classList.add('is-hidden');

            return response.json();
        })
        .then(postsObj => {
            postsHTML = [];
            actualSearch = [];
            postsContainer.innerHTML = '';
            
            postsObj.forEach(element => {
                postsHTML.push(`
                    <div class="post-container">
                        <h2 class="post-title">${element.title} - ${element.author}</h2>
                        <p class="post-content">${element.content}</p>
                        <p class="post-id">POST ID:${element.id}</p>
                    </div>
                    `);
                actualSearch.push(`
                    <div class="post-container">
                        <h2 class="post-title">${element.title} - ${element.author}</h2>
                        <p class="post-content">${element.content}</p>
                        <p class="post-id">POST ID:${element.id}</p>
                    </div>
                    `);
            });

            postsContainer.insertAdjacentHTML('beforeend', postsHTML.join(''));

            loadBtn.classList.remove('is-hidden')
        })
}

getPostBtn.addEventListener('click', onGetPostClick);
loadBtn.addEventListener('click', event => {

    page++;
    console.log(page);
    onGetPostClick();
})

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

idBtn.addEventListener('click', async event => {
    if (idInput.value.trim() === '') {
        return;
    }

    try {
        const author = await getUser(idInput.value.trim());
        idInput.value = '';
        
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
    try {
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
                
                return response.json();
            })
    } catch (err) {
        console.log(err);
    }
}

createBtn.addEventListener('click', async event => {
    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        return;
    }

    try {
        const newPost = {
            author: 'Alex',
            email: 'test@gmail.com',
            title: `${titleInput.value}`,
            content: `${contentInput.value}`
        }

        const response = await createPost(newPost);
        titleInput.value = '';
        contentInput.value = '';
        onGetPostClick();
    } catch (err) {
        console.log(err);
    }
})

//! =============================== Оновлення поста (PUT) ===============================
//? Напиши функцію updatePost(id, newTitle, newBody), яка змінює існуючий пост (PUT-запит на https://jsonplaceholder.typicode.com/posts/{id}).

const updatePost = (id, newTitle, newBody) => {
    try {
        const newPost = {
            title: newTitle,
            content: newBody
        }

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`https://67911779af8442fd7378ff4e.mockapi.io/UserPosts/${id}`, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }

                return response.json();
            })
        
    } catch(err){
        console.log(err);
    }
}

updateBtn.addEventListener('click', async event => {
    if (idInputUpdate.value.trim() === '' || updateTitleInput.value.trim() === '' || updateContentInput.value.trim() === '') {
        return
    }
    
    try {
        const response = await updatePost(idInputUpdate.value.trim(), updateTitleInput.value.trim(), updateContentInput.value.trim());
        idInputUpdate.value = '';
        updateTitleInput.value = '';
        updateContentInput.value = '';
        onGetPostClick();
    } catch (err) {
        console.log(err);
    }
})

//! =============================== Видалення поста (DELETE) ===============================
//? Напиши функцію deletePost(id), яка видаляє пост (DELETE-запит на https://jsonplaceholder.typicode.com/posts/{id}).

const deletPost = id => {
    const fetchOptions = {
        method: 'DELETE',
    }

    return fetch(`https://67911779af8442fd7378ff4e.mockapi.io/UserPosts/${id}/`, fetchOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

deleteBtn.addEventListener('click', async event => {
    if (deleteInput.value.trim() === '') {
        return;
    }

    try {
        const response = await deletPost(deleteInput.value.trim());

        deleteInput.value = '';
        onGetPostClick();
    } catch (err) {
        console.log(err);
    }
})