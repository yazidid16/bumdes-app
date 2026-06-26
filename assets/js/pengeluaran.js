/* =====================================
   TEMPAT NYIMPEN DATA SEMENTARA
   SELAMA HALAMAN MASIH DIBUKA
===================================== */

// Total seluruh pengeluaran
let totalPengeluaran = 0;

// Jumlah transaksi pengeluaran
let jumlahTransaksi = 0;

// Semua data pengeluaran
let dataPengeluaran = [];

// Menyimpan index data yang sedang diedit
let indexEdit = -1;

/* =====================================
   AMBIL DATA DARI LOCAL STORAGE
===================================== */

const dataTersimpan =
localStorage.getItem("dataPengeluaran");

if (dataTersimpan) {

    dataPengeluaran =
    JSON.parse(dataTersimpan);

}

/* =====================================
   AMBIL SEMUA ELEMEN HTML
   AGAR BISA DIGUNAKAN DI JAVASCRIPT
===================================== */

// Tombol Simpan Transaksi
const btnSimpan =
document.getElementById("btnSimpan");

// Otomatis Tanggal Hari ini
const tanggalHariIni =
document.getElementById("tanggalHariIni");

/* =====================================
   SIAPKAN HALAMAN SAAT PERTAMA DIBUKA
===================================== */

const hariIni = new Date();

const opsiTanggal = {
    day: "numeric",
    month: "long",
    year: "numeric"
};

tanggalHariIni.textContent =
hariIni.toLocaleDateString("id-ID", opsiTanggal);

// Input Tanggal Transaksi
const tanggalTransaksi =
document.getElementById("tanggalTransaksi");

/* =====================================
   SET TANGGAL INPUT OTOMATIS
===================================== */
const tahun =
hariIni.getFullYear();

const bulan =
String(
   hariIni.getMonth() + 1
).padStart(2, "0");

const tanggal =
String(
   hariIni.getDate()
).padStart(2, "0");

tanggalTransaksi.value =
`${tahun}-${bulan}-${tanggal}`;

// Dropdown Unit Usaha
const unitUsaha =
document.getElementById("unitUsaha");

// Dropdown Sumber Transaksi
const sumberTransaksi =
document.getElementById("sumberTransaksi");

/* =====================================
   DAFTAR KATEGORI pengeluaran
   AGAR MUDAH DITAMBAH KE DEPANNYA
===================================== */

const kategoriPengeluaran = {

   APBDes: [
      "Modal Usaha",
      "Pengembangan Usaha",
      "Operasional",
      "Pembelian Aset",
      "Lainnya"
   ],

   "Klinik Kesehatan": [
      "Obat",
      "ATK",
      "Gaji",
      "Listrik",
      "Peralatan",
      "Lainnya"
   ],

   "Rasio Kopi": [
      "Biji Kopi",
      "Susu",
      "Gula",
      "Cup",
      "Gas",
      "Lainnya"
   ],

   "Pariwisata & Camping": [
      "Perawatan Area",
      "Peralatan Camping",
      "Promosi",
      "Lainnya"
   ],

   "Internet": [
      "Perangkat",
      "Maintenance",
      "Listrik",
      "Lainnya"
   ]

};

// Dropdown Kategori pengeluaran
const kategori =
document.getElementById("kategori");

/* =====================================
   KUNCI FORM SAAT PERTAMA DIBUKA
===================================== */

unitUsaha.disabled = true;
kategori.disabled = true;

// Input Nominal pengeluaran
const nominal =
document.getElementById("nominal");

/* =====================================
   FORMAT RUPIAH OTOMATIS
   Saat user mengetik nominal
===================================== */
nominal.addEventListener("input", function(){

   let angka =
   this.value.replace(/\D/g, "");

   this.value =
   Number(angka).toLocaleString("id-ID");

});

// Input Keterangan
const keterangan =
document.getElementById("keterangan");

// Body tabel riwayat pengeluaran
const tablePengeluaran =
document.getElementById("tablePengeluaran");

/* =====================================
   TAMPILKAN DATA DARI LOCAL STORAGE KE TABLE
===================================== */
dataPengeluaran.forEach(function(transaksi, index){
   
   const row = `
   <tr>
       <td>${transaksi.tanggal}</td>
       <td>${transaksi.unitUsaha || "-"}</td>
       <td>${transaksi.kategori}</td>
       <td>
           Rp ${Number(transaksi.nominal)
           .toLocaleString("id-ID")}
       </td>
       <td>
          <button
class="btn btn-warning btn-sm btn-edit"
data-index="${index}">
    Edit
</button>

          <button class="btn btn-danger btn-sm btn-hapus" data-index="${index}">Hapus
          </button>

       </td>
   </tr>
   `;

   tablePengeluaran.innerHTML += row;

});


