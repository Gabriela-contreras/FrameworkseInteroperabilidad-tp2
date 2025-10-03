const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

// Funciones para interactuar con PostgreSQL

// Usuarios
const getUsuarios = async () => {
  const result = await query('SELECT * FROM usuarios ORDER BY id');
  return result.rows;
};

const getUsuarioByDocumento = async (documento) => {
  const result = await query('SELECT * FROM usuarios WHERE documento = $1', [documento]);
  return result.rows[0];
};

const createUsuario = async (usuario) => {
  const { documento, nombre, password } = usuario;
  const hashedPassword = await hashPassword(password);
  const result = await query(
    'INSERT INTO usuarios (documento, nombre, password) VALUES ($1, $2, $3) RETURNING *',
    [documento, nombre, hashedPassword]
  );
  return result.rows[0];
};

// Productos
const getProductos = async () => {
  const result = await query('SELECT * FROM productos ORDER BY id');
  return result.rows;
};

const getProductoById = async (id) => {
  const result = await query('SELECT * FROM productos WHERE id = $1', [id]);
  return result.rows[0];
};

const createProducto = async (producto) => {
  const { nombre, cantidad, precio, categoria } = producto;
  const result = await query(
    'INSERT INTO productos (nombre, cantidad, precio, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, cantidad, precio, categoria]
  );
  return result.rows[0];
};

const updateProducto = async (id, producto) => {
  const { nombre, cantidad, precio, categoria } = producto;
  const result = await query(
    'UPDATE productos SET nombre = $1, cantidad = $2, precio = $3, categoria = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
    [nombre, cantidad, precio, categoria, id]
  );
  return result.rows[0];
};

const deleteProducto = async (id) => {
  const result = await query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

// Mensajes de contacto
const getMensajesContacto = async () => {
  const result = await query('SELECT * FROM mensajes_contacto ORDER BY created_at DESC');
  return result.rows;
};

const createMensajeContacto = async (mensaje) => {
  const { nombre, email, telefono, mensaje: texto } = mensaje;
  const result = await query(
    'INSERT INTO mensajes_contacto (nombre, email, telefono, mensaje) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, email, telefono, texto]
  );
  return result.rows[0];
};

// Función para hashear password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  // Usuarios
  getUsuarios,
  getUsuarioByDocumento,
  createUsuario,
  
  // Productos
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  
  // Mensajes de contacto
  getMensajesContacto,
  createMensajeContacto,
  
  // Utilidades
  hashPassword
};

