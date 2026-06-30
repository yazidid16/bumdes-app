/* =====================================
   // Ganti LABEL_UNIT untuk dashboard lain
===================================== */
const LABEL_UNIT =
"APBDes";


/* =====================================
   AMBIL DATA DARI HELPER
===================================== */

const dataPemasukanUnit =
ambilDataPemasukan();

const dataPengeluaranUnit =
ambilDataPengeluaran();




/* =====================================
   FILTER DATA APBDES SAJA
===================================== */

const dataPemasukanUnitUnit =
dataPemasukanUnit.filter(function(item){

    return (
        item.sumberTransaksi === LABEL_UNIT
    );

});

const dataPengeluaranUnitUnit =
dataPengeluaranUnit.filter(function(item){

    return (
        item.sumberTransaksi === LABEL_UNIT
    );

});


/* =====================================
   TANGGAL HARI INI
===================================== */

const tanggalHariIni =
document.getElementById("tanggalHariIni");

const hariIni = new Date();

tanggalHariIni.textContent =
hariIni.toLocaleDateString("id-ID", {
   day: "numeric",
   month: "long",
   year: "numeric"
});

/* =====================================
   AMBIL DATA LOCAL STORAGE
===================================== */

/* =====================================
   AMBIL ELEMEN CARD
===================================== */

const pemasukanHariIni =
document.getElementById("pemasukanHariIni");

const pemasukanBulanIni =
document.getElementById("pemasukanBulanIni");

const pemasukanTahunIni =
document.getElementById("pemasukanTahunIni");

const totalPemasukan =
document.getElementById("totalPemasukan");

const pengeluaranHariIni =
document.getElementById("pengeluaranHariIni");

const pengeluaranBulanIni =
document.getElementById("pengeluaranBulanIni");

const pengeluaranTahunIni =
document.getElementById("pengeluaranTahunIni");

const totalPengeluaran =
document.getElementById("totalPengeluaran");

const saldoElement =
document.getElementById(
    "saldoDashboard"
);


/* =====================================
   VARIABEL TOTAL
===================================== */

let totalMasukHariIni = 0;
let totalMasukBulanIni = 0;
let totalMasukTahunIni = 0;
let totalMasukSemua = 0;

let totalKeluarHariIni = 0;
let totalKeluarBulanIni = 0;
let totalKeluarTahunIni = 0;
let totalKeluarSemua = 0;

/* =====================================
   HITUNG PEMASUKAN
===================================== */

dataPemasukanUnitUnit.forEach(function(item){

   const nominal =
   Number(item.nominal);

   const tanggal =
   new Date(item.tanggal);

   if(
      tanggal.toDateString() ===
      hariIni.toDateString()
   ){
      totalMasukHariIni += nominal;
   }

   if(
      tanggal.getMonth() ===
      hariIni.getMonth()
      &&
      tanggal.getFullYear() ===
      hariIni.getFullYear()
   ){
      totalMasukBulanIni += nominal;
   }

   if(
      tanggal.getFullYear() ===
      hariIni.getFullYear()
   ){
      totalMasukTahunIni += nominal;
   }

   totalMasukSemua += nominal;

});

/* =====================================
   HITUNG PENGELUARAN
===================================== */

dataPengeluaranUnitUnit.forEach(function(item){

   const nominal =
   Number(item.nominal);

   const tanggal =
   new Date(item.tanggal);

   if(
      tanggal.toDateString() ===
      hariIni.toDateString()
   ){
      totalKeluarHariIni += nominal;
   }

   if(
      tanggal.getMonth() ===
      hariIni.getMonth()
      &&
      tanggal.getFullYear() ===
      hariIni.getFullYear()
   ){
      totalKeluarBulanIni += nominal;
   }

   if(
      tanggal.getFullYear() ===
      hariIni.getFullYear()
   ){
      totalKeluarTahunIni += nominal;
   }

   totalKeluarSemua += nominal;

});

