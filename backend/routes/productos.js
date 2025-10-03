const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } = require('../data/database');

// GET /productos - Obtener todos los productos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const productos = await getProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET /productos/:id - Obtener un producto por ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const producto = await getProductoById(parseInt(req.params.id));
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// POST /productos - Crear nuevo producto
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { nombre, cantidad, precio, categoria } = req.body;

    // Validar campos
    if (!nombre || !cantidad || !precio || !categoria) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const nuevoProducto = await createProducto({
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      categoria
    });
    
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
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { nombre, cantidad, precio, categoria } = req.body;

    // Validar campos
    if (!nombre || !cantidad || !precio || !categoria) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const productoActualizado = await updateProducto(parseInt(req.params.id), {
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
      categoria
    });

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      message: 'Producto actualizado exitosamente',
      producto: productoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE /productos/:id - Eliminar producto
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productoEliminado = await deleteProducto(parseInt(req.params.id));

    if (!productoEliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

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

