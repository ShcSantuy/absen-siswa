// Menunggu semua elemen HTML dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA UNTUK HALAMAN LOGIN (index.html) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const togglePassword = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('password');
        const errorNotification = document.getElementById('error-notification');
        const loadingSplash = document.getElementById('loading-splash');

        // Fungsi untuk ikon mata (toggle password visibility)
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Ganti ikon mata
            togglePassword.classList.toggle('fa-eye-slash');
        });

        // Fungsi saat form login disubmit
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Mencegah halaman refresh
            
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            // Sembunyikan notifikasi error jika ada
            errorNotification.style.display = 'none';

            // Cek username & password (sementara, karena belum ada backend)
            // Ganti 'guru' dan '12345' sesuai keinginan Anda
            if (username === 'kelas Xll atu' && password === 'Xll atu') {
                // Jika benar, tampilkan loading splash
                loginForm.style.display = 'none';
                loadingSplash.style.display = 'block';

                // Tunggu 2 detik, lalu pindah ke halaman dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000); // 2000 milidetik = 2 detik

            } else {
                // Jika salah, tampilkan notifikasi error
                errorNotification.style.display = 'block';
            }
        });
    }


    // --- LOGIKA UNTUK HALAMAN DASHBOARD (dashboard.html) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
        // Fungsi untuk tombol hamburger
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

});
