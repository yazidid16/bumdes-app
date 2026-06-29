/* =====================================
   TEMPAT NYIMPEN DATA SEMENTARA
   SELAMA HALAMAN MASIH DIBUKA
===================================== */

// Total seluruh pemasukan
let totalPemasukan = 0;

// Jumlah transaksi pemasukan
let jumlahTransaksi = 0;

// Semua data pemasukan
let dataPemasukan = [];

// Menyimpan index data yang sedang diedit
let indexEdit = -1;

/* =====================================
   AMBIL DATA DARI LOCAL STORAGE
===================================== */

const dataTersimpan =
localStorage.getItem("dataPemasukan");

if (dataTersimpan) {

    dataPemasukan =
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

const groupQuantity =
document.getElementById("groupQuantity");

const groupSatuan =
document.getElementById("groupSatuan");

const quantity =
document.getElementById("quantity");

const satuan =
document.getElementById("satuan");


/* =====================================
   DAFTAR KATEGORI PEMASUKAN
   AGAR MUDAH DITAMBAH KE DEPANNYA
===================================== */

const kategoriPemasukan = {

   APBDes: [
      "Dana Desa",
      "Dana Negara",
      "Lainnya"
   ],

   "Klinik Kesehatan": [
      "Pemeriksaan Umum",
      "Konsultasi Kesehatan",
      "Lainnya"
   ],

   "Rasio Kopi": [
      "Penjualan Kopi",
      "Penjualan Makanan",
      "Lainnya"
   ],

   "Pariwisata & Camping": [
      "Tiket Masuk Curug",
      "Sewa Tenda",
      "Sewa Pelampung",
      "Lainnya"
   ],

   "Internet": [
      "Komisi Internet",
      "Lainnya"
   ]

};

// Dropdown Kategori Pemasukan
const kategori =
document.getElementById("kategori");

/* =====================================
   KUNCI FORM SAAT PERTAMA DIBUKA
===================================== */

unitUsaha.disabled = true;
kategori.disabled = true;

// Input Nominal pemasukan
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

// Body tabel riwayat pemasukan
const tablePemasukan =
document.getElementById("tablePemasukan");

/* =====================================
   TAMPILKAN DATA DARI LOCAL STORAGE KE TABLE
===================================== */
dataPemasukan.forEach(function(transaksi, index){
   
   const row = `
   <tr>
       <td>${transaksi.tanggal}</td>
       <td>${transaksi.unitUsaha || "-"}</td>
       <td>${transaksi.kategori}</td>

       <td>
   ${
      transaksi.quantity
? transaksi.quantity + " " + transaksi.satuan
: "-"
   }
</td>
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

   tablePemasukan.innerHTML += row;

});


/* =====================================
   HITUNG DAN UPDATE CARD DASHBOARD
   AGAR TOTAL SELALU SESUAI DATA TERBARU
===================================== */

const cardPemasukanHariIni =
document.getElementById("cardPemasukanHariIni");

const cardTotalPemasukanBulan =
document.getElementById("cardTotalPemasukanBulan");

const cardJumlahTransaksi =
document.getElementById("cardJumlahTransaksi");

let totalHariIni = 0;
let totalBulanIni = 0;

dataPemasukan.forEach(function(transaksi){

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
dataPemasukan.length;

cardPemasukanHariIni.textContent =
"Rp " +
totalHariIni.toLocaleString("id-ID");

cardTotalPemasukanBulan.textContent =
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
      "dataPemasukanAPBDes"
   );

   localStorage.removeItem(
      "dataPemasukanKlinik"
   );

   localStorage.removeItem(
      "dataPemasukanRasioKopi"
   );

   localStorage.removeItem(
      "dataPemasukanPariwisata"
   );

   localStorage.removeItem(
      "dataPemasukanInternet"
   );

}
function sinkronDashboardUnitUsaha(){

   resetStorageUnitUsaha();

   dataPemasukan.forEach(function(transaksi){

      if(
         transaksi.sumberTransaksi
         ===
         "APBDes"
      ){
         simpanKeStorage(
            "dataPemasukanAPBDes",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Klinik Kesehatan"
      ){
         simpanKeStorage(
            "dataPemasukanKlinik",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Rasio Kopi"
      ){
         simpanKeStorage(
            "dataPemasukanRasioKopi",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Pariwisata & Camping"
      ){
         simpanKeStorage(
            "dataPemasukanPariwisata",
            transaksi
         );
      }

      if(
         transaksi.unitUsaha
         ===
         "Internet"
      ){
         simpanKeStorage(
            "dataPemasukanInternet",
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

    const jumlah =
    nominal.value.replace(/\./g, "");


    /* =====================================
       VALIDASI FORM
       Mencegah data kosong tersimpan
    ===================================== */

    if (
      tanggal === "" ||
      sumber === "" ||
      kategori.value === "Pilih Kategori" ||
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
   (
      unit === "" ||
      unit === "Pilih Unit Usaha"
   )
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

   unitUsaha:

   sumberTransaksi.value === "APBDes"

   ? ""

   : unitUsaha.value,

   kategori: kategori.value,

   nominal: nominal.value.replace(/\./g, ""),

   quantity:
(
   unitUsaha.value === "Rasio Kopi"
   &&
   kategori.value === "Penjualan Kopi"
)
? quantity.value
: "",

satuan:
(
   unitUsaha.value === "Rasio Kopi"
   &&
   kategori.value === "Penjualan Kopi"
)
? "Gram"
: "",

   keterangan: keterangan.value

};

/* =====================================
  MASUKKAN KE ARRAY
===================================== */

if(indexEdit == -1){

   dataPemasukan.push(transaksi);
   
/* =====================================
   SIMPAN KE DASHBOARD UNIT USAHA
===================================== */

if(
   transaksi.sumberTransaksi
   ===
   "APBDes"
){
   simpanKeStorage(
      "dataPemasukanAPBDes",
      transaksi
   );
}

if(
   transaksi.unitUsaha
   ===
   "Klinik Kesehatan"
){
   simpanKeStorage(
      "dataPemasukanKlinik",
      transaksi
   );
}

if(
   transaksi.unitUsaha
   ===
   "Rasio Kopi"
){
   simpanKeStorage(
      "dataPemasukanRasioKopi",
      transaksi
   );
}

if(
   transaksi.unitUsaha
   ===
   "Pariwisata & Camping"
){
   simpanKeStorage(
      "dataPemasukanPariwisata",
      transaksi
   );
}

if(
   transaksi.unitUsaha
   ===
   "Internet"
){
   simpanKeStorage(
      "dataPemasukanInternet",
      transaksi
   );
}

}else{

   dataPemasukan[indexEdit] =
   transaksi;

   localStorage.setItem(
      "dataPemasukan",
      JSON.stringify(dataPemasukan)
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

   "dataPemasukan",

   JSON.stringify(dataPemasukan)

);
Swal.fire({
   icon: "success",
   title: "Berhasil!",
   text: "Data pemasukan berhasil ditambahkan.",
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

         dataPemasukan.splice(
            index,
            1
         );
         
         localStorage.setItem(
            "dataPemasukan",
            JSON.stringify(dataPemasukan)
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
       dataPemasukan[index];

       // Simpan index yang sedang diedit
       indexEdit = index;
       
       // Masukkan data ke form
       tanggalTransaksi.value =
       data.tanggal;

       sumberTransaksi.value =
      data.sumberTransaksi;

      sumberTransaksi.disabled = true;

      unitUsaha.value =
      data.unitUsaha;

      unitUsaha.disabled = true;

      kategori.disabled = true;

       nominal.value =
       Number(data.nominal)
       .toLocaleString("id-ID");

       quantity.value =
       data.quantity || "";

       keterangan.value =
       data.keterangan;

       if(
         data.unitUsaha === "Rasio Kopi"
         &&
         data.kategori === "Penjualan Kopi"
      ){
      
         groupQuantity.style.display =
         "block";
      
         groupSatuan.style.display =
         "block";
      
         quantity.value =
         data.quantity || "";
      
         satuan.value =
         data.satuan || "Gram";
      
      }else{
      
         groupQuantity.style.display =
         "none";
      
         groupSatuan.style.display =
         "none";
      
      }
      
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

      if(
         this.value === "APBDes"
      ){

         unitUsaha.disabled = true;

      }else{

         unitUsaha.disabled = false;

      }

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
      kategoriPemasukan.APBDes;

   }else{

      daftarKategori =
      kategoriPemasukan[
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
   updateQuantityField();
}

unitUsaha.addEventListener(
   "change",
   function(){

      updateKategori();

   }
);

function updateQuantityField(){

   const quantityConfig = {

      "Penjualan Kopi": {
         satuan: "Gram"
      }

   };

   const config =
   quantityConfig[
      kategori.value
   ];

   if(config){

      groupQuantity.style.display =
      "block";

      groupSatuan.style.display =
      "block";

      satuan.value =
      config.satuan;

   }else{

      groupQuantity.style.display =
      "none";

      groupSatuan.style.display =
      "none";

      quantity.value = "";

   }

}


kategori.addEventListener(
   "change",
   updateQuantityField
);