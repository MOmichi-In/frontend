function showContent(option) {
    const displayArea = document.getElementById('displayArea');
    





    function user_list() {
        fetch('http://localhost:8000/admin/user/list', {
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
        fetch('http://localhost:8000/admin/dating/list', {
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
            displayArea.innerHTML = '<h3>Contenido de Opción 3</h3><p>Aquí va la información de la opción 3.</p>';
            break;
        default:
            displayArea.innerHTML = 'Selecciona una opción del menú.';
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