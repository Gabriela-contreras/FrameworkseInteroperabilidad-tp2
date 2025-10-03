# Configuración del Sistema de Autenticación

## Backend - Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Configuración de la base de datos PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=frameworkstp2
DB_PASSWORD=postgres
DB_PORT=5432

# Configuración del servidor
PORT=5001
NODE_ENV=development

# JWT Secret (cambiar en producción)
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui

# URL del frontend
FRONTEND_URL=http://localhost:3000
```

## Frontend - Variables de Entorno

Crea un archivo `.env.local` en la carpeta `frontend/` con la siguiente variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## Instalación de Dependencias

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Estructura de la Base de Datos

La tabla `usuarios` debe tener la siguiente estructura:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR NOT NULL,
    documento VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Características Implementadas

### Backend
- ✅ Endpoint de registro (`POST /auth/register`)
- ✅ Endpoint de login (`POST /auth/login`)
- ✅ Endpoint de logout (`POST /auth/logout`)
- ✅ Endpoint de verificación (`GET /auth/verify`)
- ✅ Middleware de autenticación con cookies HttpOnly
- ✅ Validación de datos de entrada
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Protección de rutas con JWT

### Frontend
- ✅ Página de registro (`/register`)
- ✅ Página de login (`/`)
- ✅ Hook `useAuth` para manejo de estado
- ✅ Componente `ProtectedRoute` para rutas protegidas
- ✅ Integración con cookies HttpOnly
- ✅ Redirección automática según estado de autenticación

## Uso

1. **Registro**: Los usuarios pueden registrarse en `/register`
2. **Login**: Los usuarios pueden iniciar sesión en `/`
3. **Dashboard**: Acceso protegido en `/dashboard`
4. **Logout**: Botón de cerrar sesión en el dashboard

## Seguridad

- Las contraseñas se encriptan con bcrypt
- Los tokens JWT se almacenan en cookies HttpOnly
- Validación de datos en frontend y backend
- Protección CSRF con SameSite cookies
- Verificación de tokens en cada petición
