const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usuarios } = require('../data/database');

// POST /auth/login - Login con documento y contraseña
router.post('/login', async (req, res) => {
  try {
    const { documento, password } = req.body;

    // Validar campos
    if (!documento || !password) {
      return res.status(400).json({ error: 'Documento y contraseña son requeridos' });
    }

    // Buscar usuario por documento
    const usuario = usuarios.find(u => u.documento === documento);
    
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        documento: usuario.documento,
        nombre: usuario.nombre 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: usuario.id,
        documento: usuario.documento,
        nombre: usuario.nombre
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// GET /auth/verify - Verificar token
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: verified });
  } catch (error) {
    res.status(403).json({ valid: false });
  }
});

module.exports = router;

