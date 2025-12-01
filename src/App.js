import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import './App.css';

// Estilos en línea para simplificar
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
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px'
  },
  dashboard: {
    background: 'white',
    minHeight: '100vh',
    padding: '40px'
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
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    credential: '',
    authMethod: 'password',
    twoFactorEnabled: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
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
          setMessage('🔐 Se requiere verificación 2FA. Código: 123456');
        } else {
          setIsAuthenticated(true);
          setUser(response.user);
          setMessage('✅ ' + response.message);
          localStorage.setItem('authToken', response.token);
        }
      } else {
        setMessage('❌ ' + response.message);
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
    setMessage('✅ Sesión cerrada correctamente');
  };

  // Login Form Component
  const LoginForm = () => (
    <div style={styles.loginContainer}>
      <div style={styles.loginForm}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          🔐 Sistema de Autenticación
        </h2>
        
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('❌') ? styles.error : styles.success)
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Método de Autenticación:
            </label>
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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Usuario/Email:
            </label>
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
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              {formData.authMethod === 'password' ? 'Contraseña' : 'Token'}:
            </label>
            <input
              type="password"
              name="credential"
              value={formData.credential}
              onChange={handleChange}
              placeholder={formData.authMethod === 'password' ? 'password123' : 'google_token o facebook_token'}
              required
              style={styles.input}
            />
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="twoFactorEnabled"
              checked={formData.twoFactorEnabled}
              onChange={handleChange}
              style={{ marginRight: '10px' }}
            />
            <label>Autenticación en Dos Pasos (2FA)</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Autenticando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          borderLeft: '4px solid #667eea'
        }}>
          <h4 style={{ marginBottom: '15px', color: '#333' }}>🧪 Credenciales de Demo:</h4>
          <p><strong>Password:</strong> usuario1 / password123</p>
          <p><strong>Google:</strong> cualquier@email.com / google_token</p>
          <p><strong>Facebook:</strong> cualquier@email.com / facebook_token</p>
          <p><strong>2FA:</strong> Código: 123456</p>
        </div>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div style={styles.dashboard}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '2px solid #e9ecef'
      }}>
        <h1 style={{ color: '#333' }}>🎉 ¡Bienvenido al Sistema!</h1>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '10px 20px', 
            background: '#dc3545', 
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {message && (
        <div style={{
          ...styles.message,
          ...styles.success,
          marginBottom: '30px'
        }}>
          {message}
        </div>
      )}

      <div style={{ 
        background: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>👤 Información del Usuario</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px'
        }}>
          <div style={{ 
            padding: '15px', 
            background: 'white', 
            borderRadius: '8px',
            borderLeft: '4px solid #667eea'
          }}>
            <div style={{ fontWeight: '600', color: '#555' }}>ID:</div>
            <div style={{ color: '#333', marginTop: '5px' }}>{user?.id || '1'}</div>
          </div>
          <div style={{ 
            padding: '15px', 
            background: 'white', 
            borderRadius: '8px',
            borderLeft: '4px solid #667eea'
          }}>
            <div style={{ fontWeight: '600', color: '#555' }}>Usuario:</div>
            <div style={{ color: '#333', marginTop: '5px' }}>{user?.username || 'usuario1'}</div>
          </div>
          <div style={{ 
            padding: '15px', 
            background: 'white', 
            borderRadius: '8px',
            borderLeft: '4px solid #667eea'
          }}>
            <div style={{ fontWeight: '600', color: '#555' }}>Email:</div>
            <div style={{ color: '#333', marginTop: '5px' }}>{user?.email || 'usuario1@email.com'}</div>
          </div>
          <div style={{ 
            padding: '15px', 
            background: 'white', 
            borderRadius: '8px',
            borderLeft: '4px solid #667eea'
          }}>
            <div style={{ fontWeight: '600', color: '#555' }}>Método:</div>
            <div style={{ color: '#333', marginTop: '5px' }}>{formData.authMethod}</div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#e7f3ff', 
        padding: '30px', 
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>✨ Características Implementadas</h2>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ padding: '10px 0', color: '#555' }}>✅ Autenticación con múltiples métodos</li>
          <li style={{ padding: '10px 0', color: '#555' }}>✅ Base de datos MySQL con JPA</li>
          <li style={{ padding: '10px 0', color: '#555' }}>✅ Autenticación en Dos Pasos (2FA)</li>
          <li style={{ padding: '10px 0', color: '#555' }}>✅ API REST con Spring Boot</li>
          <li style={{ padding: '10px 0', color: '#555' }}>✅ Frontend con React</li>
          <li style={{ padding: '10px 0', color: '#555' }}>✅ Seguridad con Spring Security</li>
        </ul>
      </div>
    </div>
  );

  return isAuthenticated ? <Dashboard /> : <LoginForm />;
}

export default App;