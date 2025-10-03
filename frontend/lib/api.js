// Utilidades para llamadas a la API
import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Productos
export const getProductos = async () => {
  const response = await fetch(`${API_URL}/productos`, {
    headers: getHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  
  return await response.json();
};

export const createProducto = async (producto) => {
  const response = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(producto),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al crear producto');
  }
  
  return data;
};

export const updateProducto = async (id, producto) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(producto),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al actualizar producto');
  }
  
  return data;
};

export const deleteProducto = async (id) => {
  const response = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al eliminar producto');
  }
  
  return data;
};

// Contacto
export const enviarMensajeContacto = async (mensaje) => {
  const response = await fetch(`${API_URL}/contactar`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(mensaje),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al enviar mensaje');
  }
  
  return data;
};

