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

const dataPemasukanAPBDes =
JSON.parse(
   localStorage.getItem("dataPemasukanAPBDes")
) || [];

const dataPengeluaranAPBDes =
JSON.parse(
   localStorage.getItem("dataPengeluaranAPBDes")
) || [];

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

const sisaDanaAPBDes =
document.getElementById(
    "sisaDanaAPBDes"
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

dataPemasukanAPBDes.forEach(function(item){

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

dataPengeluaranAPBDes.forEach(function(item){

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
"Rp " +
totalMasukHariIni.toLocaleString("id-ID");

pemasukanBulanIni.textContent =
"Rp " +
totalMasukBulanIni.toLocaleString("id-ID");

pemasukanTahunIni.textContent =
"Rp " +
totalMasukTahunIni.toLocaleString("id-ID");

totalPemasukan.textContent =
"Rp " +
totalMasukSemua.toLocaleString("id-ID");

pengeluaranHariIni.textContent =
"Rp " +
totalKeluarHariIni.toLocaleString("id-ID");

pengeluaranBulanIni.textContent =
"Rp " +
totalKeluarBulanIni.toLocaleString("id-ID");

pengeluaranTahunIni.textContent =
"Rp " +
totalKeluarTahunIni.toLocaleString("id-ID");

totalPengeluaran.textContent =
"Rp " +
totalKeluarSemua.toLocaleString("id-ID");

const sisaDana =
totalMasukSemua -
totalKeluarSemua;

if(sisaDanaAPBDes){

    sisaDanaAPBDes.textContent =
    "Rp " +
    sisaDana.toLocaleString("id-ID");

}


function buatTableTransaksi(data){
    let totalNominal = 0;

    data.sort(function(a,b){

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

    data.forEach(function(item){

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
                Rp ${Number(item.nominal)
                .toLocaleString("id-ID")}
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
            Rp ${totalNominal.toLocaleString("id-ID")}
        </strong>

    </div>
    `;

    return html;

}

const cardPemasukanHariIni =
document.getElementById(
    "cardPemasukanHariIni"
);

cardPemasukanHariIni.addEventListener(
    "click",
    function(){

        const dataHariIni =
dataPemasukanAPBDes.filter(function(item){

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
   HELPER CARD CLICK
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

    document
.getElementById(
    "cardPemasukanBulanIni"
)
.addEventListener(
    "click",
    function(){

        const dataBulanIni =
        dataPemasukanAPBDes.filter(function(item){
        
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
    document
.getElementById(
    "cardPemasukanTahunIni"
)
.addEventListener(
    "click",
    function(){

        const dataTahunIni =
dataPemasukanAPBDes.filter(function(item){

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
        dataPemasukanAPBDes
    );


    document
.getElementById(
    "cardPengeluaranHariIni"
)
.addEventListener(
    "click",
    function(){

        const dataHariIni =
dataPengeluaranAPBDes.filter(function(item){

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


    document
    .getElementById(
        "cardPengeluaranBulanIni"
    )
    .addEventListener(
        "click",
        function(){
    
            const dataBulanIni =
            dataPengeluaranAPBDes.filter(function(item){
            
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

        document
    .getElementById(
        "cardPengeluaranTahunIni"
    )
    .addEventListener(
        "click",
        function(){
    
            const dataTahunIni =
            dataPengeluaranAPBDes.filter(function(item){
            
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
            dataPengeluaranAPBDes
        );