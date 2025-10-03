const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { productos } = require('../data/database');

// GET /productos - Obtener todos los productos
router.get('/', authenticateToken, (req, res) => {
  res.json(productos);
});

// GET /productos/:id - Obtener un producto por ID
router.get('/:id', authenticateToken, (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  res.json(producto);
});

// POST /productos - Crear nuevo producto
router.post('/', authenticateToken, (req, res) => {
  try {
    const { nombre, cantidad, precio, categoria } = req.body;

    // Validar campos
    if (!nombre || !cantidad || !precio || !categoria) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Generar nuevo ID
    const nuevoId = productos.length > 0 
      ? Math.max(...productos.map(p => p.id)) + 1 
      : 1;

    const nuevoProducto = {
      id: nuevoId,
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      categoria
    };

    productos.push(nuevoProducto);
    
    res.status(201).json({
      message: 'Producto creado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT /productos/:id - Actualizar producto
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productoIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { nombre, cantidad, precio, categoria } = req.body;

    // Validar campos
    if (!nombre || !cantidad || !precio || !categoria) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    productos[productoIndex] = {
      ...productos[productoIndex],
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      categoria
    };

    res.json({
      message: 'Producto actualizado exitosamente',
      producto: productos[productoIndex]
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE /productos/:id - Eliminar producto
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productoIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const productoEliminado = productos.splice(productoIndex, 1)[0];

    res.json({
      message: 'Producto eliminado exitosamente',
      producto: productoEliminado
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;

