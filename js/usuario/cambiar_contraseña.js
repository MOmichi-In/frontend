// Función de inicio de sesión

async function cambiar_contraseña(cedula, password, codigo) {
    const formData = new URLSearchParams();
    formData.append("user", cedula); // Reemplaza con tu username
    formData.append("new_password", password); // Reemplaza con tu password
    formData.append("code", codigo); // Reemplaza con tu username
  
    fetch("https://citas-express.vercel.app/user/changed_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((response) => { 
        if(response.ok) { 
            alert("Su Contraseña A Sido Cambiada Correctamente")
            setTimeout(2)
            window.location.href = "inicio_sesion.html"
        }
      })
      
      .catch((error) => console.error("Error al obtener el token:", error));
  }
  
  const password = document.getElementById("password");
  const cedula = document.getElementById("cedula");
  const code = document.getElementById("code");
  const btnchange = document.getElementById("cambiar_contraseña");
  btnchange.addEventListener("click", (e) => {
    e.preventDefault();
    cambiar_contraseña(cedula.value, password.value, code.value);
  });
  
  