const usuario_ = document.getElementById("usuario_registrado");
const cerrar_ = document.getElementById("cerrar_Sesion");
const is_admin = document.getElementById("admin-section")

cerrar_.addEventListener('click',(e) => {
    e.preventDefault()
    localStorage.setItem("access_token", "")
    verificar_user()
})

function verificar_user(){
fetch('http://localhost:8000/users/me', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("access_token")
  }
})
.then(response => {
  if (!response.ok) {
    is_admin.style.display = "none"
    cerrar_.style.display = "none";
    usuario_.style.display = "none";  
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(data => {

  if (data.user) {
    usuario_.innerText = data.user;  
    usuario_.style.display = "block";
    cerrar_.style.display = "block";
    usuario_.style.color = "#fff"; 
    if(data.rol == "0"){
        is_admin.style.display = "block"
    } 
  } else {
        is_admin.style.display = "none"
    usuario_.style.display = "none";
    cerrar_.style.display = "none";
  }
})
.catch(error => {
  console.error('Error:', error);
});
}

verificar_user()