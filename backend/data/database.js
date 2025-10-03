const bcrypt = require('bcryptjs');

// Base de datos simulada en memoria
// En producción, usar una base de datos real (MongoDB, PostgreSQL, etc.)

// Usuarios - password hasheada: "password123"
// Para crear un nuevo usuario, usa: const hash = await hashPassword('tuPassword');
const usuarios = [
  {
    id: 1,
    documento: '12345678',
    nombre: 'Usuario Demo',
    password: '$2a$10$hUZlunYsegZjmZmzsYWuru4CqnGCyS7keSqe0a2WRD32GO/5nV3rC' // password123
  }
];

// Productos
let productos = [
  {
    id: 1,
    nombre: 'Laptop Dell XPS 13',
    cantidad: 15,
    precio: 1299.99,
    categoria: 'Electrónica'
  },
  {
    id: 2,
    nombre: 'Mouse Logitech MX Master',
    cantidad: 50,
    precio: 99.99,
    categoria: 'Accesorios'
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico Keychron K2',
    cantidad: 30,
    precio: 89.99,
    categoria: 'Accesorios'
  },
  {
    id: 4,
    nombre: 'Monitor LG 27"',
    cantidad: 20,
    precio: 349.99,
    categoria: 'Electrónica'
  }
];

// Mensajes de contacto
let mensajesContacto = [];

// Función para hashear password (usar al crear nuevos usuarios)
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  usuarios,
  productos,
  mensajesContacto,
  hashPassword
};

