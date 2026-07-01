/* =====================================
   AUTH SERVICE (FUTURE-PROOF)
===================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simulasi Auth Service
        // NANTI: Ganti pakai fetch('/api/login', { method: 'POST', body: ... })
        if (username === "admin" && password === "123") {
            // Sukses
            localStorage.setItem("user_token", "bumdes_token_secure_99");
            alert("Login berhasil!");
            window.location.href = "dashboard-admin.html";
        } else {
            alert("Username atau Password salah!");
        }
    });
}

// FUNGSI PROTEKSI (Pasang di setiap halaman Dashboard)
function checkAuth() {
    const token = localStorage.getItem("user_token");
    if (!token) {
        window.location.href = "login.html";
    }
}
