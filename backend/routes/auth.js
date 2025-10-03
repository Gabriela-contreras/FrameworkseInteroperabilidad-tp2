const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsuarioByDocumento, checkDocumentoExists, checkEmailExists, createUsuario } = require('../data/database');

router.post('/register', async (req, res) => {
  try {
    const { nombre, documento, email, password } = req.body;

    if (!nombre || !documento || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const documentoExists = await checkDocumentoExists(documento);
    if (documentoExists) {
      return res.status(400).json({ error: 'Ya existe un usuario con este documento' });
    }

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ error: 'Ya existe un usuario con este email' });
    }

    const nuevoUsuario = await createUsuario({
      nombre,
      documento,
      email,
      password
    });

    const token = jwt.sign(
      { 
        id: nuevoUsuario.id, 
        documento: nuevoUsuario.documento,
        nombre: nuevoUsuario.nombre 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: nuevoUsuario.id,
        documento: nuevoUsuario.documento,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { documento, password } = req.body;

    if (!documento || !password) {
      return res.status(400).json({ error: 'Documento y contraseña son requeridos' });
    }

    const usuario = await getUsuarioByDocumento(documento);
    
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { 
        id: usuario.id, 
        documento: usuario.documento,
        nombre: usuario.nombre 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Login exitoso',
      user: {
        id: usuario.id,
        documento: usuario.documento,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Sesión cerrada exitosamente' });
});

router.get('/verify', (req, res) => {
  const token = req.cookies.token;

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

