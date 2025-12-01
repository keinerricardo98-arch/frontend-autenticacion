import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (identifier, credential, authMethod, twoFactorEnabled) => {
    try {
      const response = await api.post('/auth/login', {
        identifier,
        credential,
        authMethod,
        twoFactorEnabled
      });
      return response.data;
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error conectando con el servidor'
      };
    }
  },

  verify2FA: async (sessionToken, code) => {
    const response = await api.post('/auth/verify-2fa', {
      sessionToken,
      code
    });
    return response.data;
  },

  validateToken: async (token) => {
    const response = await api.get('/auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  logout: async (token) => {
    const response = await api.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAuthLogs: async () => {
    const response = await api.get('/users/logs');
    return response.data;
  }
};