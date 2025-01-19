//TODO: Отримання списку постів (GET)
//? Напиши функцію getPosts(), яка отримує список постів із https://jsonplaceholder.typicode.com/posts і виводить їх у консоль.
//? Відобрази заголовки постів у списку на сторінці.
//? Оброби помилку (catch), якщо сервер недоступний.

//* Find elements
const postsContainer = document.querySelector('.posts-container');
const getPostBtn = document.querySelector('.get-post-btn');
const postContainer = document.querySelector('.post-container');

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

const getUser = id => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();
        }
        )
        .then(postData => {
            console.log(postData.name);
            console.log(postData.email);
        })
        .catch(err => {
            console.log('Користувача не знайдено')
        });
}

getUser(1);