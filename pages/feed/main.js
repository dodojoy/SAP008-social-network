import { getAuth } from '../../lib/firebase.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  like,
} from '../../lib/index.js';

import { app } from '../../lib/configuration.js';

const auth = getAuth(app);
export default () => {
  const feedContainer = document.createElement('div');
  const template = `
  <header>
  
  <img src="img/Rebu.png" alt="rebu logo">
  <input type="search" placeholder="Busque por post">
      <img src="" alt="" id="user-profile-picture-header">
      <button id="logout-btn"><img src="" alt=""></button>

      <nav class="tag-filter">

      <button class="tag-button">MÚSICA</button>
      <button class="tag-button">TV</button>
      <button class="tag-button">EVENTOS</button>
      <button class="tag-button">PETS</button>
      <button class="tag-button">HOBBIES</button>
        <button class="tag-button">POLÍTICA</button>
        
        </nav>

        </header>
        
    <main>
    
    <section id="create-post">
    
    <div id="user-profile-picture-div">
    <img src="" alt="" class="" class="user-profile-picture-post">
    </div>
    
        <textarea name="" id="text-post" cols="30" rows="10" style="resize:none" maxlength="200"></textarea>

        <div class="create-post-box-buttons">
          <select>
            <option selected disabled>Categoria</option>
            </select>
          <button id="publish-btn">Publicar</button>
          <button id="delete-btn">Deletar</button>
          </div>
          
          </section>
          
          <section id="feed-post"></section>

          <div id="fade" class="none"></div>

          <div id="modal-delete" class="none">
            <span class="close-modal">X</span>
            <span>Tem certeza que deseja deletar?</span>
            <button class="btn-delete">Deletar</button>
          </div>

          </main>
          
          <footer>
          <img src="" alt="" >
          </footer>
          `;

  feedContainer.innerHTML = template;

  const publishBtn = feedContainer.querySelector('#publish-btn');
  const textPost = feedContainer.querySelector('#text-post');
  const fade = feedContainer.querySelector('#fade');
  const modal = feedContainer.querySelector('#modal-delete');

  function toggle() {
    modal.classList.toggle('none');
    fade.classList.toggle('none');
  }

  const printPosts = async () => {
    const postArr = await getAllPosts();
    const postsTemplate = postArr.map((post) => `
        <div class="post">
          <div class="header-post">
            <img class="user-photo-post" src="" alt="">
            <h2 class="user-name-post">${post.name}</h2>
            <button data-id-post-edit="${post.id}" id="edit-post-btn"><img class="edit-post-icon" src="img/icons/pencil-icon.png" alt="edit button"></button>
            <span data-id-post-trashcan="${post.id}" class="delete-post-btn"><img class="delete-post-icon" src="img/icons/trashcan-icon.png" alt="delete button"></span>
          </div>
          <p class="text-post">${post.text}</p>
          <div class="footer-post">
            <p class="date-post">${post.id}</p>
            <span class="like-btn-post" data-id-post-like="${post.id}" ><img src="img/icons/empty-like-icon.png" class="like-post-icon" alt="like button"></span>
            <p class="all-likes-post">${post.like.length}</p>
          </div>
        </div>
    `).join('');

    feedContainer.querySelector('#feed-post').innerHTML = postsTemplate;

    // const confirmDeletePost = feedContainer.querySelector('.btn-delete');
    const closeModal = feedContainer.querySelector('.close-modal');
    const trashcanBtn = Array.from(feedContainer.querySelectorAll('.delete-post-btn'));
    const likeBtns = Array.from(feedContainer.querySelectorAll('.like-btn-post'));
    const numLikes = feedContainer.querySelector('.all-likes-post');

    trashcanBtn.forEach((btn) => {
      btn.addEventListener('click', (el) => {
        const idPostDelete = el.currentTarget.dataset.idPostTrashcan;
        deletePost(idPostDelete);
        printPosts();
        // toggle();
      });
    });

    [fade, closeModal].forEach((el) => {
      el.addEventListener('click', () => {
        toggle();
      });
    });

    /* confirmDeletePost.addEventListener('click', (el) => {
      const idPostDelete = el.currentTarget.dataset.idPostTrashcan;
      console.log(idPostDelete);
      deletePost(idPostDelete);
      toggle();
    }); */

    likeBtns.forEach((btn) => {
      btn.addEventListener('click', async (el) => {
        const idPostLike = el.currentTarget.dataset.idPostLike;
        const user = auth.currentUser.uid;
        const newLike = await like(idPostLike, user);

        numLikes.innerHTML = newLike;
      });
    });
  };

  publishBtn.addEventListener('click', () => {
    createPost(textPost.value);
    printPosts();
  });

  printPosts();

  return feedContainer;
};
