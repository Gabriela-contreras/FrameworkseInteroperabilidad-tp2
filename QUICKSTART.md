# 🚀 Inicio Rápido - Gaby Auth

## Pasos para ejecutar el proyecto

### 1️⃣ Instalar Backend
```bash
cd backend
npm install
```

### 2️⃣ Configurar Backend
Crear archivo `.env` en la carpeta `backend`:
```env
PORT=5000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
NODE_ENV=development
```

### 3️⃣ Iniciar Backend
```bash
npm run dev
```
✅ Backend corriendo en: http://localhost:5000

---

### 4️⃣ Instalar Frontend (en otra terminal)
```bash
cd frontend
npm install
```

### 5️⃣ Configurar Frontend
Crear archivo `.env.local` en la carpeta `frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 6️⃣ Iniciar Frontend
```bash
npm run dev
```
✅ Frontend corriendo en: http://localhost:3000

---

## 🎉 ¡Listo!

Abre tu navegador en: http://localhost:3000

### Credenciales de prueba:
```
Documento: 12345678
Contraseña: password123
```

---

## 📝 Notas

- Asegúrate de tener Node.js 16+ instalado
- Los dos servicios deben estar corriendo simultáneamente
- La base de datos es en memoria, los datos se reinician al cerrar el servidor

