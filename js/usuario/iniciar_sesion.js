async function login(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  // Mostrar el spinner de carga
  document.getElementById("loading-spinner").style.display = "inline-block";
  document.getElementById("error-message").style.display = "none"; // Ocultar mensaje de error si existe

  try {
    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();

    if (data.access_token) {
      console.log("Token recibido:", data.access_token);
      localStorage.setItem("access_token", data.access_token);

      // Redirigir al index.html si las credenciales son correctas
      window.location.href = "http://127.0.0.1:5500/index.html";
    } else {
      // Mostrar mensaje de error
      document.getElementById("error-message").style.display = "block";
    }
  } catch (error) {
    console.error("Error al obtener el token:", error);
    document.getElementById("error-message").style.display = "block"; // Mostrar error
  } finally {
    // Ocultar el spinner de carga
    document.getElementById("loading-spinner").style.display = "none";
  }
}

const password = document.getElementById("password");
const user = document.getElementById("usuario");
const btnlogin = document.getElementById("login");

btnlogin.addEventListener("click", (e) => {
  e.preventDefault();
  login(user.value, password.value);
});
