const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { mensajesContacto } = require('../data/database');

// POST /contactar - Enviar mensaje de contacto
router.post('/', authenticateToken, (req, res) => {
  try {
    const { nombreEmpresa, documento, email, mensaje } = req.body;

    // Validar campos
    if (!nombreEmpresa || !documento || !email || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const nuevoMensaje = {
      id: mensajesContacto.length + 1,
      nombreEmpresa,
      documento,
      email,
      mensaje,
      fecha: new Date().toISOString(),
      usuarioId: req.user.id
    };

    mensajesContacto.push(nuevoMensaje);

    res.status(201).json({
      message: 'Mensaje enviado exitosamente',
      contacto: nuevoMensaje
    });
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// GET /contactar - Obtener todos los mensajes (opcional, para admin)
router.get('/', authenticateToken, (req, res) => {
  res.json(mensajesContacto);
});

module.exports = router;

