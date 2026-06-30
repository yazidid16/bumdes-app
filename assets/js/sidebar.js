/* =====================================
   SIDEBAR COLLAPSE
===================================== */

const menuToggle =
document.querySelector(".menu-toggle");

const sidebar =
document.querySelector(".sidebar");

menuToggle.addEventListener("click", function(){

    sidebar.classList.toggle("collapsed");

    
/* =====================================
   SIDEBAR COLLAPSE & MOBILE OUTSIDE CLICK
===================================== */

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

// 1. Fungsi klik tombol menu (Hamburger)
menuToggle.addEventListener("click", function(e){
    sidebar.classList.toggle("collapsed");
    
    // Cegah event klik diteruskan ke document biar gak langsung nutup lagi
    e.stopPropagation(); 
});

// 2. Fungsi tutup sidebar kalau klik area luar (Khusus Mobile)
document.addEventListener("click", function(e){
    
    // Cek apakah ini layar ukuran HP (768px ke bawah)
    if(window.innerWidth <= 768) {
        
        // Cek apakah sidebar sedang kebuka (memiliki class 'collapsed' di mobile)
        if(sidebar.classList.contains("collapsed")){
            
            // Jika area yang diklik BUKAN bagian dari dalam sidebar
            if(!sidebar.contains(e.target)){
                sidebar.classList.remove("collapsed"); // Tutup sidebar
            }
            
        }
    }
});
});

