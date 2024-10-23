async function register(Cedula) {
  const formData = new URLSearchParams();
  formData.append("user_client", Cedula); // Reemplaza con tu username

  fetch("http://localhost:8000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Te Mandamos El Correo A Tu Correo Electronico.");
      }
    })
    .catch((error) => console.error("Error al obtener el token:", error));
}

const cedula = document.getElementById("cedula");
const btnregister = document.getElementById("register");
btnregister.addEventListener("click", (e) => {
  e.preventDefault();
  register(cedula.value);
});
