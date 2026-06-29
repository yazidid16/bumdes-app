/* =====================================
   0. KONFIGURASI DASHBOARD
===================================== */

// Dashboard Admin = semua transaksi
// Dashboard Unit Usaha = filter berdasarkan unit usaha

/* ==========================================================================
   DASHBOARD ADMIN KEUANGAN
   ========================================================================== */

/* =====================================
   1. INISIALISASI TANGGAL HARI INI
   ===================================== */
const tanggalHariIni = document.getElementById("tanggalHariIni");
const hariIni = new Date();

// Menampilkan tanggal hari ini dengan format lokal Indonesia (Contoh: 28 Juni 2026)
tanggalHariIni.textContent = hariIni.toLocaleDateString("id-ID", {
   day: "numeric",
   month: "long",
   year: "numeric"
});


/* =====================================
   2. AMBIL DATA DARI LOCAL STORAGE
   ===================================== */
const dataPemasukan = JSON.parse(localStorage.getItem("dataPemasukan")) || [];
const dataPengeluaran = JSON.parse(localStorage.getItem("dataPengeluaran")) || [];


/* =====================================
   3. AMBIL ELEMEN DOM (CARD SUMMARY)
   ===================================== */
// Elemen Ringkasan Pemasukan
const pemasukanHariIni = document.getElementById("pemasukanHariIni");
const pemasukanBulanIni = document.getElementById("pemasukanBulanIni");
const pemasukanTahunIni = document.getElementById("pemasukanTahunIni");
const totalPemasukan = document.getElementById("totalPemasukan");

// Elemen Ringkasan Pengeluaran
const pengeluaranHariIni = document.getElementById("pengeluaranHariIni");
const pengeluaranBulanIni = document.getElementById("pengeluaranBulanIni");
const pengeluaranTahunIni = document.getElementById("pengeluaranTahunIni");
const totalPengeluaran = document.getElementById("totalPengeluaran");

// Elemen Saldo Akhir
const saldoBUMDes = document.getElementById("saldoBUMDes");


/* =====================================
   4. AKUMULASI & PERHITUNGAN DATA
   ===================================== */
let totalMasukHariIni = 0;
let totalMasukBulanIni = 0;
let totalMasukTahunIni = 0;
let totalMasukSemua = 0;

let totalKeluarHariIni = 0;
let totalKeluarBulanIni = 0;
let totalKeluarTahunIni = 0;
let totalKeluarSemua = 0;
let saldoAkhir = 0;

// Loop Hitung Pemasukan Berdasarkan Waktu
dataPemasukan.forEach(function(item) {
   const nominal = Number(item.nominal);
   const tanggal = new Date(item.tanggal);

   // Hari Ini
   if (tanggal.toDateString() === hariIni.toDateString()) {
      totalMasukHariIni += nominal;
   }
   // Bulan Ini
   if (tanggal.getMonth() === hariIni.getMonth() && tanggal.getFullYear() === hariIni.getFullYear()) {
      totalMasukBulanIni += nominal;
   }
   // Tahun Ini
   if (tanggal.getFullYear() === hariIni.getFullYear()) {
      totalMasukTahunIni += nominal;
   }
   // Total Keseluruhan
   totalMasukSemua += nominal;
});

// Loop Hitung Pengeluaran Berdasarkan Waktu
dataPengeluaran.forEach(function(item) {
   const nominal = Number(item.nominal);
   const tanggal = new Date(item.tanggal);

   // Hari Ini
   if (tanggal.toDateString() === hariIni.toDateString()) {
      totalKeluarHariIni += nominal;
   }
   // Bulan Ini
   if (tanggal.getMonth() === hariIni.getMonth() && tanggal.getFullYear() === hariIni.getFullYear()) {
      totalKeluarBulanIni += nominal;
   }
   // Tahun Ini
   if (tanggal.getFullYear() === hariIni.getFullYear()) {
      totalKeluarTahunIni += nominal;
   }
   // Total Keseluruhan
   totalKeluarSemua += nominal;
});

// Hitung Sisa Saldo Akhir
saldoAkhir = totalMasukSemua - totalKeluarSemua;


/* =====================================
   5. TAMPILKAN DATA KE CARD SUMMARY
   ===================================== */
   pemasukanHariIni.textContent = formatRupiah(totalMasukHariIni);
   pemasukanBulanIni.textContent = formatRupiah(totalMasukBulanIni);
   pemasukanTahunIni.textContent = formatRupiah(totalMasukTahunIni);
   totalPemasukan.textContent = formatRupiah(totalMasukSemua);
   
   pengeluaranHariIni.textContent = formatRupiah(totalKeluarHariIni);
   pengeluaranBulanIni.textContent = formatRupiah(totalKeluarBulanIni);
   pengeluaranTahunIni.textContent = formatRupiah(totalKeluarTahunIni);
   totalPengeluaran.textContent = formatRupiah(totalKeluarSemua);
   
   saldoBUMDes.textContent = formatRupiah(saldoAkhir);


