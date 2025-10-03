const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};

export const getProductos = async () => {
  const response = await fetch(`${API_URL}/productos`, {
    headers: getHeaders(),
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al eliminar producto');
  }
  
  return data;
};

export const enviarMensajeContacto = async (mensaje) => {
  const response = await fetch(`${API_URL}/contactar`, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify(mensaje),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Error al enviar mensaje');
  }
  
  return data;
};

