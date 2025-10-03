const { query, testConnection } = require('../config/database');
const bcrypt = require('bcryptjs');

const initDatabase = async () => {
  try {
    // Probar conexión
    const connected = await testConnection();
    if (!connected) {
      process.exit(1);
    }

    console.log('🚀 Inicializando base de datos...');

    // Crear tabla de usuarios
    await query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        documento VARCHAR(20) UNIQUE NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de productos
    await query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(200) NOT NULL,
        cantidad INTEGER NOT NULL DEFAULT 0,
        precio DECIMAL(10,2) NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de mensajes de contacto
    await query(`
      CREATE TABLE IF NOT EXISTS mensajes_contacto (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        mensaje TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Tablas creadas correctamente');

    // Insertar usuario demo si no existe
    const existingUser = await query('SELECT id FROM usuarios WHERE documento = $1', ['12345678']);
    
    if (existingUser.rows.length === 0) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await query(
        'INSERT INTO usuarios (documento, nombre, password) VALUES ($1, $2, $3)',
        ['12345678', 'Usuario Demo', hashedPassword]
      );
      console.log('✅ Usuario demo creado');
    } else {
      console.log('ℹ️  Usuario demo ya existe');
    }

    // Insertar productos demo si no existen
    const existingProducts = await query('SELECT COUNT(*) FROM productos');
    
    if (parseInt(existingProducts.rows[0].count) === 0) {
      const productosDemo = [
        ['Laptop Dell XPS 13', 15, 1299.99, 'Electrónica'],
        ['Mouse Logitech MX Master', 50, 99.99, 'Accesorios'],
        ['Teclado Mecánico Keychron K2', 30, 89.99, 'Accesorios'],
        ['Monitor LG 27"', 20, 349.99, 'Electrónica']
      ];

      for (const producto of productosDemo) {
        await query(
          'INSERT INTO productos (nombre, cantidad, precio, categoria) VALUES ($1, $2, $3, $4)',
          producto
        );
      }
      console.log('✅ Productos demo creados');
    } else {
      console.log('ℹ️  Productos demo ya existen');
    }

    console.log('🎉 Base de datos inicializada correctamente!');
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  initDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = initDatabase;

