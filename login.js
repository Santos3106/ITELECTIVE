// Firebase SDK v9+ modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAjiIPMhyXpl8L-bfzdQo-yGfD2DhFy4DQ",
  authDomain: "login-register-a6dee.firebaseapp.com",
  databaseURL: "https://login-register-a6dee-default-rtdb.firebaseio.com",
  projectId: "login-register-a6dee",
  storageBucket: "login-register-a6dee.appspot.com",
  messagingSenderId: "807873909453",
  appId: "1:807873909453:web:d6d11737294c2ea4158f84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// UI toggle
const container = document.querySelector('.container');
document.querySelector('.register-btn').addEventListener('click', () => container.classList.add('active'));
document.querySelector('.login-btn').addEventListener('click', () => container.classList.remove('active'));

// Login logic
document.querySelector('.form-box.login form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;
      alert("Login successful!");
      window.location.href = "MainPAge.html";
      //...
    })
    .catch((error) => {
      const errorCode = error.code;

      if (errorCode === 'auth/user-not-found') {
        alert("User not found.");
      } else if (errorCode === 'auth/wrong-password') {
        alert("Incorrect password.");
      } else {
        alert("Login failed: " + error.message);
      }

  }).catch((error) => {
    alert("Error: " + error.message);
  });
});
