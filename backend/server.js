require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const contactarRoutes = require('./routes/contactar');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/contactar', contactarRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'API de Gaby Auth funcionando correctamente' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

