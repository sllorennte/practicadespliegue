// Función para mostrar los usuarios en la interfaz
function mostrarUsuarios(usuarios) {
    const listaUsuarios = document.getElementById('lista-usuarios');
    listaUsuarios.innerHTML = '';
    usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.className = 'usuario';
        div.innerHTML = `
            <h3>${usuario.nombre}</h3>
            <p>Edad: ${usuario.edad}</p>
            <p>ID: ${usuario.id}</p>
        `;
        listaUsuarios.appendChild(div);
    });
}

// Obtener todos los usuarios al cargar la página
function obtenerTodosLosUsuarios() {
    fetch('http://10.0.2.15/api/usuarios') // Reemplazamos con la URL completa
        .then(response => response.json())
        .then(usuarios => mostrarUsuarios(usuarios))
        .catch(error => console.error('Error al obtener usuarios:', error));
}

// Buscar un usuario por ID o nombre
document.getElementById('boton-buscar').addEventListener('click', () => {
    const query = document.getElementById('buscarInput').value.trim();
    if (!query) {
        alert('Por favor, ingresa un nombre o ID para buscar.');
        return;
    }
    fetch(`http://10.0.2.15/api/usuarios/${query}`) // Reemplazamos con la URL completa
        .then(response => {
            if (!response.ok) throw new Error('Usuario no encontrado');
            return response.json();
        })
        .then(usuarios => mostrarUsuarios(usuarios))
        .catch(error => alert(error.message));
});

// Crear un nuevo usuario
document.getElementById('formulario-crear').addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombreInput').value.trim();
    const edad = document.getElementById('edadInput').value.trim();

    if (!nombre || !edad) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch('http://10.0.2.15/api/usuarios', { // Reemplazamos con la URL completa
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad })
    })
        .then(response => {
            if (!response.ok) throw new Error('Error al crear usuario');
            return response.json();
        })
        .then(() => {
            alert('Usuario agregado exitosamente.');
            obtenerTodosLosUsuarios();
        })
        .catch(error => alert(error.message));
});

// Cargar todos los usuarios al inicio
obtenerTodosLosUsuarios();
