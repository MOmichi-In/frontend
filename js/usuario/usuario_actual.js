const usuario_ = document.getElementById("usuario_registrado");
const cerrar_ = document.getElementById("cerrar_Sesion");
const content_ = document.getElementById('content_user');
const iniciar_sesion = document.getElementById('iniciar_sesion');
const userCircle = document.getElementById('userCircle');
const menuContent = document.getElementById('menuContent');


cerrar_.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("access_token", "");
    verificar_user();
});

userCircle.addEventListener('click', function () {
    // Alterna la visibilidad del menú
    if (menuContent.style.display === 'none' || menuContent.style.display === '') {
        menuContent.style.display = 'block'; // Muestra el menú
    } else {
        menuContent.style.display = 'none'; // Oculta el menú
    }
});

// Cierra el menú si se hace clic fuera de él
window.addEventListener('click', function (event) {
    if (!userCircle.contains(event.target) && !menuContent.contains(event.target)) {
        menuContent.style.display = 'none'; // Oculta el menú
    }
});
function verificar_user() {
    fetch('https://citas-express.vercel.app/users/me', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        }
    })
        .then(response => {
            if (!response.ok) {
                // Manejo de errores

                cerrar_.style.display = "none";
                usuario_.style.display = "none";
                content_.style.display = "none";
                if (window.location.href != "http://localhost:5500/index.html") {
                    window.location.href = "http://localhost:5500/index.html"
                }
                iniciar_sesion.style.display = "block"; // Mostrar iniciar sesión
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.user) {
                usuario_.innerText = data.name;
                usuario_.style.display = "block";
                cerrar_.style.display = "block";
                usuario_.style.color = "#00796b";
                content_.style.display = "block";
                iniciar_sesion.style.display = "none"; // Ocultar iniciar sesión
                // Mostrar la sección de administrador solo si el rol es "0"
                if (data.rol == "0") {
                       if(window.location.href != "http://localhost:5500/pages/administrador/dashboard.html"){
                        window.location.href = "http://localhost:5500/pages/administrador/dashboard.html";
                    }
                }
            } else {
                window.location.href = "http://localhost:5500/index.html"
                usuario_.style.display = "none";
                cerrar_.style.display = "none";
                content_.style.display = "none";
                iniciar_sesion.style.display = "block"; // Mostrar iniciar sesión
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}
verificar_user();