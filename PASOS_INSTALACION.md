# 🚀 Pasos para Levantar el Proyecto

Sigue estos pasos en orden para ejecutar el proyecto Gaby Auth.

---

## ⚡ Opción Rápida (Recomendada)

### Paso 1: Ejecutar el script de instalación
```bash
cd "/Users/gustavomercado/Desktop/gaby/pr f/gaby-auth"
./setup.sh
```

Este script instalará automáticamente todas las dependencias del backend y frontend, y creará los archivos de configuración necesarios.

### Paso 2: Abrir dos terminales

**Terminal 1 - Iniciar Backend:**
```bash
cd backend
npm run dev
```
✅ Verás: "Servidor corriendo en puerto 5000"

**Terminal 2 - Iniciar Frontend:**
```bash
cd frontend
npm run dev
```
✅ Verás: "Ready - started server on 0.0.0.0:3000"

### Paso 3: Abrir en el navegador
```
http://localhost:3000
```

### Paso 4: Iniciar sesión
```
Documento: 12345678
Contraseña: password123
```

---

## 📝 Opción Manual (Paso a Paso)

### BACKEND

#### 1. Ir a la carpeta backend
```bash
cd "/Users/gustavomercado/Desktop/gaby/pr f/gaby-auth/backend"
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Crear archivo de configuración
Crear archivo `.env` con este contenido:
```env
PORT=5000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
NODE_ENV=development
```

Comando rápido:
```bash
cat > .env << 'EOF'
PORT=5000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
NODE_ENV=development
EOF
```

#### 4. Iniciar el servidor backend
```bash
npm run dev
```
✅ Debe mostrar: "Servidor corriendo en puerto 5000"

---

### FRONTEND

#### 5. Abrir NUEVA terminal y ir a la carpeta frontend
```bash
cd "/Users/gustavomercado/Desktop/gaby/pr f/gaby-auth/frontend"
```

#### 6. Instalar dependencias
```bash
npm install
```

#### 7. Crear archivo de configuración
Crear archivo `.env.local` con este contenido:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Comando rápido:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
```

#### 8. Iniciar el servidor frontend
```bash
npm run dev
```
✅ Debe mostrar: "Ready - started server on 0.0.0.0:3000"

---

### USAR LA APLICACIÓN

#### 9. Abrir en el navegador
```
http://localhost:3000
```

#### 10. Iniciar sesión con las credenciales de prueba
```
Documento: 12345678
Contraseña: password123
```

#### 11. ¡Listo! 🎉
Ahora puedes:
- Ver y gestionar productos
- Crear, editar y eliminar productos
- Enviar mensajes de contacto

---

## 🔍 Verificación Rápida

### ¿Está funcionando el backend?
```bash
curl http://localhost:5000
```
Debe responder: `{"message":"API de Gaby Auth funcionando correctamente"}`

### ¿Está funcionando el frontend?
Abre: http://localhost:3000
Debes ver la página de login

---

## ❌ Solución de Problemas

### Error: "Puerto 5000 ya en uso"
```bash
# Ver qué está usando el puerto
lsof -i :5000

# Matar el proceso (reemplaza PID con el número que aparece)
kill -9 PID
```

### Error: "Puerto 3000 ya en uso"
```bash
# Ver qué está usando el puerto
lsof -i :3000

# Matar el proceso
kill -9 PID
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias del backend
cd backend
rm -rf node_modules
npm install

# Reinstalar dependencias del frontend
cd ../frontend
rm -rf node_modules
npm install
```

### Error: "fetch failed" o problemas de conexión
- Verifica que el backend esté corriendo en el puerto 5000
- Verifica que el archivo `.env.local` tenga la URL correcta: `http://localhost:5000`

---

## 📦 Resumen de Comandos

```bash
# 1. Instalar todo automáticamente
./setup.sh

# 2. Terminal 1 - Backend
cd backend && npm run dev

# 3. Terminal 2 - Frontend
cd frontend && npm run dev

# 4. Abrir navegador
# → http://localhost:3000
# → Login: 12345678 / password123
```

---

## 🎯 Checklist Rápido

- [ ] Backend instalado (`cd backend && npm install`)
- [ ] Archivo `.env` creado en backend
- [ ] Backend corriendo (`npm run dev` en backend)
- [ ] Servidor en puerto 5000 funcionando
- [ ] Frontend instalado (`cd frontend && npm install`)
- [ ] Archivo `.env.local` creado en frontend
- [ ] Frontend corriendo (`npm run dev` en frontend)
- [ ] Servidor en puerto 3000 funcionando
- [ ] Login funciona con credenciales de prueba
- [ ] Dashboard carga correctamente

---

## 📞 Ayuda Adicional

- **Documentación completa:** Ver `README.md`
- **Testing de API:** Ver `API_TESTING.md`
- **Estructura del proyecto:** Ver `PROJECT_STRUCTURE.md`
- **Verificación completa:** Ver `CHECKLIST.md`

---

## ⏱️ Tiempo Estimado

- Instalación automática: **~3-5 minutos**
- Instalación manual: **~5-8 minutos**
- Primera ejecución: **inmediato**

---

¡Disfruta usando Gaby Auth! 🎉

