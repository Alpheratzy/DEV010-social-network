// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAKmsT2G9HmU8IliuMV5LvQfg0zlJXb4TM",
  authDomain: "social-2fe53.firebaseapp.com",
  projectId: "social-2fe53",
  storageBucket: "social-2fe53.appspot.com",
  messagingSenderId: "731301316462",
  appId: "1:731301316462:web:eb40248e0d43045ace637f"
};

// Initialize Firebase
// En esta variable esta guardada la app de Firebase.
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default firebaseApp;
export { db, auth };

// En esta variable le instalo el auth a la app.
