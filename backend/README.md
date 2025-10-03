# Backend - Gaby Auth

API REST construida con Express.js para autenticación y gestión de productos.

## Instalación

```bash
npm install
```

## Variables de Entorno

Crear archivo `.env`:
```env
PORT=5000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
NODE_ENV=development
```

## Ejecutar

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## Endpoints

### Autenticación
- `POST /auth/login` - Login con documento y contraseña
- `GET /auth/verify` - Verificar token

### Productos (requiere token)
- `GET /productos` - Listar productos
- `POST /productos` - Crear producto
- `PUT /productos/:id` - Actualizar producto
- `DELETE /productos/:id` - Eliminar producto

### Contacto (requiere token)
- `POST /contactar` - Enviar mensaje
- `GET /contactar` - Listar mensajes

## Usuario de Prueba

```
Documento: 12345678
Contraseña: password123
```

