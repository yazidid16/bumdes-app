/* =====================================
   // Ganti LABEL_UNIT untuk dashboard lain
===================================== */
const LABEL_UNIT =
"Rasio Kopi";


/* =====================================
   AMBIL DATA DARI HELPER
===================================== */

const dataPemasukan =
ambilDataPemasukan();

const dataPengeluaran =
ambilDataPengeluaran();




/* =====================================
   FILTER DATA APBDES SAJA
===================================== */

const dataPemasukanUnit =
dataPemasukan.filter(function(item){

    return (
        item.unitUsaha === LABEL_UNIT
    );

});

const dataPengeluaranUnit =
dataPengeluaran.filter(function(item){

    return (
        item.unitUsaha === LABEL_UNIT
    );

});

/* =====================================
   DASHBOARD ADMIN
===================================== */

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

dataPemasukanUnit.forEach(function(item){

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

dataPengeluaranUnit.forEach(function(item){

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
                    item.unitUsaha === "LABEL_UNIT"
                    ? '<span class="badge bg-primary">LABEL_UNIT</span>'
                    : '<span class="badge bg-success">Unit Usaha</span>'
                }
            </td>

            <td>
                ${item.unitUsaha || "LABEL_UNIT"}
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
dataPemasukanUnit.filter(function(item){

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
        dataPemasukanUnit.filter(function(item){
        
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
dataPemasukanUnit.filter(function(item){

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
        dataPemasukanUnit
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
dataPengeluaranUnit.filter(function(item){

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
            dataPengeluaranUnit.filter(function(item){
            
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
            dataPengeluaranUnit.filter(function(item){
            
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
            dataPengeluaranUnit
        );

        
        /* =====================================
        CHART KEUANGAN DASHBOARD
        ===================================== */

        const pemasukanBulanan =
        hitungDataBulanan(
        dataPemasukanUnit
        );

        const pengeluaranBulanan =
        hitungDataBulanan(
        dataPengeluaranUnit
        );


// Menunggu HTML:
// <canvas id="chartKeuangan"></canvas>

const chartKeuangan =
document.getElementById(
   "dashboardChart"
);

if(chartKeuangan){

   new Chart(
      chartKeuangan,
      {
         type:"bar",

         data:{
            labels:[
               "Jan","Feb","Mar","Apr",
               "Mei","Jun","Jul","Agu",
               "Sep","Okt","Nov","Des"
            ],
         
            datasets:[
               {
                  label:"Pemasukan",
                  data:pemasukanBulanan
               },
               {
                  label:"Pengeluaran",
                  data:pengeluaranBulanan
               }
            ]
         },

         options:{
            responsive:true,
            maintainAspectRatio:false
         }

      }
   );

}


/* ====================================
   FULL CALENDAR DASHBOARD
===================================== */

// Menunggu HTML:
// <div id="calendar"></div>
// <div id="ringkasanTanggal"></div>

document.addEventListener(
    "DOMContentLoaded",
    function(){
 
       const calendarEl =
       document.getElementById(
          "calendar"
       );
 
       if(!calendarEl) return;
 
       const calendar =
       new FullCalendar.Calendar(
          calendarEl,
          {
 
             initialView:
             "dayGridMonth",
 
             locale:"id",
 
             height:420,
 
             dateClick:function(info){
 
                document
                .querySelectorAll(
                   ".fc-daygrid-day"
                )
                .forEach(function(el){
 
                   el.classList.remove(
                      "fc-day-selected"
                   );
 
                });
 
                info.dayEl.classList.add(
                   "fc-day-selected"
                );
 
                let masuk = 0;
                let keluar = 0;
 
                dataPemasukanUnit
                .forEach(function(item){
 
                   const tanggalItem =
                   new Date(item.tanggal)
                   .toISOString()
                   .split("T")[0];
 
                   if(
                      tanggalItem
                      ===
                      info.dateStr
                   ){
                      masuk +=
                      Number(item.nominal);
                   }
 
                });
 
                dataPengeluaranUnit
                .forEach(function(item){
 
                   const tanggalItem =
                   new Date(item.tanggal)
                   .toISOString()
                   .split("T")[0];
 
                   if(
                      tanggalItem
                      ===
                      info.dateStr
                   ){
                      keluar +=
                      Number(item.nominal);
                   }
 
                });
 
                const saldo =
                masuk - keluar;
 
                const ringkasan =
                document.getElementById(
                   "ringkasanTanggal"
                );
 
                if(ringkasan){
 
                   ringkasan.innerHTML = `
                      <span>
                         📅 ${info.dateStr}
                      </span>
 
                      <span class="text-success fw-bold">
                         Pemasukan:
                         ${formatRupiah(masuk)}
                      </span>
 
                      <span class="text-danger fw-bold">
                         Pengeluaran:
                         ${formatRupiah(keluar)}
                      </span>
 
                      <span class="fw-bold">
                         Saldo:
                         ${formatRupiah(saldo)}
                      </span>
                   `;
 
                }
 
             }
 
          }
       );
 
       calendar.render();
 
    }
 );
