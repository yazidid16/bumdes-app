formatRupiah()
ambilDataPemasukan()
ambilDataPengeluaran()
bukaModal()
buatTableTransaksi()

/* =====================================
   FORMAT RUPIAH
===================================== */

function formatRupiah(nilai){

    return "Rp " +
    Number(nilai)
    .toLocaleString("id-ID");

}

/* =====================================
   AMBIL DATA PEMASUKAN
===================================== */

function ambilDataPemasukan(){

    return JSON.parse(
        localStorage.getItem(
            "dataPemasukan"
        )
    ) || [];

}

/* =====================================
   AMBIL DATA PENGELUARAN
===================================== */

function ambilDataPengeluaran(){

    return JSON.parse(
        localStorage.getItem(
            "dataPengeluaran"
        )
    ) || [];

}

/* =====================================
   FORMAT TANGGAL INDONESIA
===================================== */

function formatTanggal(tanggal){

    return new Date(tanggal)
    .toLocaleDateString(
        "id-ID",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );

}

/* =====================================
   HITUNG DATA BULANAN
===================================== */

function hitungDataBulanan(data){

    const hasil =
    [0,0,0,0,0,0,0,0,0,0,0,0];

    data.forEach(function(item){

        const bulan =
        new Date(item.tanggal)
        .getMonth();

        hasil[bulan] +=
        Number(item.nominal);

    });

    return hasil;

}