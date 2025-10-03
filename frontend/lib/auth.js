const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const login = async (documento, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ documento, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en el login');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (nombre, documento, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ nombre, documento, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en el registro');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getUser();
};

export const verifyToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      credentials: 'include',
    });

    const data = await response.json();
    
    if (data.valid && data.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }
    
    return data.valid;
  } catch (error) {
    return false;
  }
};

