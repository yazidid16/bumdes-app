/* =====================================
   AUTH SERVICE (FIXED)
===================================== */

// 1. REGISTER LOGIC
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

        // Simpan sebagai object user
        const userData = { username: user, password: pass };
        localStorage.setItem("user_bumdes", JSON.stringify(userData));
        
        alert("Akun berhasil dibuat! Silakan login.");
        window.location.href = "login.html";
    });
}

// 2. LOGIN LOGIC
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;
        
        // Ambil dari localStorage
        const savedUserJSON = localStorage.getItem("user_bumdes");

        if (!savedUserJSON) {
            alert("Belum ada akun terdaftar! Silakan daftar dulu.");
            return;
        }

        const savedUser = JSON.parse(savedUserJSON);

        // Verifikasi
        if (usernameInput === savedUser.username && passwordInput === savedUser.password) {
            localStorage.setItem("user_token", "bumdes_token_secure_99");
            alert("Login berhasil!");
            window.location.href = "dashboard-admin.html";
        } else {
            alert("Username atau Password salah!");
        }
    });
}

// 3. FUNGSI PROTEKSI (Pasang di dashboard)
function checkAuth() {
    const token = localStorage.getItem("user_token");
    if (!token) {
        window.location.href = "login.html";
    }
}
