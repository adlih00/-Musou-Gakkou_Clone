document.getElementById("loginForm").addEventListener("submit", async function(e) {

    e.preventDefault(); // evita recargar la página

    const correoUsuario = document.getElementById("correoUsuario").value;
    const contrasenaUsuario = document.getElementById("contrasenaUsuario").value;

    try {

        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `correoUsuario=${encodeURIComponent(correoUsuario)}&contrasena=${encodeURIComponent(contrasenaUsuario)}`
        });

        if (response.status === 201) {

            const token = await response.text();

            // Guardar token
            localStorage.setItem("jwt", token);

            alert("Sesión iniciada con exito");

            // Redirigir a página cuenta
            window.location.href = "pages/cuenta.html";

        } else {
            alert("Credenciales incorrectas");
        }

    } catch (error) {
        console.error(error);
    }

});
