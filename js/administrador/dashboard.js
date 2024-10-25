function showContent(option) {
    const displayArea = document.getElementById('displayArea');
    user_list()
    

function user_list() {
    fetch('http://localhost:8000/admin/user/list', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("access_token", "") ,  
        }
    })
    .then(response => {
        if (!response.ok) {
            if(window.location.href != "http://127.0.0.1:5500/index.html"){
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


    switch(option) {
        case 'opcion1':
            displayArea.innerHTML = '<h3>Gestion De Usuarios</h3><table id="userTable"> <thead><tr ><th><i class="fa-solid fa-id-card"></i> Cedula</th><th><i class="fa-solid fa-user"></i> Nombre</th><th><i class="fa-solid fa-envelope"></i> Email</th></thead><tbody></tbody></table>';
            break;
        case 'opcion2':
            displayArea.innerHTML = '<h3>Contenido de Opción 2</h3><p>Aquí va la información de la opción 2.</p>';
            break;
        case 'opcion3':
            displayArea.innerHTML = '<h3>Contenido de Opción 3</h3><p>Aquí va la información de la opción 3.</p>';
            break;
        default:
            displayArea.innerHTML = 'Selecciona una opción del menú.';
    }
}