/* =====================================
   HITUNG DAN UPDATE CARD DASHBOARD
   AGAR TOTAL SELALU SESUAI DATA TERBARU
===================================== */

const cardPengeluaranHariIni=
document.getElementById("cardPengeluaranHariIni");

const cardTotalPengeluaranBulan =
document.getElementById("cardTotalPengeluaranBulan");

const cardJumlahTransaksi =
document.getElementById("cardJumlahTransaksi");

let totalHariIni = 0;
let totalBulanIni = 0;

dataPengeluaran.forEach(function(transaksi){

   const nominal =
   Number(transaksi.nominal);

   const tanggal =
   new Date(transaksi.tanggal);

   if(
      tanggal.toDateString()
      ===
      hariIni.toDateString()
   ){
      totalHariIni += nominal;
   }

   if(
      tanggal.getMonth()
      ===
      hariIni.getMonth()
      &&
      tanggal.getFullYear()
      ===
      hariIni.getFullYear()
   ){
      totalBulanIni += nominal;
   }

});

jumlahTransaksi =
dataPengeluaran.length;

cardPengeluaranHariIni.textContent =
"Rp " +
totalHariIni.toLocaleString("id-ID");

cardTotalPengeluaranBulan.textContent =
"Rp " +
totalBulanIni.toLocaleString("id-ID");

cardJumlahTransaksi.textContent =
jumlahTransaksi;

/* =====================================
   HELPER SIMPAN STORAGE
===================================== */

function simpanKeStorage(
   key,
   transaksi
){

   let data =
   JSON.parse(
      localStorage.getItem(key)
   ) || [];

   data.push(transaksi);

   localStorage.setItem(
      key,
      JSON.stringify(data)
   );

}

function resetStorageUnitUsaha(){

   localStorage.removeItem(
      "dataPengeluaranAPBDes"
   );

   localStorage.removeItem(
      "dataPengeluaranKlinik"
   );

   localStorage.removeItem(
      "dataPengeluaranRasioKopi"
   );

   localStorage.removeItem(
      "dataPengeluaranPariwisata"
   );

   localStorage.removeItem(
      "dataPengeluaranInternet"
   );

}

function sinkronDashboardUnitUsaha(){

   resetStorageUnitUsaha();

   dataPengeluaran.forEach(function(transaksi){

      if(
         transaksi.sumberTransaksi
         ===
         "APBDes"
      ){
         simpanKeStorage(
            "dataPengeluaranAPBDes",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Klinik Kesehatan"
      ){
         simpanKeStorage(
            "dataPengeluaranKlinik",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Rasio Kopi"
      ){
         simpanKeStorage(
            "dataPengeluaranRasioKopi",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Pariwisata & Camping"
      ){
         simpanKeStorage(
            "dataPengeluaranPariwisata",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Internet"
      ){
         simpanKeStorage(
            "dataPengeluaranInternet",
            transaksi
         );
      }

   });

}

/* =====================================
   EVENT TOMBOL SIMPAN
   Dijalankan saat user menekan tombol
   "Simpan Transaksi"
===================================== */

btnSimpan.addEventListener("click", function () {

    /* =====================================
       AMBIL DATA DARI FORM
       Mengambil seluruh input yang
       diisi oleh user
    ===================================== */

    const tanggal =
    tanggalTransaksi.value;

    const sumber =
    sumberTransaksi.value;

    if(
      sumberTransaksi.selectedIndex === 0
   ){
      Swal.fire({
         icon: "warning",
         title: "Oops...",
         text: "Pilih Sumber Transaksi terlebih dahulu!"
      });
      return;
   }

    const unit =
    unitUsaha.value;

    if(
      unitUsaha.selectedIndex === 0
   ){
      Swal.fire({
         icon: "warning",
         title: "Oops...",
         text: "Pilih Unit Usaha terlebih dahulu!"
      });
      return;
   }

    const jumlah =
    nominal.value.replace(/\./g, "");


    /* =====================================
       VALIDASI FORM
       Mencegah data kosong tersimpan
    ===================================== */

    if (
      tanggal === "" ||
      sumber === "" ||
      kategori.value === "" ||
      jumlah === ""
  ){
   Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Semua field wajib diisi!"
   });
   return;
  }

  if(
   sumber === "Unit Usaha" &&
   unit === ""
){
   Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Pilih Unit Usaha terlebih dahulu!"
   });
   return;
}

/* =====================================
   BUNGKUS DATA FORM
   MENJADI OBJECT TRANSAKSI
===================================== */

const transaksi = {

   id: Date.now(),

   tanggal: tanggalTransaksi.value,

   sumberTransaksi: sumberTransaksi.value,

   unitUsaha: unitUsaha.value,

   kategori: kategori.value,

   nominal: nominal.value.replace(/\./g, ""),

   keterangan: keterangan.value

};

/* =====================================
  MASUKKAN KE ARRAY
===================================== */

if(indexEdit == -1){

   dataPengeluaran.push(transaksi);

   sinkronDashboardUnitUsaha();

}else{

   dataPengeluaran[indexEdit] =
   transaksi;

   localStorage.setItem(
      "dataPengeluaran",
      JSON.stringify(dataPengeluaran)
   );
   sinkronDashboardUnitUsaha();
   Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Perubahan data berhasil disimpan.",
      timer: 2000,
      showConfirmButton: false
   }).then(() => {
   
      location.reload();
   
   });
   
   return;

}

