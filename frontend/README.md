# Frontend - Gaby Auth

Aplicación Next.js con Tailwind CSS para el sistema de autenticación y gestión.

## Instalación

```bash
npm install
```

## Variables de Entorno

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Ejecutar

```bash
# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar producción
npm start
```

## Estructura de Páginas

- `/` - Página de login
- `/dashboard` - Dashboard principal (redirige a productos)
- `/dashboard/productos` - Gestión de productos
- `/dashboard/contactar` - Formulario de contacto

## Características

- Autenticación con JWT
- Protección de rutas
- Dashboard responsive
- CRUD de productos
- Formulario de contacto
- Diseño moderno con Tailwind CSS

