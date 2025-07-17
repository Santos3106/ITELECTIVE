// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAjiIPMhyXpl8L-bfzdQo-yGfD2DhFy4DQ",
    authDomain: "login-register-a6dee.firebaseapp.com",
    projectId: "login-register-a6dee",
    storageBucket: "login-register-a6dee.firebasestorage.app",
    messagingSenderId: "807873909453",
    appId: "1:807873909453:web:d6d11737294c2ea4158f84"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const login = document.getElementById('login').value;
login.addEventListener("click",function (event) {
event.preventDefault()
})
