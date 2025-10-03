# ✅ Checklist de Verificación

Usa este checklist para asegurarte de que todo está configurado correctamente.

## 📋 Instalación Inicial

### Backend
- [ ] Navegaste a la carpeta `backend`
- [ ] Ejecutaste `npm install`
- [ ] Creaste el archivo `.env` con las variables necesarias
- [ ] El servidor inicia correctamente con `npm run dev`
- [ ] Puedes acceder a http://localhost:5000
- [ ] El health check responde: `{"message": "API de Gaby Auth funcionando correctamente"}`

### Frontend
- [ ] Navegaste a la carpeta `frontend`
- [ ] Ejecutaste `npm install`
- [ ] Creaste el archivo `.env.local` con `NEXT_PUBLIC_API_URL`
- [ ] El servidor inicia correctamente con `npm run dev`
- [ ] Puedes acceder a http://localhost:3000
- [ ] La página de login se muestra correctamente

## 🔐 Autenticación

- [ ] Puedes hacer login con las credenciales de prueba
  - Documento: `12345678`
  - Contraseña: `password123`
- [ ] Después del login, rediriges al dashboard
- [ ] El nombre del usuario se muestra en el navbar
- [ ] Puedes cerrar sesión correctamente
- [ ] Si intentas acceder al dashboard sin login, te redirige a login

## 📦 Productos

- [ ] Puedes ver la lista de productos
- [ ] Puedes agregar un nuevo producto
- [ ] El modal de creación se abre correctamente
- [ ] Puedes editar un producto existente
- [ ] El modal de edición carga los datos correctos
- [ ] Puedes eliminar un producto
- [ ] La confirmación de eliminación funciona
- [ ] Los cambios se reflejan en la tabla

## 📧 Contacto

- [ ] Puedes acceder al formulario de contacto
- [ ] Todos los campos se validan correctamente
- [ ] Puedes enviar un mensaje
- [ ] Aparece el mensaje de éxito
- [ ] El formulario se limpia después de enviar

## 🎨 UI/UX

- [ ] El sidebar se puede colapsar/expandir
- [ ] La navegación entre secciones funciona
- [ ] Los estilos de Tailwind se cargan correctamente
- [ ] El diseño es responsive (prueba en móvil)
- [ ] Los botones tienen hover effects
- [ ] Los formularios muestran errores de validación
- [ ] Los estados de carga (loading) funcionan

## 🔧 Configuración

### Backend
- [ ] Puerto configurado (por defecto 5000)
- [ ] JWT_SECRET definido
- [ ] CORS funcionando
- [ ] Logs aparecen en consola

### Frontend
- [ ] API_URL apunta al backend correcto
- [ ] Rutas de Next.js funcionando
- [ ] Imports con `@/` funcionan

## 🐛 Debugging

Si algo no funciona, verifica:

### Backend no inicia
```bash
# Verifica que Node.js esté instalado
node --version

# Verifica que las dependencias estén instaladas
cd backend
ls node_modules/

# Verifica el archivo .env
cat .env

# Verifica puertos en uso
lsof -i :5000
```

### Frontend no inicia
```bash
# Verifica que Node.js esté instalado
node --version

# Verifica que las dependencias estén instaladas
cd frontend
ls node_modules/

# Verifica el archivo .env.local
cat .env.local

# Limpia cache de Next.js
rm -rf .next
npm run dev
```

### Error de CORS
- Verifica que el backend tenga `cors()` configurado
- Verifica que la URL en `NEXT_PUBLIC_API_URL` sea correcta

### Error 401 - Unauthorized
- Verifica que el token se esté guardando en localStorage
- Verifica que el token se esté enviando en las peticiones
- Haz login nuevamente

### Error 500 - Internal Server Error
- Revisa los logs del backend en la consola
- Verifica que la base de datos esté funcionando

## 📊 Testing Manual

### Flujo Completo
1. [ ] Abrir http://localhost:3000
2. [ ] Hacer login con credenciales de prueba
3. [ ] Verificar que rediriges a productos
4. [ ] Crear un nuevo producto
5. [ ] Editar el producto creado
6. [ ] Ir a la sección de contacto
7. [ ] Enviar un mensaje
8. [ ] Volver a productos
9. [ ] Eliminar el producto creado
10. [ ] Cerrar sesión
11. [ ] Intentar acceder a /dashboard (debe redirigir a login)

## 🚀 Deploy (Opcional)

Si vas a desplegar en producción:

### Backend
- [ ] Cambiar `JWT_SECRET` por uno seguro
- [ ] Configurar base de datos real
- [ ] Configurar variables de entorno en el hosting
- [ ] Habilitar HTTPS
- [ ] Configurar CORS para el dominio del frontend

### Frontend
- [ ] Actualizar `NEXT_PUBLIC_API_URL` al dominio del backend
- [ ] Ejecutar `npm run build` sin errores
- [ ] Probar en modo producción con `npm start`
- [ ] Configurar dominio personalizado

## ✅ Todo Correcto

Si marcaste todos los checks principales, ¡tu proyecto está listo!

**Credenciales de prueba:**
- Documento: `12345678`
- Contraseña: `password123`

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: Ver API_TESTING.md

---

¿Encontraste algún problema? Revisa:
- README.md - Documentación principal
- QUICKSTART.md - Guía rápida
- API_TESTING.md - Testing de endpoints
- PROJECT_STRUCTURE.md - Estructura del proyecto

