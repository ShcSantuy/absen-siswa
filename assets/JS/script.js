// Menunggu seluruh halaman HTML dimuat
document.addEventListener('DOMContentLoaded', function() {

    // --- FUNGSI UNTUK TOMBOL STATUS ABSENSI ---
    const allStatusButtonContainers = document.querySelectorAll('.status-buttons');

    // Loop untuk setiap baris siswa
    allStatusButtonContainers.forEach(container => {
        // Menambahkan event listener ke setiap container
        container.addEventListener('click', function(event) {
            // Cek apakah yang diklik adalah sebuah tombol
            if (event.target.tagName === 'BUTTON') {
                // Ambil semua tombol di dalam container yang sama
                const buttonsInContainer = container.querySelectorAll('button');
                
                // Hapus kelas 'active' dari semua tombol
                buttonsInContainer.forEach(btn => {
                    btn.classList.remove('active');
                });

                // Tambahkan kelas 'active' hanya ke tombol yang diklik
                event.target.classList.add('active');
            }
        });
    });

    // --- FUNGSI UNTUK TOMBOL SIMPAN ---
    const saveButton = document.querySelector('.save-btn');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            alert('Data absensi berhasil disimpan!');
        });
    }

    // --- FUNGSI UNTUK TOMBOL LOGOUT ---
    const logoutButton = document.getElementById('logout-btn');
    if(logoutButton) {
        logoutButton.addEventListener('click', function(event){
            // Mencegah perpindahan halaman langsung
            event.preventDefault(); 
            // Menampilkan konfirmasi
            const userConfirmed = confirm("Apakah Anda yakin ingin logout?");
            if (userConfirmed) {
                // Jika user menekan "OK", arahkan ke halaman login
                window.location.href = logoutButton.href;
            }
        });
    }

});
