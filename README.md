# Gaby Auth - Sistema de Autenticación y Gestión

Sistema completo de autenticación con dashboard para gestión de productos y contacto.

## 🚀 Tecnologías

### Backend
- **Express.js** - Framework de Node.js
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Middleware para peticiones cross-origin

### Frontend
- **Next.js 14** - Framework de React
- **Tailwind CSS** - Framework de estilos
- **Axios** - Cliente HTTP (opcional)

## 📋 Características

- ✅ Autenticación con documento y contraseña
- ✅ Protección de rutas con JWT
- ✅ Dashboard responsive y moderno
- ✅ CRUD completo de productos
- ✅ Formulario de contacto
- ✅ Diseño corporativo con Tailwind CSS

## 🛠️ Instalación

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd gaby-auth
```

### 2. Instalar Backend
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la carpeta `backend`:
```env
PORT=5000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
NODE_ENV=development
```

### 4. Instalar Frontend
```bash
cd ../frontend
npm install
```

### 5. Configurar variables de entorno del Frontend
Crea un archivo `.env.local` en la carpeta `frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚦 Ejecutar el Proyecto

### Iniciar Backend
```bash
cd backend
npm run dev
```
El servidor estará corriendo en `http://localhost:5000`

### Iniciar Frontend
En otra terminal:
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`

## 👤 Credenciales de Prueba

```
Documento: 12345678
Contraseña: password123
```

## 📚 Estructura del Proyecto

```
gaby-auth/
├── backend/
│   ├── data/
│   │   └── database.js          # Base de datos en memoria
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticación
│   ├── routes/
│   │   ├── auth.js              # Rutas de autenticación
│   │   ├── productos.js         # CRUD de productos
│   │   └── contactar.js         # Endpoint de contacto
│   ├── scripts/
│   │   └── generateHash.js      # Script para generar hashes
│   ├── .env                     # Variables de entorno
│   ├── package.json
│   └── server.js                # Servidor principal
│
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   │   ├── productos/
    │   │   │   └── page.js      # Página de productos
    │   │   ├── contactar/
    │   │   │   └── page.js      # Página de contacto
    │   │   ├── layout.js        # Layout del dashboard
    │   │   └── page.js          # Redirección
    │   ├── layout.js            # Layout principal
    │   ├── page.js              # Página de login
    │   └── globals.css          # Estilos globales
    ├── components/
    │   ├── DashboardLayout.js   # Layout del dashboard
    │   └── ProtectedRoute.js    # Componente de protección
    ├── lib/
    │   ├── auth.js              # Utilidades de autenticación
    │   └── api.js               # Utilidades de API
    ├── .env.local               # Variables de entorno
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🔐 API Endpoints

### Autenticación
- `POST /auth/login` - Login con documento y contraseña
- `GET /auth/verify` - Verificar token

### Productos (requiere autenticación)
- `GET /productos` - Obtener todos los productos
- `GET /productos/:id` - Obtener un producto
- `POST /productos` - Crear producto
- `PUT /productos/:id` - Actualizar producto
- `DELETE /productos/:id` - Eliminar producto

### Contacto (requiere autenticación)
- `POST /contactar` - Enviar mensaje de contacto
- `GET /contactar` - Obtener mensajes (admin)

## 🎨 Características del Frontend

### Página de Login
- Formulario con validación
- Mensajes de error amigables
- Diseño responsive y moderno
- Redirección automática al dashboard

### Dashboard
- Sidebar colapsable
- Navegación intuitiva
- Información del usuario
- Botón de cerrar sesión

### Gestión de Productos
- Tabla con todos los productos
- Modal para crear/editar productos
- Confirmación para eliminar
- Diseño responsive

### Formulario de Contacto
- Validación de campos
- Mensajes de éxito/error
- Información de contacto adicional

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación con JWT
- Tokens con expiración (24 horas)
- Validación de tokens en cada petición protegida
- CORS configurado

## 📝 Notas Importantes

1. **Base de datos en memoria**: Los datos se almacenan en memoria y se pierden al reiniciar el servidor. En producción, implementar una base de datos real (MongoDB, PostgreSQL, etc.).

2. **Secreto JWT**: Cambiar `JWT_SECRET` en producción por una clave segura.

3. **CORS**: Configurar correctamente las URLs permitidas en producción.

4. **Validaciones**: Implementar validaciones más robustas en producción.

## 🚀 Despliegue en Producción

### Backend
- Usar variables de entorno seguras
- Implementar base de datos real
- Configurar HTTPS
- Implementar rate limiting
- Añadir logs y monitoreo

### Frontend
- Configurar variables de entorno de producción
- Optimizar build con `npm run build`
- Usar servicios como Vercel o Netlify
- Configurar dominio personalizado

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📧 Contacto

Para preguntas o soporte, contacta a: info@gabyauth.com

