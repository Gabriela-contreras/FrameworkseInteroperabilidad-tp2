#!/bin/bash

echo "🚀 Configurando proyecto Gaby Auth..."
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Backend
echo "${BLUE}📦 Instalando dependencias del Backend...${NC}"
cd backend
npm install
echo ""

# Crear .env si no existe
if [ ! -f .env ]; then
    echo "${BLUE}⚙️  Creando archivo .env del Backend...${NC}"
    cat > .env << EOF
PORT=5000
JWT_SECRET=tu_clave_secreta_muy_segura_cambiala_en_produccion
NODE_ENV=development
EOF
    echo "${GREEN}✓ Archivo .env creado${NC}"
fi

cd ..

# Frontend
echo "${BLUE}📦 Instalando dependencias del Frontend...${NC}"
cd frontend
npm install
echo ""

# Crear .env.local si no existe
if [ ! -f .env.local ]; then
    echo "${BLUE}⚙️  Creando archivo .env.local del Frontend...${NC}"
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF
    echo "${GREEN}✓ Archivo .env.local creado${NC}"
fi

cd ..

echo ""
echo "${GREEN}✅ Instalación completada!${NC}"
echo ""
echo "Para ejecutar el proyecto:"
echo ""
echo "  Terminal 1 (Backend):"
echo "  ${BLUE}cd backend && npm run dev${NC}"
echo ""
echo "  Terminal 2 (Frontend):"
echo "  ${BLUE}cd frontend && npm run dev${NC}"
echo ""
echo "Credenciales de prueba:"
echo "  Documento: 12345678"
echo "  Contraseña: password123"
echo ""

