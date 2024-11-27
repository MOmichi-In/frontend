function showContent(option) {
    const displayArea = document.getElementById('displayArea');

    function doctor_list(){
        fetch('https://citas-express.vercel.app/admin/doctor/list', {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
                const doctorTableBody = document.querySelector('#doctorTable tbody');
                doctorTableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevos datos

                data.forEach(doctor => {
                    const row = document.createElement('tr');
                    row.classList.add('rounded-row');
                    row.innerHTML = `
                <td>${doctor.user}</td>
                <td>${doctor.name}</td>
                <td>${doctor.speciality == 3 ? 'Medicina General'   : 'Pediatria'}</td>

            `;
            doctorTableBody.appendChild(row);
                });
            })
            .catch(error => {
              console.error('There was an error with the request:', error);
            });
          
    }


    function loadDoctorsBySpeciality(speciality) {
        const doctorSelect = document.getElementById('doctor-canva');
        doctorSelect.innerHTML = '<option value="">Cargando doctores...</option>'; // Indicador visual
    
        fetch('https://citas-express.vercel.app/admin/doctor/speciality', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `doctors_speciality=${speciality}`,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                doctorSelect.innerHTML = ''; // Limpiar antes de añadir opciones
                if (data.length > 0) {
                    data.forEach(doctor => {
                        const option = document.createElement('option');
                        option.value = doctor.user;
                        option.textContent = `${doctor.name}`;
                        doctorSelect.appendChild(option);
                    });
                } else {
                    const noOption = document.createElement('option');
                    noOption.value = '';
                    noOption.textContent = 'No hay doctores disponibles';
                    doctorSelect.appendChild(noOption);
                }
            })
            .catch(error => {
                console.error('Error al cargar doctores:', error);
                doctorSelect.innerHTML = '<option value="">Error al cargar doctores</option>';
            });
    }

    function loadAvailableTimes(doctorId, date) {
        const horaSelect = document.getElementById('hora-select');
        horaSelect.innerHTML = '<option value="">Cargando horas...</option>'; // Indicador visual
    
        fetch(`https://citas-express.vercel.app/admin/doctor/schedule/list?doctors_id=${doctorId}&date_=${date}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                horaSelect.innerHTML = ''; // Limpiar el select antes de añadir opciones
                console.log(data.schedule)
                if (data.schedule.length > 0) {
                    data.schedule.forEach(time => {
                        if(!time[1]){
                        const option = document.createElement('option');
                        option.value = time[0];
                        option.textContent = time[0];
                        horaSelect.appendChild(option);
                        }
                        
                    });
                } else {
                    horaSelect.innerHTML = '<option value="">No hay horas disponibles</option>';
                }
            })
            .catch(error => {
                console.error('Error al cargar las horas:', error);
                horaSelect.innerHTML = '<option value="">Error al cargar horas</option>';
            });
    }

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
        case 'opcion4':
            doctor_list()
            displayArea.innerHTML = '<h3>Lista de doctores</h3><table id="doctorTable"> <thead><tr ><th><i class="fa-solid fa-id-card"></i> User</th><th><i class="fa-solid fa-user"></i> Nombre</th><th><i class="fa-solid fa-briefcase"></i> Especialidad</th></thead><tbody></tbody></table>';
            break
        case 'opcion5':
            displayArea.innerHTML = `
                <h3 id="create-title">Crear Cita</h3>
                <form action="" id="form-dating-create">
                    <label for="especialidad">Especialidad</label>
                    <select name="especialidad" id="especialidad">
                        <option value="1">Pediatría</option>
                        <option value="3">Medicina General</option>
                    </select>
                    <label for="doctor">Doctor</label>
                    <select name="doctor" id="doctor-canva"></select>
                    <label for="fecha">Fecha</label>
                    <input id="fecha-input" type="date" name="fecha">
                    <label for="hora">Hora</label>
                    <select name="hora" id="hora-select">
                        <option value="">Selecciona una hora</option>
                    </select>
                    <input type="submit" value="Crear" id="create-dating">
                    <div id="loading-spinner"></div>
                    <div id="error-message"></div>
                </form>
            `;
        
            const especialidad = document.getElementById('especialidad');
            const doctorSelect = document.getElementById('doctor-canva');
            const fechaInput = document.getElementById('fecha-input');
            const horaSelect = document.getElementById('hora-select');
            const createDatingButton = document.getElementById('create-dating');
        
            // Cargar doctores cuando se cambia la especialidad
            especialidad.addEventListener('change', () => {
                const selectedSpeciality = especialidad.value;
                loadDoctorsBySpeciality(selectedSpeciality);
            });
        
            // Cargar horarios disponibles cuando se selecciona una fecha
            fechaInput.addEventListener('change', () => {
                const selectedDoctorId = doctorSelect.value;
                const selectedDate = fechaInput.value;
        
                if (selectedDoctorId && selectedDate) {
                    loadAvailableTimes(selectedDoctorId, selectedDate);
                }
            });
        
            // Crear cita al presionar el botón "Crear"
            createDatingButton.addEventListener('click', (e) => {
                e.preventDefault();
                createDating(doctorSelect.value, fechaInput.value, horaSelect.value, especialidad.value);
            });
        
            break;
        default:
            displayArea.innerHTML = 'Selecciona una opción del menú.';
    }
}

function createDating(selectedDoctorId, selectedDate, selectedHour, selectedSpeciality) {


    if (!selectedDoctorId || !selectedDate || !selectedHour || !selectedSpeciality) {
        document.getElementById('error-message').innerText = 'Por favor completa todos los campos.';
        document.getElementById('error-message').style.color = 'red';
        return;
    }

    document.getElementById("loading-spinner").style.display = "inline-block";
    document.getElementById("error-message").style.display = "none";

    fetch('https://citas-express.vercel.app/admin/dating/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        },
        body: JSON.stringify({
            date_: selectedDate,
            doctor: selectedDoctorId,
            time: selectedHour,
            speciality: selectedSpeciality
        })
    })
    .then(response => {
        document.getElementById("loading-spinner").style.display = "none";

        if (response.status === 401) {
            if (window.location.href !== "http://127.0.0.1:5500/index.html") {
                window.location.href = "http://127.0.0.1:5500/index.html";
            }
        } else if (response.ok) {
            document.getElementById("error-message").style.color = "green";
            document.getElementById("error-message").innerText = "Cita creada correctamente.";
            document.getElementById("error-message").style.display = "block";
        } else {
            document.getElementById("error-message").style.color = "red";
            document.getElementById("error-message").innerText = "Error al crear la cita.";
            document.getElementById("error-message").style.display = "block";
        }
    })
    .catch(error => {
        document.getElementById("loading-spinner").style.display = "none";
        document.getElementById("error-message").style.color = "red";
        document.getElementById("error-message").innerText = "Error al crear la cita.";
        document.getElementById("error-message").style.display = "block";
        console.error('Error al crear la cita:', error);
    });
}

function create_date(){
    date_
    doctor
    time
    speciality
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