const fecha = document.getElementById('fecha');
const area = document.getElementById('area');
const medico = document.getElementById('medico');
const hora = document.getElementById('hora');
const agendar = document.getElementById('agendar')

agendar.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('http://localhost:8000/users/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("access_token")}` // Incluye el token en el header
            }
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const data = await response.json();
        const user = data.user; // Guarda el campo user en una variable
        console.log('Usuario:', user); // Imprime el usuario en la consola


        
    const cita = {
        date_: fecha.value, // Cambia estos valores según sea necesario
        doctor: medico.value,    // ID o nombre del doctor
        time: hora.value,      // Hora de la cita
        speciality: area.value, // Especialidad del doctor
        patient:  user   // ID o nombre del paciente
    };

    try {
        const response = await fetch('http://localhost:8000/admin/assigned_dating', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cita) // Convertir el objeto a JSON
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Cita agendada:', data);
        return data; // Retorna la respuesta del servidor

    } catch (error) {
        console.error('Error:', error);
        return null; // Retorna null en caso de error
    }
        

    } catch (error) {
        console.error('Error:', error);
        
    }
    
})

area.addEventListener("change", async (e) => {
    // Limpiar las opciones de 'medico'
    medico.innerHTML = '';

    // Llamar a la función doctores y esperar su resultado
    const doctoresList = await doctores();
    console.log(doctoresList);

    if (doctoresList.length > 0) {
        doctoresList.forEach(element => {
            medico.innerHTML += `<option value="${element.user}">${element.name}</option>`;
        });
    } else {
        medico.innerHTML += '<option>No hay doctores disponibles</option>';
    }
        
});

medico.addEventListener("change", async (e) => {
    // Limpiar las opciones de 'hora' cuando se selecciona un médico
    hora.innerHTML = '';
    // Solo llamamos a horarios si hay un médico seleccionado
    if (medico.value) {
        const horas = await obtenerHorarios();
        if (horas.length > 0) {
            horas.forEach(element => {
                hora.innerHTML += `<option value="${element}">${element}</option>`;
            });
        } else {
            hora.innerHTML += '<option>No hay horarios disponibles</option>';
        }
    }
});

fecha.addEventListener('change', async (e) => {
    // Limpiar las opciones de 'hora' cuando se selecciona una fecha
    hora.innerHTML = '';
    // Solo llamamos a horarios si hay un médico seleccionado
    if (medico.value) {
        const horas = await obtenerHorarios();
        if (horas.length > 0) {
            horas.forEach(element => {
                hora.innerHTML += `<option value="${element["time"]}">${element["time"]}</option>`;
            });
        } else {
            hora.innerHTML += '<option>No hay horarios disponibles</option>';
        }
    }
});

async function doctores() {
    try {
        const response = await fetch('http://localhost:8000/admin/doctor/speciality', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'doctors_speciality': area.value
            })
        });
        console.log(area.value);

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const data = await response.json();
        return data;  // Retorna la lista de doctores

    } catch (error) {
        console.error('Error:', error);
        return [];  // Retorna una lista vacía en caso de error
    }
}

async function obtenerHorarios() {
    try {
        const response = await fetch(`http://localhost:8000/admin/dating/list-filter?date_=${fecha.value}&speciality=${area.value}&doctor_=${medico.value}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const data = await response.json();
        
        // Filtra los horarios que son 'false'
        const horariosNoDisponibles = data;

        return horariosNoDisponibles;  // Retorna solo los horarios no disponibles

    } catch (error) {
        console.error('Error:', error);
        return [];  // Retorna una lista vacía en caso de error
    }
}