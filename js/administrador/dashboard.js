function showContent(option) {
    const displayArea = document.getElementById('displayArea');






    function user_list() {
        fetch('https://citas-express.vercel.app/admin/user/list', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token", ""),
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (window.location.href != "http://127.0.0.1:5500/index.html") {
                        window.location.href = "http://127.0.0.1:5500/index.html";
                    }
                    throw new Error('Error en la respuesta: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const userTableBody = document.querySelector('#userTable tbody');
                userTableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevos datos

                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.classList.add('rounded-row');
                    row.innerHTML = `
                <td>${user.user}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
                    userTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Hubo un error con la petición:', error);
            });
    }


    function dating_list() {
        fetch('https://citas-express.vercel.app/admin/dating/list', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token", ""),
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (window.location.href != "http://127.0.0.1:5500/index.html") {
                        window.location.href = "http://127.0.0.1:5500/index.html";
                    }
                    throw new Error('Error en la respuesta: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const userTableBody = document.querySelector('#datingList tbody');
                userTableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevos datos

                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.classList.add('rounded-row');
                    row.innerHTML = `
                <td>${user.patient}</td>
                <td>${user.doctor}</td>
                <td>${user.date_}</td>
                <td>${user.time}</td>

            `;
                    userTableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Hubo un error con la petición:', error);
            });
    }
    switch (option) {
        case 'opcion1':
            user_list()
            displayArea.innerHTML = '<h3>Lista de usuarios</h3><table id="userTable"> <thead><tr ><th><i class="fa-solid fa-id-card"></i> Cedula</th><th><i class="fa-solid fa-user"></i> Nombre</th><th><i class="fa-solid fa-envelope"></i> Email</th></thead><tbody></tbody></table>';
            break;
        case 'opcion2':
            dating_list()
            displayArea.innerHTML = '<h3>Lista de citas</h3><table id="datingList"> <thead><tr ><th><i class="fa-solid fa-id-card"></i> Cedula paciente</th><th><i class="fa-solid fa-user-doctor"></i> Doctor</th><th><i class="fa-solid fa-calendar-day"></i> Fecha</th><th><i class="fa-solid fa-clock"></i> Hora</th></thead><tbody></tbody></table>';
            break;
        case 'opcion3':
            displayArea.innerHTML = '<h3 id="create-title" >Crear usuario</h3><form action="" id="form-user-create"><label for="id">Cedula</label><input type="text" id="user-input" name="user"><label for="password" style="display:none;">Contraseña</label><input type="password" style="display:none;" name="password"><label for="rol">Rol</label><select name="rol" id="rol"><option name="rol" value="1">Paciente</option><option name="rol" value="2">Doctor</option></select><label for="email">Correo</label><input id="email-input" type="email" name="email"><label for="name">Nombre</label><input id="name-input" type="text" name="name" id="name"><label for="specialiy" id="l-speciality">Especialidad</label><select name="specialiy" id="speciality"><option value="0">Laboratorio</option><option value="1">Pediatria</option><option value="3">Medicina General</option></select><input type="submit" value="Crear" id="create-user" > <div id="loading-spinner"></div><div id="error-message">Asegurate de ingresar todos los datos</div></form>';
            const rol = document.getElementById('rol')
            const specility = document.getElementById('speciality')
            const label_speciality = document.getElementById('l-speciality')
            const createuser = document.getElementById('create-user')

            createuser.addEventListener('click', (e)=>{
                e.preventDefault()
                create_user()
            })

            rol.addEventListener('change', (e) => {
                e.preventDefault()

                if (rol.value == '1') {
                    label_speciality.style.visibility = 'hidden'
                    specility.style.visibility = 'hidden'
                } else {
                    label_speciality.style.visibility = 'visible'
                    specility.style.visibility = 'visible'
                }
            })

            break;
        default:
            displayArea.innerHTML = 'Selecciona una opción del menú.';
    }
}

function create_user() {
    document.getElementById("loading-spinner").style.display = "inline-block";
    document.getElementById("error-message").style.display = "none";
    
    const rol = document.getElementById('rol');
    const user = document.getElementById('user-input');
    const email = document.getElementById('email-input');
    const name = document.getElementById('name-input');
    const speciality = document.getElementById('speciality');
    
    if (rol.value == '1') {
        fetch('https://citas-express.vercel.app/admin/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
            body: JSON.stringify({
                user: user.value,
                password: "string",
                rol: rol.value,
                email: email.value,
                registered: false,
                name: name.value
            })
        })
        .then(response => {
            document.getElementById("loading-spinner").style.display = "none";
            if (response.status === 401) {
                // Redireccionar si no está autenticado
                if (window.location.href !== "http://127.0.0.1:5500/index.html") {
                    window.location.href = "http://127.0.0.1:5500/index.html";
                }
            } else if (response.ok) {
                document.getElementById("error-message").style.color = "green";
                document.getElementById("error-message").innerText = "Usuario creado correctamente";
                document.getElementById("error-message").style.display = "block";
            } else {
                document.getElementById("error-message").style.color = "red";
                document.getElementById("error-message").innerText = "Error al crear usuario";
                document.getElementById("error-message").style.display = "block";
            }
        })
        .catch(error => {
            document.getElementById("error-message").style.color = "red";
            document.getElementById("loading-spinner").style.display = "none";
            document.getElementById("error-message").innerText = "Error al crear usuario";
            document.getElementById("error-message").style.display = "block";
        });
    
    } else if (rol.value == '2') {

        fetch('https://citas-express.vercel.app/admin/doctor/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("access_token")
            },
            body: JSON.stringify({
                user: user.value,
                password: "string",
                rol: rol.value,
                email: email.value,
                registered: false,
                name: name.value,
                speciality: speciality.value
            })
        })
        .then(response => {
            document.getElementById("loading-spinner").style.display = "none";  // Oculta el spinner después de recibir la respuesta
            
            if (response.status === 401) {
                // Redirige si no está autenticado
                if (window.location.href !== "http://127.0.0.1:5500/index.html") {
                    window.location.href = "http://127.0.0.1:5500/index.html";
                }
            } else if (response.ok) {
                // Si la respuesta es exitosa
                document.getElementById("error-message").style.color = "green";
                document.getElementById("error-message").innerText = "Usuario creado correctamente";
                document.getElementById("error-message").style.display = "block";
            } else {
                // Si hay otro tipo de error
                document.getElementById("error-message").style.color = "red";
                document.getElementById("error-message").innerText = "Error al crear usuario";
                document.getElementById("error-message").style.display = "block";
            }
        })
        .catch(error => {
            document.getElementById("error-message").style.color = "red";
            document.getElementById("loading-spinner").style.display = "none";
            document.getElementById("error-message").innerText = "Error al crear usuario";
            document.getElementById("error-message").style.display = "block";
        });

    }
}


function toggleDropdown() {
    const dropdown = document.getElementById("usuarios-menu");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}


function toggleDropdownDating() {
    const dropdown = document.getElementById("dating-menu");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}