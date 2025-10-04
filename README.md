

# 📦 Control de Inventario

Sistema completo de **autenticación y gestión** con **dashboard para control de inventario y contacto**, desarrollado con tecnologías modernas en **Node.js**, **Express** y **Next.js**.

---

## 🚀 Tecnologías Utilizadas

### 🖥️ Backend

* **Express.js** – Framework minimalista para Node.js
* **JWT (JSON Web Tokens)** – Autenticación segura basada en tokens
* **Nodemailer** – Envío de correos desde el formulario de contacto

### 💻 Frontend

* **Next.js 14** – Framework moderno basado en React
* **Tailwind CSS** – Framework de estilos para diseño rápido y responsive

---

## 📋 Características Principales

* ✅ **Autenticación** con documento y contraseña
* ✅ **Protección de rutas** mediante JWT
* ✅ **Dashboard moderno y responsive**
* ✅ **CRUD completo** de productos (control de inventario)
* ✅ **Formulario de contacto funcional** con **Nodemailer**
* ✅ **Diseño profesional y personalizable** con Tailwind CSS

---

## 🛠️ Instalación y Configuración

### 🔧 Requisitos Previos

* Node.js (versión 16 o superior)
* npm o yarn

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Gabriela-contreras/FrameworkseInteroperabilidad-tp2.git
```

### 2️⃣ Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3️⃣ Configurar variables de entorno (Backend)

Crea un archivo `.env` en la carpeta `backend`:

```env
PORT=5001
JWT_SECRET=tu_clave_secreta_muy_segura
NODE_ENV=development

# Configuración de correo (Nodemailer)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=tu_correo@gmail.com
MAIL_PASS=tu_contraseña_o_token
```

> ⚠️ En producción, usa **tokens de aplicación** o servicios como **SendGrid** o **Mailgun**.

### 4️⃣ Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

### 5️⃣ Configurar variables de entorno (Frontend)

Crea un archivo `.env.local` en la carpeta `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

---

## 🚦 Ejecución del Proyecto

### ▶️ Iniciar Backend

```bash
cd backend
npm run dev
```

El servidor correrá en `http://localhost:5001`

### ▶️ Iniciar Frontend

En otra terminal:

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 👤 Credenciales de Prueba

```
Documento: 12345678
Contraseña: password123
```

---

## 🧱 Estructura del Proyecto

```
├── backend/
│   ├── data/
│   │   └── database.js          # Base de datos en memoria
│   ├── middleware/
│   │   └── auth.js              # Middleware de autenticación
│   ├── routes/
│   │   ├── auth.js              # Rutas de autenticación
│   │   ├── productos.js         # CRUD de productos (inventario)
│   │   └── contactar.js         # Endpoint de contacto (usa Nodemailer)
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
    │   └── ProtectedRoute.js    # Protección de rutas
    ├── lib/
    │   ├── auth.js              # Utilidades de autenticación
    │   └── api.js               # Llamadas a la API
    ├── .env.local               # Variables de entorno
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## 🔐 API Endpoints

### 🔑 Autenticación

* `POST /auth/login` – Login con documento y contraseña
* `GET /auth/verify` – Verificar token

### 📦 Productos (rutas protegidas)

* `GET /productos` – Obtener todos los productos
* `GET /productos/:id` – Obtener producto por ID
* `POST /productos` – Crear producto
* `PUT /productos/:id` – Actualizar producto
* `DELETE /productos/:id` – Eliminar producto

### 📧 Contacto (requiere autenticación)

* `POST /contactar` – Enviar mensaje por correo con Nodemailer
* `GET /contactar` – Obtener mensajes (solo admin)

---


## 🚀 Despliegue

### 🔧 Backend

* Variables de entorno seguras
* Base de datos real
* HTTPS habilitado
* Rate limiting
* Logs y monitoreo

### 💻 Frontend

* Configurar variables de entorno
* Build optimizado:

  ```bash
  npm run build
  ```
* Desplegar en **Vercel**, **Netlify** u otro servicio
* Asignar dominio personalizado

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**.

---

## 📬 Contacto

👩‍💻 **Autoras:** Gabriela Contreras -Katherine Contreras
