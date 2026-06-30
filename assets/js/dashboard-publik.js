/* =====================================
   DASHBOARD PUBLIK WAKTU & DATA
===================================== */
const tanggalHariIni = document.getElementById("tanggalHariIni");
const hariIni = new Date();

tanggalHariIni.textContent = hariIni.toLocaleDateString("id-ID", {
    weekday: 'long',
    day: "numeric",
    month: "long",
    year: "numeric"
});

// Tarik semua data dari Storage (memanfaatkan helper.js)
const dataPemasukan = ambilDataPemasukan();
const dataPengeluaran = ambilDataPengeluaran();

/* =====================================
   HITUNG KEUANGAN (FOKUS BULAN INI & TOTAL SALDO)
===================================== */
let totalMasukSemua = 0;
let totalKeluarSemua = 0;

let masukBulanIni = 0;
let keluarBulanIni = 0;
let jumlahTransaksiBulanIni = 0;

// Hitung Pemasukan
dataPemasukan.forEach(function(item) {
    const nominal = Number(item.nominal);
    const tgl = new Date(item.tanggal);
    
    totalMasukSemua += nominal;
    
    if (tgl.getMonth() === hariIni.getMonth() && tgl.getFullYear() === hariIni.getFullYear()) {
        masukBulanIni += nominal;
        jumlahTransaksiBulanIni++;
    }
});

// Hitung Pengeluaran
dataPengeluaran.forEach(function(item) {
    const nominal = Number(item.nominal);
    const tgl = new Date(item.tanggal);
    
    totalKeluarSemua += nominal;
    
    if (tgl.getMonth() === hariIni.getMonth() && tgl.getFullYear() === hariIni.getFullYear()) {
        keluarBulanIni += nominal;
        jumlahTransaksiBulanIni++;
    }
});

const saldoAkhir = totalMasukSemua - totalKeluarSemua;

// Update UI Card
document.getElementById("saldoBUMDes").textContent = formatRupiah(saldoAkhir);
document.getElementById("pemasukanBulanIni").textContent = formatRupiah(masukBulanIni);
document.getElementById("pengeluaranBulanIni").textContent = formatRupiah(keluarBulanIni);
document.getElementById("jumlahTransaksiBulanIni").textContent = jumlahTransaksiBulanIni;


/* =====================================
   GRAFIK CHART.JS (IDENTIK DENGAN ADMIN)
===================================== */
const chartPublik = document.getElementById("dashboardChart");

if(chartPublik){
   new Chart(chartPublik, {
      type: "bar",
      data: {
         labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
         datasets: [
            {
               label: "Pemasukan",
               data: hitungDataBulanan(dataPemasukan),
               backgroundColor: "#10b981", // Hijau Emerald
               borderRadius: 8
            },
            {
               label: "Pengeluaran",
               data: hitungDataBulanan(dataPengeluaran),
               backgroundColor: "#DC143C", // Abu-abu muda
               borderRadius: 8
            }
         ]
      },
      options: {
         responsive: true,
         maintainAspectRatio: false,
         scales: {
            x: {
               grid: { display: false } // Hilangkan garis vertikal biar bersih
            },
            y: {
               beginAtZero: true,
               grid: { 
                  color: "#f1f5f9", // GARIS BORDER TIPIS (Grid horizontal)
                  drawBorder: false 
               }
            }
         }
      }
   });
}



/* =====================================
   RENDER TABEL 10 TRANSAKSI TERBARU
===================================== */
// Gabungin data masuk & keluar ke satu array, kasih flag 'tipe'
let semuaTransaksi = [];

dataPemasukan.forEach(item => {
    semuaTransaksi.push({ ...item, tipe: 'masuk' });
});
dataPengeluaran.forEach(item => {
    semuaTransaksi.push({ ...item, tipe: 'keluar' });
});

// Urutkan dari yang terbaru (Descending)
semuaTransaksi.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

// Ambil maksimal 10 data teratas
const transaksiTerbaru = semuaTransaksi.slice(0, 10);

const tableBody = document.getElementById("tableRiwayatPublik");

if (transaksiTerbaru.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3" class="text-center text-muted py-3">Belum ada transaksi</td></tr>`;
} else {
    let barisHTML = "";
    transaksiTerbaru.forEach(item => {
        // Tentukan kelas warna & ikon panah berdasarkan tipe
        const warnaTeks = item.tipe === 'masuk' ? 'text-masuk' : 'text-keluar';
        const ikonPanah = item.tipe === 'masuk' ? '<i class="bi bi-arrow-down-left"></i>' : '<i class="bi bi-arrow-up-right"></i>';
        
        // Pilih nama unit usaha atau sumber transaksi
        const namaUnit = item.unitUsaha ? item.unitUsaha : item.sumberTransaksi;

        barisHTML += `
        <tr>
            <td><small>${formatTanggal(item.tanggal)}</small></td>
            <td>
                <span class="d-block fw-bold" style="font-size: 14px;">${namaUnit}</span>
                <span class="text-muted" style="font-size: 12px;">${item.kategori}</span>
            </td>
            <td class="text-end ${warnaTeks} align-middle">
                ${ikonPanah} ${formatRupiah(item.nominal)}
            </td>
        </tr>
        `;
    });
    tableBody.innerHTML = barisHTML;
}