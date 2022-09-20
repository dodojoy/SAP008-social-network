import { logoff } from '../../lib/index.js'

export default () => {
  const feedContainer = document.createElement('div');
  const template = `
    <div>
      banana 🍌
      <a href="#homepage" id="sign-out">sair</a>
    </div>
  `;

  feedContainer.innerHTML = template;
  
  const signOut = feedContainer.querySelector('#sign-out');
  signOut.addEventListener('click', () => {
    logoff()
    .then(() => {
      console.log("funciona")
    }).catch((error) => {
      // An error happened.
    });
  })

  return feedContainer;
}