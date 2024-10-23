async function recuperar_contraseña(cedula) {
    const formData = new URLSearchParams();
    formData.append("user_client", cedula); // Reemplaza con tu username
  
    fetch("http://localhost:8000/user/code_verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Te Mandamos El Correo A Tu Correo Electronico.");
          setTimeout(2)
          window.location.href="cambiar_contraseña.html"
        }   
      })
      .catch((error) => console.error("Error al obtener el token:", error));
  }
  
  const cedula = document.getElementById("cedula");
  const btnregister = document.getElementById("recuperar");
  btnregister.addEventListener("click", (e) => {
    e.preventDefault();
    recuperar_contraseña(cedula.value);
  });
  