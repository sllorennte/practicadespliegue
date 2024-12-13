const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname));
app.use(express.json());

let usuarios=[
    { id: 1, nombre: 'Sergio Llorente', edad: 23 },
    { id: 2, nombre: 'Alberto Lopez', edad: 25 }
];
//Endpoint para obtener todos los usuarios
app.get('/api/usuarios', (req, res)=>{
    res.json(usuarios);
});
//Endpoint para buscar un usuario por ID o nombre
app.get('/api/usuarios/:query', (req, res)=>{
    const query=req.params.query.toLowerCase();
    const resultado=usuarios.filter(
        usuario=>
            usuario.nombre.toLowerCase().includes(query) || usuario.id.toString()===query
    );
    if (resultado.length > 0){
        res.json(resultado);
    } else{
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
});

//Endpoint para crear un nuevo usuario
app.post('/api/usuarios', (req, res)=>{
    const { nombre, edad }=req.body;
    if (!nombre || !edad){
        return res.status(400).json({ error: 'El nombre y la edad son obligatorios' });
    }
    const nuevoUsuario={ id: usuarios.length + 1, nombre, edad: parseInt(edad)};
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

const PUERTO=3000;
app.listen(PUERTO, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});