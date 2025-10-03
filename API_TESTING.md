# 🧪 Testing de la API

Guía para probar todos los endpoints del backend usando cURL o herramientas como Postman.

## 🔑 Autenticación

### 1. Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "documento": "12345678",
    "password": "password123"
  }'
```

**Respuesta exitosa:**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "documento": "12345678",
    "nombre": "Usuario Demo"
  }
}
```

**Guardar el token para las siguientes peticiones!**

### 2. Verificar Token
```bash
curl -X GET http://localhost:5000/auth/verify \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

## 📦 Productos (Requieren autenticación)

### 1. Listar Productos
```bash
curl -X GET http://localhost:5000/productos \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 2. Obtener un Producto
```bash
curl -X GET http://localhost:5000/productos/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 3. Crear Producto
```bash
curl -X POST http://localhost:5000/productos \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Auriculares Sony WH-1000XM5",
    "cantidad": 25,
    "precio": 399.99,
    "categoria": "Audio"
  }'
```

### 4. Actualizar Producto
```bash
curl -X PUT http://localhost:5000/productos/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop Dell XPS 13 (Actualizada)",
    "cantidad": 20,
    "precio": 1399.99,
    "categoria": "Electrónica"
  }'
```

### 5. Eliminar Producto
```bash
curl -X DELETE http://localhost:5000/productos/1 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

## 📧 Contacto (Requiere autenticación)

### 1. Enviar Mensaje
```bash
curl -X POST http://localhost:5000/contactar \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nombreEmpresa": "Tech Solutions S.A.",
    "documento": "87654321",
    "email": "contacto@techsolutions.com",
    "mensaje": "Me gustaría solicitar información sobre sus productos."
  }'
```

### 2. Listar Mensajes (Admin)
```bash
curl -X GET http://localhost:5000/contactar \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

---

## 🎯 Escenarios de Prueba

### ✅ Caso Exitoso: Login y Crear Producto
```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"documento":"12345678","password":"password123"}' \
  | grep -o '"token":"[^"]*' | sed 's/"token":"//')

# 2. Crear producto usando el token
curl -X POST http://localhost:5000/productos \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto de Prueba",
    "cantidad": 10,
    "precio": 99.99,
    "categoria": "Test"
  }'
```

### ❌ Caso de Error: Login Fallido
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "documento": "99999999",
    "password": "wrong_password"
  }'
```

**Respuesta:**
```json
{
  "error": "Credenciales inválidas"
}
```

### ❌ Caso de Error: Acceso sin Token
```bash
curl -X GET http://localhost:5000/productos
```

**Respuesta:**
```json
{
  "error": "Acceso denegado. No se proporcionó token."
}
```

### ❌ Caso de Error: Token Inválido
```bash
curl -X GET http://localhost:5000/productos \
  -H "Authorization: Bearer token_invalido_123"
```

**Respuesta:**
```json
{
  "error": "Token inválido o expirado"
}
```

---

## 🛠️ Usando Postman

### Configurar Postman

1. **Crear una nueva colección** llamada "Gaby Auth API"

2. **Crear una variable de entorno:**
   - Variable: `base_url`
   - Valor: `http://localhost:5000`

3. **Crear una variable para el token:**
   - Variable: `token`
   - Valor: (se llenará automáticamente)

### Configurar Login Request

1. Crear request POST a `{{base_url}}/auth/login`
2. En Body → raw → JSON:
   ```json
   {
     "documento": "12345678",
     "password": "password123"
   }
   ```
3. En Tests, agregar:
   ```javascript
   const response = pm.response.json();
   pm.environment.set("token", response.token);
   ```

### Configurar Requests Protegidas

Para todos los endpoints protegidos:
1. En Headers agregar:
   - Key: `Authorization`
   - Value: `Bearer {{token}}`

---

## 📊 Códigos de Estado HTTP

- `200 OK` - Petición exitosa
- `201 Created` - Recurso creado exitosamente
- `400 Bad Request` - Datos inválidos
- `401 Unauthorized` - No autenticado
- `403 Forbidden` - Token inválido
- `404 Not Found` - Recurso no encontrado
- `500 Internal Server Error` - Error del servidor

---

## 🔍 Health Check

Verificar que el servidor esté funcionando:

```bash
curl http://localhost:5000/
```

**Respuesta:**
```json
{
  "message": "API de Gaby Auth funcionando correctamente"
}
```

---

## 💡 Tips

1. **Guardar el token**: Después del login, copia el token para usarlo en las siguientes peticiones.

2. **Expiración**: Los tokens expiran después de 24 horas. Si recibes error 403, haz login nuevamente.

3. **Base de datos**: Recuerda que la base de datos está en memoria. Los cambios se pierden al reiniciar el servidor.

4. **CORS**: Si haces peticiones desde el navegador, el CORS ya está configurado.

5. **Testing automatizado**: Considera usar Jest o Supertest para tests automatizados.

