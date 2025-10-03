const bcrypt = require('bcryptjs');

// Script para generar hash de contraseña
const generateHash = async () => {
  const password = 'password123';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Password:', password);
  console.log('Hash:', hash);
};

generateHash();

