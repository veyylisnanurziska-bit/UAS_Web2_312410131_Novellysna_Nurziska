// ===============================
// AUTH.JS
// ===============================

const btnLogin = document.getElementById("btnLogin");
const pesan = document.getElementById("pesan");

btnLogin.addEventListener("click", login);

async function login() {

    pesan.innerHTML = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {

        pesan.innerHTML = "Username dan Password wajib diisi";

        return;

    }

    btnLogin.disabled = true;
    btnLogin.innerHTML = "Loading...";

    try {

        const form = new URLSearchParams();

        form.append("username", username);
        form.append("password", password);

        const response = await fetch(

            CONFIG.BASE_URL + CONFIG.ENDPOINTS.LOGIN,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },

                body: form
            }

        );

        const result = await response.json();

        if (result.status) {

            localStorage.setItem("token", result.token);

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            window.location.href = "pages/dashboard.html";

        } else {

            pesan.innerHTML = result.message;

        }

    } catch (err) {

        console.error(err);

        pesan.innerHTML = "Server tidak dapat dihubungi.";

    }

    btnLogin.disabled = false;
    btnLogin.innerHTML = "Login";

}