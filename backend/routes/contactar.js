const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getMensajesContacto, createMensajeContacto } = require('../data/database');

// POST /contactar - Enviar mensaje de contacto
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body;

    // Validar campos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos' });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const nuevoMensaje = await createMensajeContacto({
      nombre,
      email,
      telefono: telefono || null,
      mensaje
    });

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
router.get('/', authenticateToken, async (req, res) => {
  try {
    const mensajes = await getMensajesContacto();
    res.json(mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

module.exports = router;

