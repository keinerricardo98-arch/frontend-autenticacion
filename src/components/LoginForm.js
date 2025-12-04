import React, { useState } from 'react';
import { authService } from '../services/authService';

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    credential: '',
    authMethod: 'password',
    twoFactorEnabled: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [twoFactorData, setTwoFactorData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await authService.login(
        formData.identifier,
        formData.credential,
        formData.authMethod,
        formData.twoFactorEnabled
      );

      if (response.success) {
        if (response.twoFactorRequired) {
          setTwoFactorData({
            sessionToken: response.token || 'session-temp',
            message: response.message
          });
          setMessage('🔐 Se requiere verificación 2FA');
        } else {
          onLoginSuccess(response);
          setMessage('✅ ' + response.message);
        }
      } else {
        setMessage('❌ ' + response.message);
      }
    } catch (error) {
      setMessage('❌ Error de conexión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    
    if (!twoFactorData) return;

    setLoading(true);
    try {
      const response = await authService.verify2FA(twoFactorData.sessionToken, code);
      
      if (response.success) {
        onLoginSuccess(response);
        setMessage('✅ ' + response.message);
        setTwoFactorData(null);
      } else {
        setMessage('❌ ' + response.message);
      }
    } catch (error) {
      setMessage('❌ Error en verificación 2FA');
    } finally {
      setLoading(false);
    }
  };

  if (twoFactorData) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginForm}>
          <h2>🔐 Verificación en Dos Pasos</h2>
          <p>{twoFactorData.message}</p>
          <p><strong>Código de demostración: 123456</strong></p>
          
          <form onSubmit={handle2FASubmit}>
            <div style={styles.formGroup}>
              <label>Código 2FA:</label>
              <input
                type="text"
                name="code"
                placeholder="Ingresa el código de verificación"
                required
                style={styles.input}
              />
            </div>
            
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>
          </form>
          
          <button 
            onClick={() => setTwoFactorData(null)}
            style={{...styles.button, background: '#6c757d', marginTop: '10px'}}
          >
            ← Volver al login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginForm}>
        <h2>🚀 Sistema de Autenticación</h2>
        
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('❌') ? styles.error : styles.success)
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Método de Autenticación:</label>
            <select
              name="authMethod"
              value={formData.authMethod}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="password">Password</option>
              <option value="google">Google</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Usuario/Email:</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="usuario1 o usuario1@email.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>
              {formData.authMethod === 'password' ? 'Contraseña' : 'Token'}:
            </label>
            <input
              type="password"
              name="credential"
              value={formData.credential}
              onChange={handleChange}
              placeholder={
                formData.authMethod === 'password' ? 
                'password123' : 'google_token o facebook_token'
              }
              required
              style={styles.input}
            />
          </div>

          <div style={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={formData.twoFactorEnabled}
                onChange={handleChange}
              />
              Autenticación en Dos Pasos (2FA)
            </label>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={styles.demoCredentials}>
          <h4>🧪 Credenciales de Demo:</h4>
          <p><strong>Password:</strong> usuario1 / password123</p>
          <p><strong>Google:</strong> cualquier@email.com / google_token</p>
          <p><strong>Facebook:</strong> cualquier@email.com / facebook_token</p>
          <p><strong>2FA:</strong> Código: 123456</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  },
  loginForm: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    marginTop: '5px'
  },
  checkboxGroup: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  message: {
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600'
  },
  success: {
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  error: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  demoCredentials: {
    marginTop: '30px',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea'
  }
};

export default LoginForm;