/* =====================================
   SIMPAN DATA KE LOCAL STORAGE
   AGAR TIDAK HILANG SAAT REFRESH
===================================== */

localStorage.setItem(
   "dataPengeluaran",
   JSON.stringify(dataPengeluaran)
);

sinkronDashboardUnitUsaha();
Swal.fire({
   icon: "success",
   title: "Berhasil!",
   text: "Data pengeluaran berhasil ditambahkan.",
   timer: 2000,
   showConfirmButton: false
}).then(() => {

   location.reload();

});

return;

});


    /* =====================================
      TOMBOL HAPUS TRANSAKSI
   ===================================== */
   document.addEventListener("click", function(e){

   if(
       e.target.classList.contains("btn-hapus")
   ){

       const index =
       e.target.dataset.index;

       if(
           confirm(
               "Yakin mau hapus data ini?"
           )
       ){

         dataPengeluaran.splice(
               index,
               1
           );

           localStorage.setItem(
               "dataPengeluaran",
               JSON.stringify(dataPengeluaran)
           );
           sinkronDashboardUnitUsaha();
           Swal.fire({
   icon: "success",
   title: "Berhasil!",
   text: "Data berhasil dihapus.",
   timer: 2000,
   showConfirmButton: false
}).then(() => {

   location.reload();

});

return;
       }

   }

});

/* =====================================
   TOMBOL EDIT TRANSAKSI
===================================== */

document.addEventListener("click", function(e){

   
   if(
       e.target.classList.contains("btn-edit")
   ){

       const index =
       e.target.dataset.index;

       const data =
       dataPengeluaran[index];

       // Simpan index yang sedang diedit
       indexEdit = index;
       
       // Masukkan data ke form
       tanggalTransaksi.value =
       data.tanggal;

       sumberTransaksi.value =
       data.sumberTransaksi;
       
       unitUsaha.value =
       data.unitUsaha;

       nominal.value =
       Number(data.nominal)
       .toLocaleString("id-ID");

       keterangan.value =
       data.keterangan;

       unitUsaha.disabled = false;
      
      updateKategori();

kategori.value =
data.kategori;

Swal.fire({
   icon: "info",
   title: "Mode Edit Aktif",
   text: "Silakan ubah data lalu klik Simpan."
});
   }

});


/* =====================================
   GANTI KATEGORI OTOMATIS
   SAAT SUMBER TRANSAKSI BERUBAH
===================================== */

sumberTransaksi.addEventListener(
   "change",
   function(){

      unitUsaha.disabled = false;
      kategori.disabled = false;

      updateKategori();

});


/* =====================================
   PERBARUI DAFTAR KATEGORI
   SESUAI PILIHAN SUMBER TRANSAKSI
===================================== */
function updateKategori(){

   kategori.innerHTML = "";

   let daftarKategori = [];

   if(
      sumberTransaksi.value === "APBDes"
   ){

      daftarKategori =
      kategoriPengeluaran.APBDes;

   }else{

      daftarKategori =
      kategoriPengeluaran[
         unitUsaha.value
      ] || [];

   }

   daftarKategori.forEach(function(item){

      kategori.innerHTML += `
         <option value="${item}">
            ${item}
         </option>
      `;

   });

}

unitUsaha.addEventListener(
   "change",
   updateKategori
);
