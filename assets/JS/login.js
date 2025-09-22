// File: assets/js/login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Pastikan bagian ini sama persis
    const validUsername = "kelas Xll atu";
    const validPassword = "Xll atu";

    if (usernameInput === validUsername && passwordInput === validPassword) {
        // Jika benar, arahkan ke halaman dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Jika salah, tampilkan pesan error
        errorMessage.textContent = 'Username atau Password salah.';
    }
});