/* =====================================
   6. FUNCTION UTILITAS (TABLE & MODAL)
   ===================================== */

/**
 * Membuat komponen HTML Tabel Transaksi untuk di dalam Modal
 * @param {Array} data - Array objek transaksi (pemasukan / pengeluaran)
 * @returns {string} Komponen HTML berupa tabel transaksi
 */

/* =====================================
   FUNCTION FORMAT RUPIAH
===================================== */

function formatRupiah(angka){
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

function buatTableTransaksi(data) {
    let totalNominal = 0;

    // Urutkan data berdasarkan tanggal terbaru (Descending)
    data.sort(function(a,b) {
        return new Date(b.tanggal) - new Date(a.tanggal);
    });

    // Jika tidak ada data transaksi
    if (data.length === 0) {
        return `
        <div class="text-center p-4">
            <h5>Belum Ada Data</h5>
        </div>
        `;
    }

    // Header Tabel
    let html = `
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Tanggal</th>
                    <th>Sumber</th>
                    <th>Unit Usaha</th>
                    <th>Kategori</th>
                    <th>Nominal</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Loop Baris Tabel
    data.forEach(function(item) {
        totalNominal += Number(item.nominal);
        html += `
        <tr>
            <td>${item.tanggal}</td>
            <td>
                ${item.sumberTransaksi === "APBDes"
                    ? '<span class="badge bg-primary">APBDes</span>'
                    : '<span class="badge bg-success">Unit Usaha</span>'
                }
            </td>
            <td>${item.unitUsaha || "APBDes"}</td>
            <td>${item.kategori}</td>
            <td class="fw-bold">Rp ${Number(item.nominal).toLocaleString("id-ID")}</td>
        </tr>
        `;
    });

    // Footer Tabel (Total Ringkasan)
    html += `
            </tbody>
        </table>
    </div>
    <hr>
    <div class="d-flex justify-content-between">
        <strong>Jumlah Transaksi</strong>
        <strong>${data.length}</strong>
    </div>
    <div class="d-flex justify-content-between mt-2">
        <strong>Total Nominal</strong>
        <strong>Rp ${totalNominal.toLocaleString("id-ID")}</strong>
    </div>
    `;

    return html;
}

/**
 * Menampilkan Bootstrap Modal secara Dinamis
 * @param {string} judul - Judul Modal yang akan ditampilkan
 * @param {string} isi - Konten HTML (Tabel) yang dimasukkan ke body modal
 */
function bukaModal(judul, isi) {
    document.getElementById("detailModalTitle").textContent = judul;
    document.getElementById("detailModalBody").innerHTML = isi;

    new bootstrap.Modal(document.getElementById("detailModal")).show();
}


/* =====================================
   7. EVENT LISTENERS (CLICK PADA CARD)
   ===================================== */

// --- CARD PEMASUKAN ---
document.getElementById("cardPemasukanHariIni").addEventListener("click", function() {
    const dataHariIni = dataPemasukan.filter(function(item) {
        return new Date(item.tanggal).toDateString() === hariIni.toDateString();
    });
    bukaModal("Detail Pemasukan Hari Ini", buatTableTransaksi(dataHariIni));
});

document.getElementById("cardPemasukanBulanIni").addEventListener("click", function() {
    const dataBulanIni = dataPemasukan.filter(function(item) {
        const tanggal = new Date(item.tanggal);
        return tanggal.getMonth() === hariIni.getMonth() && tanggal.getFullYear() === hariIni.getFullYear();
    });
    bukaModal("Detail Pemasukan Bulan Ini", buatTableTransaksi(dataBulanIni));
});

document.getElementById("cardPemasukanTahunIni").addEventListener("click", function() {
    const dataTahunIni = dataPemasukan.filter(function(item) {
        return new Date(item.tanggal).getFullYear() === hariIni.getFullYear();
    });
    bukaModal("Detail Pemasukan Tahun Ini", buatTableTransaksi(dataTahunIni));
});

document.getElementById("cardTotalPemasukan").addEventListener("click", function() {
    bukaModal("Total Pemasukan", buatTableTransaksi(dataPemasukan));
});

// --- CARD PENGELUARAN ---
document.getElementById("cardPengeluaranHariIni").addEventListener("click", function() {
    const dataHariIni = dataPengeluaran.filter(function(item) {
        return new Date(item.tanggal).toDateString() === hariIni.toDateString();
    });
    bukaModal("Detail Pengeluaran Hari Ini", buatTableTransaksi(dataHariIni));
});

document.getElementById("cardPengeluaranBulanIni").addEventListener("click", function() {
    const dataBulanIni = dataPengeluaran.filter(function(item) {
        const tanggal = new Date(item.tanggal);
        return tanggal.getMonth() === hariIni.getMonth() && tanggal.getFullYear() === hariIni.getFullYear();
    });
    bukaModal("Detail Pengeluaran Bulan Ini", buatTableTransaksi(dataBulanIni));
});

document.getElementById("cardPengeluaranTahunIni").addEventListener("click", function() {
    const dataTahunIni = dataPengeluaran.filter(function(item) {
        return new Date(item.tanggal).getFullYear() === hariIni.getFullYear();
    });
    bukaModal("Detail Pengeluaran Tahun Ini", buatTableTransaksi(dataTahunIni));
});

document.getElementById("cardTotalPengeluaran").addEventListener("click", function() {
    bukaModal("Total Pengeluaran", buatTableTransaksi(dataPengeluaran));
});


/* =====================================
   8. KONFIGURASI CHART / GRAFIK BULANAN
   ===================================== */
const dataChartMasuk = Array(12).fill(0);
const dataChartKeluar = Array(12).fill(0);

// Mapping Pemasukan ke Tiap Bulan (0-11)
dataPemasukan.forEach(function(item) {
    const bulan = new Date(item.tanggal).getMonth();
    dataChartMasuk[bulan] += Number(item.nominal);
});

// Mapping Pengeluaran ke Tiap Bulan (0-11)
dataPengeluaran.forEach(function(item) {
    const bulan = new Date(item.tanggal).getMonth();
    dataChartKeluar[bulan] += Number(item.nominal);
});

// Render Grafik Menggunakan Chart.js
const ctx = document.getElementById("dashboardChart");
new Chart(ctx, {
   type: "bar",
   data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      datasets: [
         { label: "Pemasukan", data: dataChartMasuk },
         { label: "Pengeluaran", data: dataChartKeluar }
      ]
   },
   options: {
      responsive: true,
      maintainAspectRatio: false
   }
});

/* =====================================
   9. FULLCALENDAR DASHBOARD
===================================== */

document.addEventListener('DOMContentLoaded', function () {

    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'id',
        height: 420,


        /* =====================================
        TODO:
         GENERATE EVENT DARI TRANSAKSI

        events: [
            {
                start: '2026-06-28',
                display: 'background',
                color: '#dcfce7'
            }
        ],
        ===================================== */
        
        /* =====================================
            HIGHLIGHT TANGGAL TERPILIH
         ===================================== */
        dateClick:function(info) {

            //console.log(info.dateStr);
            //console.log(dataPemasukan);
            //console.log(dataPengeluaran);
            
            let masuk = 0;
            let keluar = 0;
         
/* =====================================
   RESET HIGHLIGHT TANGGAL
===================================== */

         document
         .querySelectorAll('.fc-daygrid-day')
         .forEach(el => el.classList.remove('fc-day-selected'));
         
         info.dayEl.classList.add('fc-day-selected');
            
        
            /* =====================================
            HITUNG PEMASUKAN TANGGAL TERPILIH
            ===================================== */
            dataPemasukan.forEach(item => {

            const tanggalItem = new Date(item.tanggal)
                .toISOString()
                 .split("T")[0];

            if(tanggalItem === info.dateStr){
                masuk += Number(item.nominal);
             }

            });

            /* =====================================
            HITUNG PENGELUARAN TANGGAL TERPILIH
            ===================================== */
            dataPengeluaran.forEach(item => {

            const tanggalItem = new Date(item.tanggal)
            .toISOString()
            .split("T")[0];

             if(tanggalItem === info.dateStr){
              keluar += Number(item.nominal);
            }

            });

            const saldo = masuk - keluar;
        
/* =====================================
   UPDATE RINGKASAN TANGGAL
===================================== */

            document.getElementById("ringkasanTanggal").innerHTML = `
                <span>📅 ${info.dateStr}</span>
        
                <span class="text-success fw-bold">
                    Pemasukan: Rp ${masuk.toLocaleString("id-ID")}
                </span>
        
                <span class="text-danger fw-bold">
                    Pengeluaran: Rp ${keluar.toLocaleString("id-ID")}
                </span>
        
                <span class="fw-bold">
                    Saldo: Rp ${saldo.toLocaleString("id-ID")}
                </span>
            `;
        }
    });

    calendar.render();
});


/* =====================================
   10. EXPORT PDF
===================================== */

/* =====================================
   11. EXPORT EXCEL
===================================== */

/* =====================================
   12. FILTER UNIT USAHA
===================================== */

/* =====================================
   13. FUTURE DEVELOPMENT
===================================== */

// Detail transaksi per tanggal kalender
// Export PDF
// Export Excel
// Filter unit usaha
// Dashboard publik
// Database MySQL
// Login & Hak Akses