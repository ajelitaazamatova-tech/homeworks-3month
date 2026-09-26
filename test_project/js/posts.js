const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const postsContainer = document.querySelector('#posts-container');
const DEFAULT_IMAGE = 'https://thumbs.dreamstime.com/b/none-412873474.jpg';

const getPosts = async () => {
    try {
        const response = await fetch(POSTS_API);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        console.error('Ошибка загрузки постов:', error);
        if (postsContainer) {
            postsContainer.innerHTML = `<p style="color: red; text-align: center;">Не удалось загрузить данные: ${error.message}</p>`;
        }
    }
};
const renderPosts = (posts) => {
    if (!postsContainer) return;
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
        const card = document.createElement('div');
        card.classList.add('post_card');
        card.innerHTML = `
            <img src="${DEFAULT_IMAGE}" alt="Post Image">
            <h3>${post.title}</h3>
            <p>${post.body}</p>`;
        postsContainer.appendChild(card);
    });
};
getPosts();