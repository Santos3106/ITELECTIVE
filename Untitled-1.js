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

const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

alert('Welcome to OrdiNizer!');

const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./users.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize DB
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashed], err => {
        if (err) return res.status(400).send("User already exists");
        res.send("Registered successfully");
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (!user) return res.status(400).send("User not found");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(403).send("Wrong password");
        req.session.user = user;
        res.send("Logged in successfully");
    });
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged out");
});

// Protected route example
app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.status(401).send("Login required");
    res.send(`Hello ${req.session.user.username}`);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
