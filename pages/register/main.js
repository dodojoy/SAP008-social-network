export default () => {
  const registerContainer = document.createElement('div');
  const template = `
        <header id="return-btn" class="register-login-header display-flex">
            <img class="return-btn" src="img/returnBtn.png" alt="back arrow">
            <h1><img class="img-logo-register" src="img/Rebu.png" alt="rebu logo"></h1>
        </header>
        <main class="register-content display-flex">
            <form class="register-login display-flex">
                <legend class="login-text">CADASTRAR</legend>
                <input id="register-input" class="input-style" type="email" placeholder="E-MAIL">
                <input type="password" id="password-register" class="input-style" placeholder="SENHA">
                <input type="password" id="password-register-confirm" class="input-style" placeholder="CONFIRME SUA SENHA">
                <input type="submit" class="btn-register" value="CADASTRAR">
            </form>
            <button class="btn-google-register display-flex"><img class="google-btn-register" src="img/googleIcon.png" alt="google logo">CADASTRE-SE COM O GOOGLE</button>
        </main>
    `;
  registerContainer.innerHTML = template;

  const returnBtn = registerContainer.querySelector('#return-btn');
  returnBtn.addEventListener('click', () => window.location.replace('#homepage'))
  return registerContainer;
};