/* =====================================
   TAMPILKAN KE CARD
===================================== */

pemasukanHariIni.textContent =
formatRupiah(totalMasukHariIni);

pemasukanBulanIni.textContent =
formatRupiah(totalMasukBulanIni);

pemasukanTahunIni.textContent =
formatRupiah(totalMasukTahunIni);

totalPemasukan.textContent =
formatRupiah(totalMasukSemua);

pengeluaranHariIni.textContent =
formatRupiah(totalKeluarHariIni);


pengeluaranBulanIni.textContent =
formatRupiah(totalKeluarBulanIni);

pengeluaranTahunIni.textContent =
formatRupiah(totalKeluarTahunIni);

totalPengeluaran.textContent =
formatRupiah(totalKeluarSemua);


const sisaDana =
totalMasukSemua -
totalKeluarSemua;

if(saldoElement){

    saldoElement.textContent =
    formatRupiah(sisaDana);

}

/* =====================================
   TABLE TRANSAKSI DINAMIS
===================================== */

function buatTableTransaksi(data){
    let totalNominal = 0;

    const dataUrut = [...data];

    dataUrut.sort(function(a,b){
    
       return (
          new Date(b.tanggal)
          -
          new Date(a.tanggal)
       );
    
    });

    if(data.length === 0){

        return `
        <div class="text-center p-4">

            <h5>
                Belum Ada Data
            </h5>

        </div>
        `;

    }

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

    dataUrut.forEach(function(item){
        totalNominal += Number(item.nominal);

        html += `
        <tr>

            <td>
                ${item.tanggal}
            </td>

            <td>
                ${
                    item.sumberTransaksi === "APBDes"
                    ? '<span class="badge bg-primary">APBDes</span>'
                    : '<span class="badge bg-success">Unit Usaha</span>'
                }
            </td>

            <td>
                ${item.unitUsaha || "APBDes"}
            </td>

            <td>
                ${item.kategori}
            </td>

            <td class="fw-bold">
            ${formatRupiah(item.nominal)}
            </td>

        </tr>
        `;

    });

    html += `
            </tbody>

        </table>

    </div>

    <hr>

    <div class="d-flex justify-content-between">

        <strong>
            Jumlah Transaksi
        </strong>

        <strong>
            ${data.length}
        </strong>

    </div>

    <div class="d-flex justify-content-between mt-2">

        <strong>
            Total Nominal
        </strong>

        <strong>
        ${formatRupiah(totalNominal)}
        </strong>

    </div>
    `;

    return html;

}

/* =====================================
   EVENT CARD PEMASUKAN
===================================== */

const cardPemasukanHariIni =
document.getElementById(
    "cardPemasukanHariIni"
);

cardPemasukanHariIni.addEventListener(
    "click",
    function(){

        const dataHariIni =
dataPemasukanUnitUnit.filter(function(item){

    return (
        new Date(item.tanggal)
        .toDateString()
        ===
        hariIni.toDateString()
    );

});

bukaModal(
    "Detail Pemasukan Hari Ini",
    buatTableTransaksi(dataHariIni)
);

    });

/* =====================================
   MODAL DINAMIS
===================================== */

    function bukaModal(judul, isi){

        document.getElementById(
            "detailModalTitle"
        ).textContent = judul;
    
        document.getElementById(
            "detailModalBody"
        ).innerHTML = isi;
    
        new bootstrap.Modal(
            document.getElementById(
                "detailModal"
            )
        ).show();
    }

/* =====================================
      HELPER PASANG CARD CLICK
===================================== */

function pasangCardClick(
    cardId,
    judul,
    data
){

    const card =
    document.getElementById(cardId);

    if(!card) return;

    card.addEventListener(
        "click",
        function(){

            bukaModal(
                judul,
                buatTableTransaksi(data)
            );

        }
    );

}
/* =====================================
   CARD PEMASUKAN BULAN INI
===================================== */
    document
