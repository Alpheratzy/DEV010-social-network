import { getAuth, updatePassword } from 'firebase/auth';
import firebaseApp from './firebase.js';

const auth = getAuth(firebaseApp);

function resetPassword() {
  const logo = document.createElement('img');
  logo.setAttribute('src', 'assets/logo256.png');
  logo.setAttribute('class', 'logoRecover');

  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = 'Reiniciar contraseña';

  const newPass = document.createElement('input');
  newPass.setAttribute('id', 'newPassword');
  newPass.setAttribute('type', 'password');
  newPass.setAttribute('placeholder', 'Escribe tu nueva contraseña');

  const confirmPass = document.createElement('input');
  confirmPass.setAttribute('id', 'confirmPassword');
  confirmPass.setAttribute('type', 'password');
  confirmPass.setAttribute('placeholder', 'Escribe de nuevo tu contraseña');

  const btnShowPass = document.createElement('button');
  btnShowPass.setAttribute('id', 'btnShowPass');
  btnShowPass.classList = 'buttonsShowHidePassword';
  btnShowPass.style.backgroundImage = 'url(assets/shutEye.png)';

  const btnNewPass = document.createElement('button');
  btnNewPass.setAttribute('id', 'btnNewPassword');
  btnNewPass.textContent = 'Reiniciar contraseña';
  btnNewPass.setAttribute('class', 'buttonRecover');

  btnShowPass.addEventListener('click', () => {
    if (newPass.type === 'password' || confirmPass.type === 'password') {
      newPass.type = 'text';
      confirmPass.type = 'text';
      btnShowPass.style.backgroundImage = 'url(assets/openEye.png)';
    } else {
      newPass.type = 'password';
      confirmPass.type = 'password';
      btnShowPass.style.backgroundImage = 'url(assets/shutEye.png)';
    }
  });

  btnNewPass.addEventListener('click', async () => {
    if (newPass.value === '' || confirmPass.value === '') {
      // console.log('Por favor escribe tu nueva contraseña');
      return;
    }
    if (newPass.value !== confirmPass.value) {
      // console.log('Contraseñas no coinciden');
      return;
    }
    if (newPass.value.length < 6) {
      // console.log('La contraseña tiene que tener más de 6 caracteres');
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPass.value);
      // console.log('Contraseña actualizada');
    } catch (error) {
      // console.log(error);
    }
  });

  section.append(logo, title, newPass, confirmPass, btnShowPass, btnNewPass);
  return section;
}

export default resetPassword;
