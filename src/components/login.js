import {
  getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,
} from 'firebase/auth';
import colectiveIsCool from '../assets/Colective_isCool.png';
import eyeShut from '../assets/shutEye.png';
import eyeOpen from '../assets/openEye.png';
import darkGoogle from '../assets/btn_google_signin.png';
import firebaseApp from './firebase.js';

function login() {
  const logo = document.createElement('img');

  logo.setAttribute('src', colectiveIsCool);
  logo.setAttribute('alt', 'Colective_isCool');
  logo.setAttribute('id', 'logo');

  const section = document.createElement('section');
  const titleLogin = document.createElement('h2');
  titleLogin.textContent = 'Inicio de sesión';
  titleLogin.classList.add('login-title');

  // elementos para correo y contraseña
  const emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Correo electronico');
  emailInput.setAttribute('id', 'emailInput');
  emailInput.setAttribute('name', 'emailInput');

  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Contraseña');
  passwordInput.setAttribute('id', 'passwordInput');
  passwordInput.setAttribute('name', 'passwordInput');

  // Crear enlaces para registrarse y recuperar contraseña
  const signUpLink = document.createElement('a');
  signUpLink.textContent = 'Registrarse';
  signUpLink.setAttribute('href', '/newUser'); // hay que poner la url
  signUpLink.classList.add('sign-up');

  const forgotPasswordLink = document.createElement('a');
  forgotPasswordLink.textContent = '¿Olvidaste tu contraseña?';
  forgotPasswordLink.setAttribute('href', '/recover');// poner url
  forgotPasswordLink.classList.add('forgot-password');

  // crear boton de inicio de sesion
  const loginButton = document.createElement('button');
  loginButton.textContent = 'Iniciar Sesión';
  loginButton.setAttribute('id', 'loginButton');
  loginButton.classList.add('login-button');
  loginButton.setAttribute('disabled', true);

  function autenticacionUser(email, password) {
    return new Promise((resolve, reject) => {
      const Auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(Auth, email, password)
        .then(() => {
          resolve('Inicio de sesion exitoso');
        })
        .catch((error) => {
          reject(`Error al iniciar sesion: ${error.message}`);
        });
    });
  }
  function verificarCampos() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const botonHabilitado = email.length > 0 && password.length > 0;
    loginButton.disabled = !botonHabilitado;
  }
  emailInput.addEventListener('input', verificarCampos);
  passwordInput.addEventListener('input', verificarCampos);

  loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    autenticacionUser(email, password)
      .then((successMessage) => {
        window.location.href = '/timeLine';
        // console.log(successMessage);
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('El correo electronico ingresado no esta registrado.');
        } else {
          // console.log(error);
        }
      });
  });

  const btnShowPass = document.createElement('button');
  btnShowPass.setAttribute('id', 'btnShowPass');
  btnShowPass.classList = 'btnShowPassword';
  btnShowPass.setAttribute('style', `background-image: url(${eyeShut})`);
  btnShowPass.classList = 'buttonsShowHidePassword';

  passwordInput.insertAdjacentElement('afterend', btnShowPass);

  let passwordVisible = false; // vamos a rastrear si la contrasena es visible

  btnShowPass.addEventListener('click', () => {
    if (passwordVisible) {
      passwordInput.type = 'password'; // ocultar contrasena
      btnShowPass.setAttribute('style', `background-image: url(${eyeShut})`);
    } else {
      passwordInput.type = 'text'; // mostrar contrasena
      btnShowPass.setAttribute('style', `background-image: url(${eyeOpen})`);
    }
    passwordVisible = !passwordVisible; // Cambiar el estado de visibilidad
  });

  // creamos opcion para inicar sesion con google
  const googleSignInOption = document.createElement('div');
  const googleSignInLink = document.createElement('img');
  googleSignInLink.setAttribute('id', 'googleSignInLink');
  googleSignInLink.setAttribute('src', darkGoogle); // poner url
  googleSignInLink.setAttribute('alt', 'Google Sign-In');
  googleSignInOption.appendChild(googleSignInLink);

  googleSignInLink.addEventListener('click', (e) => {
    e.preventDefault(); // evita que el enlace cambie de pagina (usamos "#" como href)

    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Inicio de sesion con Google exitoso:', user);
        window.location.href = './timeLine';
      })
      .catch((error) => {
        console.error('Error al iniciar sesion con Google:', error);
      });
  });

  // poner todos los elmentos en el section
  section.append(
    logo,
    titleLogin,
    emailInput,
    passwordInput,
    btnShowPass,
    signUpLink,
    forgotPasswordLink,
    loginButton,
    googleSignInOption,
  );
  return section;
}

export default login;
