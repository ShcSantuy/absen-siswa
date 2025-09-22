document.addEventListener('DOMContentLoaded', () => {
    // --- DATA SISWA (Bisa diambil dari database nantinya) ---
    const siswaData = [
        { no: 1, nama: "Budi Santoso", lp: "L" },
        { no: 2, nama: "Siti Khasanah", lp: "P" },
        { no: 3, nama: "Ahmad Mubarok", lp: "L" },
        { no: 4, nama: "Dewi Lestari", lp: "P" },
        { no: 5, nama: "Joko Widodo", lp: "L" },
        { no: 6, nama: "Anisa Fitriani", lp: "P" },
        { no: 7, nama: "Eko Prasetyo", lp: "L" },
        { no: 8, nama: "Linda Wati", lp: "P" },
        { no: 9, nama: "Rahmat Hidayat", lp: "L" },
        { no: 10, nama: "Zaskia Putri", lp: "P" }
    ];

    const bulanSelect = document.getElementById('bulan');
    const tahunSelect = document.getElementById('tahun');
    const tabelHead = document.querySelector('#tabel-absensi thead');
    const tabelBody = document.querySelector('#tabel-absensi tbody');
    const tabelFoot = document.querySelector('#tabel-absensi tfoot');
    const exportPdfBtn = document.getElementById('export-pdf-btn');

    // --- INISIALISASI ---
    function init() {
        populateDropdowns();
        renderTable();
        setupEventListeners();
    }

    function setupEventListeners() {
        bulanSelect.addEventListener('change', renderTable);
        tahunSelect.addEventListener('change', renderTable);
        exportPdfBtn.addEventListener('click', exportToPDF);
        tabelBody.addEventListener('change', (e) => {
            if (e.target.tagName === 'SELECT') {
                updateTotals();
            }
        });
    }

    // --- POPULATE DROPDOWNS ---
    function populateDropdowns() {
        const sekarang = new Date();
        const tahunSekarang = sekarang.getFullYear();
        const bulanSekarang = sekarang.getMonth();

        // Bulan
        const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        namaBulan.forEach((bulan, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = bulan;
            if (index === bulanSekarang) option.selected = true;
            bulanSelect.appendChild(option);
        });

        // Tahun
        for (let i = tahunSekarang - 5; i <= tahunSekarang + 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === tahunSekarang) option.selected = true;
            tahunSelect.appendChild(option);
        }
    }

    // --- RENDER TABLE ---
    function renderTable() {
        const tahun = parseInt(tahunSelect.value);
        const bulan = parseInt(bulanSelect.value);
        const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();

        // 1. Buat Header Tabel
        let headerHTML = '<tr><th rowspan="2">No</th><th rowspan="2" class="th-nama">Nama</th><th rowspan="2">L/P</th>';
        headerHTML += `<th colspan="${jumlahHari}">Tanggal</th><th colspan="3">Keterangan</th></tr>`;
        headerHTML += '<tr>';
        for (let hari = 1; hari <= jumlahHari; hari++) {
            const date = new Date(tahun, bulan, hari);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0=Minggu, 6=Sabtu
            headerHTML += `<th class="${isWeekend ? 'weekend' : ''}">${hari}</th>`;
        }
        headerHTML += '<th>S</th><th>I</th><th>A</th></tr>';
        tabelHead.innerHTML = headerHTML;

        // 2. Buat Body Tabel
        let bodyHTML = '';
        siswaData.forEach(siswa => {
            bodyHTML += `<tr data-siswa-id="${siswa.no}">`;
            bodyHTML += `<td>${siswa.no}</td><td class="td-nama">${siswa.nama}</td><td>${siswa.lp}</td>`;
            for (let hari = 1; hari <= jumlahHari; hari++) {
                const date = new Date(tahun, bulan, hari);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                bodyHTML += `<td class="${isWeekend ? 'weekend' : ''}">
                               <select data-tanggal="${hari}">
                                   <option value=""></option>
                                   <option value="H">H</option>
                                   <option value="S">S</option>
                                   <option value="I">I</option>
                                   <option value="A">A</option>
                               </select>
                           </td>`;
            }
            bodyHTML += `<td class="total-sakit">0</td><td class="total-izin">0</td><td class="total-alpha">0</td>`;
            bodyHTML += '</tr>';
        });
        tabelBody.innerHTML = bodyHTML;

        // 3. Buat Footer Tabel
        let footerHTML = '<tr><th colspan="3">Jumlah Siswa/i Hadir</th>';
        for (let hari = 1; hari <= jumlahHari; hari++) {
            const date = new Date(tahun, bulan, hari);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            footerHTML += `<td id="hadir-hari-${hari}" class="${isWeekend ? 'weekend' : ''}">0</td>`;
        }
        footerHTML += '<td colspan="3"></td></tr>';
        tabelFoot.innerHTML = footerHTML;
        
        updateTotals();
    }
    
    // --- UPDATE TOTALS ---
    function updateTotals() {
        const jumlahHari = new Date(tahunSelect.value, parseInt(bulanSelect.value) + 1, 0).getDate();

        // Hitung total per siswa (S, I, A)
        siswaData.forEach(siswa => {
            const row = document.querySelector(`tr[data-siswa-id="${siswa.no}"]`);
            const selects = row.querySelectorAll('select');
            let sakit = 0, izin = 0, alpha = 0;
            selects.forEach(select => {
                if(select.value === 'S') sakit++;
                if(select.value === 'I') izin++;
                if(select.value === 'A') alpha++;
            });
            row.querySelector('.total-sakit').textContent = sakit;
            row.querySelector('.total-izin').textContent = izin;
            row.querySelector('.total-alpha').textContent = alpha;
        });

        // Hitung total hadir per hari
        for(let hari = 1; hari <= jumlahHari; hari++) {
            const selects = document.querySelectorAll(`select[data-tanggal="${hari}"]`);
            let hadir = 0;
            selects.forEach(select => {
                if(select.value === 'H') hadir++;
            });
            document.getElementById(`hadir-hari-${hari}`).textContent = hadir;
        }
    }

    // --- EKSPOR PDF ---
    function exportToPDF() {
        const areaCetak = document.getElementById('area-cetak').cloneNode(true);
        const selects = areaCetak.querySelectorAll('select');
        
        // Ganti elemen <select> dengan teks nilainya agar rapi di PDF
        selects.forEach(select => {
            const parentTd = select.parentNode;
            parentTd.textContent = select.options[select.selectedIndex].text;
        });
        
        const namaBulan = bulanSelect.options[bulanSelect.selectedIndex].text;
        const tahun = tahunSelect.value;
        const filename = `Absensi_${namaBulan}_${tahun}.pdf`;

        const opt = {
            margin: 0.5,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };
        
        html2pdf().from(areaCetak).set(opt).save();
    }

    // Jalankan aplikasi
    init();
});