.getElementById(
    "cardPemasukanBulanIni"
)
.addEventListener(
    "click",
    function(){

        const dataBulanIni =
        dataPemasukanUnitUnit.filter(function(item){
        
            const tanggal =
            new Date(item.tanggal);
        
            return (
                tanggal.getMonth() ===
                hariIni.getMonth()
                &&
                tanggal.getFullYear() ===
                hariIni.getFullYear()
            );
        
        });
        
        bukaModal(
            "Detail Pemasukan Bulan Ini",
            buatTableTransaksi(dataBulanIni)
        );

    });

    /* =====================================
   CARD PEMASUKAN TAHUN INI
===================================== */
    document
.getElementById(
    "cardPemasukanTahunIni"
)
.addEventListener(
    "click",
    function(){

        const dataTahunIni =
dataPemasukanUnitUnit.filter(function(item){

    const tanggal =
    new Date(item.tanggal);

    return (
        tanggal.getFullYear()
        ===
        hariIni.getFullYear()
    );

});

bukaModal(
    "Detail Pemasukan Tahun Ini",
    buatTableTransaksi(dataTahunIni)
);

    });

    pasangCardClick(
        "cardTotalPemasukan",
        "Total Pemasukan",
        dataPemasukanUnitUnit
    );

/* =====================================
   EVENT CARD PENGELUARAN
===================================== */

    document
.getElementById(
    "cardPengeluaranHariIni"
)
.addEventListener(
    "click",
    function(){

        const dataHariIni =
dataPengeluaranUnitUnit.filter(function(item){

    return (
        new Date(item.tanggal)
        .toDateString()
        ===
        hariIni.toDateString()
    );

});

bukaModal(
    "Detail Pengeluaran Hari Ini",
    buatTableTransaksi(dataHariIni)
);

    });

/* =====================================
   CARD PEGNELUARAN BULAN INI
===================================== */
    document
    .getElementById(
        "cardPengeluaranBulanIni"
    )
    .addEventListener(
        "click",
        function(){
    
            const dataBulanIni =
            dataPengeluaranUnitUnit.filter(function(item){
            
                const tanggal =
                new Date(item.tanggal);
            
                return (
                    tanggal.getMonth()
                    ===
                    hariIni.getMonth()
                    &&
                    tanggal.getFullYear()
                    ===
                    hariIni.getFullYear()
                );
            
            });
            
            bukaModal(
                "Detail Pengeluaran Bulan Ini",
                buatTableTransaksi(dataBulanIni)
            );
    
        });
/* =====================================
   CARD PENGELUARAN TAHUN INI
===================================== */
        document
    .getElementById(
        "cardPengeluaranTahunIni"
    )
    .addEventListener(
        "click",
        function(){
    
            const dataTahunIni =
            dataPengeluaranUnitUnit.filter(function(item){
            
                const tanggal =
                new Date(item.tanggal);
            
                return (
                    tanggal.getFullYear()
                    ===
                    hariIni.getFullYear()
                );
            
            });
            
            bukaModal(
                "Detail Pengeluaran Tahun Ini",
                buatTableTransaksi(dataTahunIni)
            );
    
        });


        pasangCardClick(
            "cardTotalPengeluaran",
            "Total Pengeluaran",
            dataPengeluaranUnitUnit
        );

        
        /* =====================================
        CHART KEUANGAN DASHBOARD
        ===================================== */

        const pemasukanBulanan =
        hitungDataBulanan(
        dataPemasukanUnitUnit
        );

        const pengeluaranBulanan =
        hitungDataBulanan(
        dataPengeluaranUnitUnit
        );


// Menunggu HTML:
// <canvas id="chartKeuangan"></canvas>

const chartKeuangan = document.getElementById("dashboardChart");

