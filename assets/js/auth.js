function isLoggedIn() {
    return localStorage.getItem("jwt") !== null;
}

function actualizarNavbar() {

    const btnLogin = document.getElementById("btn-Log-in");
    const btnRegistrate = document.getElementById("btn-registrate");

    if (!btnLogin || !btnRegistrate) return;

    if (isLoggedIn()) {
        btnLogin.textContent = "Mi cuenta";
        btnLogin.href = "pages/cuenta.html";

        btnRegistrate.textContent = "Cerrar sesión";
        btnRegistrate.href = "index.html"

        btnRegistrate.addEventListener("click", function (e) {
          e.preventDefault();
          logout();
        });

    } else {
        btnLogin.textContent = "Log in";
        btnLogin.href = "pages/logIn.html";

        btnRegistrate.textContent = "Registrate";
        btnRegistrate.href = "pages/registro.html"
    }

    console.log("NavBar Actualizada");
}

function protegerPagina() {
    if (!isLoggedIn()) {
        window.location.href = "pages/logIn.html";
    }
}

function logout() {
    localStorage.removeItem("jwt");
    actualizarNavbar();
    window.location.href = "index.html";
}

export {actualizarNavbar, protegerPagina, logout};
