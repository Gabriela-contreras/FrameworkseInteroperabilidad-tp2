const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

const getUsuarios = async () => {
  const result = await query('SELECT * FROM usuarios ORDER BY id');
  return result.rows;
};

const getUsuarioByDocumento = async (documento) => {
  const result = await query('SELECT * FROM usuarios WHERE documento = $1', [documento]);
  return result.rows[0];
};

const getUsuarioByEmail = async (email) => {
  const result = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};

const checkDocumentoExists = async (documento) => {
  const result = await query('SELECT id FROM usuarios WHERE documento = $1', [documento]);
  return result.rows.length > 0;
};

const checkEmailExists = async (email) => {
  const result = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
  return result.rows.length > 0;
};

const createUsuario = async (usuario) => {
  const { documento, nombre, email, password } = usuario;
  const hashedPassword = await hashPassword(password);
  const result = await query(
    'INSERT INTO usuarios (documento, nombre, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [documento, nombre, email, hashedPassword]
  );
  return result.rows[0];
};

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

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  getUsuarios,
  getUsuarioByDocumento,
  getUsuarioByEmail,
  checkDocumentoExists,
  checkEmailExists,
  createUsuario,
  
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  
  getMensajesContacto,
  createMensajeContacto,
  
  hashPassword
};

