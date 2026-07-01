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


/* =====================================
   AUTH SERVICE (FUTURE-PROOF)
===================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const user = document.getElementById("regUsername").value;
        const pass = document.getElementById("regPassword").value;
        const conf = document.getElementById("confirmPassword").value;

        if (pass !== conf) {
            alert("Password tidak cocok!");
            return;
        }

        // Simulasi Save ke Database
        // NANTI: Ganti fetch('/api/register', ...)
        const userData = { username: user, password: pass };
        localStorage.setItem("user_bumdes", JSON.stringify(userData));
        
        alert("Akun berhasil dibuat! Silakan login.");
        window.location.href = "login.html";
    });
}

// Update juga logic login di auth.js biar ngecek ke localStorage
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const savedUser = JSON.parse(localStorage.getItem("user_bumdes"));

        if (savedUser && username === savedUser.username && password === savedUser.password) {
            localStorage.setItem("user_token", "bumdes_token_secure_99");
            window.location.href = "dashboard-admin.html";
        } else {
            alert("Username atau Password salah!");
        }
    });
}
