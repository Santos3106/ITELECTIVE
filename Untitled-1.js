
// UI toggle
const container = document.querySelector('.container');
document.querySelector('.register-btn').addEventListener('click', () => container.classList.add('active'));
document.querySelector('.login-btn').addEventListener('click', () => container.classList.remove('active'));

// Registration logic
document.querySelector('.form-box.register form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.querySelector('#register-email').value;
  const password = document.querySelector('#register-password').value;

  if (email && password) {
    set(ref(db, 'users/' + email.replace(/\./g, '_')), {
      email: email,
      password: password
    }).then(() => {
      alert("Registration successful!");
    }).catch((error) => {
      alert("Error: " + error.message);
    });
  }
});

// Login logic
document.querySelector('.form-box.login form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  const dbRef = ref(db);
  get(child(dbRef, 'users/' + email.replace(/\./g, '_'))).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data.password === password) {
        alert("Login successful!");
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("User not found.");
    }
  }).catch((error) => {
    alert("Error: " + error.message);
  });
});