if(chartKeuangan){
   new Chart(chartKeuangan, {
      type: "bar",
      data: {
         labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
         datasets: [
            {
               label: "Pemasukan",
               data: pemasukanBulanan, // Pake variabel data yang udah lu hitung
               backgroundColor: "#10b981", // Hijau Emerald
               borderRadius: 8
            },
            {
               label: "Pengeluaran",
               data: pengeluaranBulanan, // Pake variabel data yang udah lu hitung
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


/* ====================================
   9. FULL CALENDAR DASHBOARD (MODERN)
===================================== */

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if(!calendarEl) return;

    // 1. Kumpulkan semua tanggal yang memiliki transaksi ke dalam Set (biar unik/gak duplikat)
    const tanggalAdaTransaksi = new Set();
    
    dataPemasukanUnit.forEach(item => {
        tanggalAdaTransaksi.add(new Date(item.tanggal).toISOString().split("T")[0]);
    });
    dataPengeluaranUnit.forEach(item => {
        tanggalAdaTransaksi.add(new Date(item.tanggal).toISOString().split("T")[0]);
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'id',
        contentHeight: 'auto', // Menghilangkan scrollbar jelek di samping kalender
        
        // 2. Fitur inject class CSS ke tanggal tertentu
        dayCellClassNames: function(arg) {
            // Jika tanggal sedang dirender ada di dalam list transaksi kita, kasih class 'has-transaction'
            if (tanggalAdaTransaksi.has(arg.dateStr)) {
                return ['has-transaction'];
            }
            return [];
        },

        dateClick: function(info) {
            // Reset efek klik sebelumnya
            document.querySelectorAll('.fc-daygrid-day').forEach(el => el.classList.remove('fc-day-selected'));
            info.dayEl.classList.add('fc-day-selected');

            let masuk = 0;
            let keluar = 0;

            // Hitung Pemasukan per tanggal
            dataPemasukanUnitUnit.forEach(item => {
                const tanggalItem = new Date(item.tanggal).toISOString().split("T")[0];
                if(tanggalItem === info.dateStr) { masuk += Number(item.nominal); }
            });

            // Hitung Pengeluaran per tanggal
            dataPengeluaranUnit.forEach(item => {
                const tanggalItem = new Date(item.tanggal).toISOString().split("T")[0];
                if(tanggalItem === info.dateStr) { keluar += Number(item.nominal); }
            });

            const saldo = masuk - keluar;
            const ringkasan = document.getElementById("ringkasanTanggal");

            if(ringkasan) {
                // Format tanggal jadi cantik (Misal: 28 Juni 2026)
                const tanggalCantik = info.date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

                // 3. UI Ringkasan Baru (Bentuk Mini Card Modern)
                ringkasan.innerHTML = `
                    <div class="w-100 mt-2 p-3 rounded-3" style="background: var(--bg-body); border: 1px solid #e2e8f0;">
                        
                        <div class="d-flex justify-content-between align-items-center mb-3 pb-2" style="border-bottom: 1px dashed #cbd5e1;">
                            <span class="fw-bold" style="color: var(--text-main); font-size: 14px;">
                                <i class="bi bi-calendar2-event-fill me-2" style="color: var(--primary);"></i>${tanggalCantik}
                            </span>
                            <span class="badge rounded-pill shadow-sm" style="background: var(--primary); font-size: 12px; padding: 6px 12px;">
                                Saldo: ${formatRupiah(saldo)}
                            </span>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div class="text-success fw-bold" style="font-size: 13.5px;">
                                <i class="bi bi-arrow-down-left-circle-fill me-1"></i> Masuk: ${formatRupiah(masuk)}
                            </div>
                            <div class="text-danger fw-bold" style="font-size: 13.5px;">
                                <i class="bi bi-arrow-up-right-circle-fill me-1"></i> Keluar: ${formatRupiah(keluar)}
                            </div>
                        </div>

                    </div>
                `;
            }
        }
    });

    calendar.render();
});