import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    identifier: '',
    credential: '',
    authMethod: 'password'
  });
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  
  // Usar useRef para manejar inputs correctamente
  const identifierRef = useRef(null);
  const credentialRef = useRef(null);

  // Efecto para enfocar el primer input al cargar
  useEffect(() => {
    if (identifierRef.current) {
      identifierRef.current.focus();
    }
  }, []);

  // Manejar cambios en los inputs CORRECTAMENTE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar cambio de método
  const handleMethodChange = (e) => {
    const method = e.target.value;
    setFormData({
      identifier: '',
      credential: '',
      authMethod: method
    });
    
    // Enfocar el input después de cambiar método
    setTimeout(() => {
      if (identifierRef.current) {
        identifierRef.current.focus();
      }
    }, 100);
  };

  // Función de login SIMULADA - SIN CONEXIÓN A SERVIDOR
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage('');

    // Simular delay de red
    setTimeout(() => {
      // CREDENCIALES VÁLIDAS (SIMULADAS)
      let isValid = false;
      let userData = null;

      if (formData.authMethod === 'password') {
        if (formData.identifier === 'usuario1' && formData.credential === 'password123') {
          isValid = true;
          userData = {
            id: 1,
            username: 'usuario1',
            fullName: 'Juan Pérez',
            email: 'usuario1@email.com',
            role: 'Usuario Regular'
          };
        } else if (formData.identifier === 'admin' && formData.credential === 'admin123') {
          isValid = true;
          userData = {
            id: 2,
            username: 'admin',
            fullName: 'Administrador del Sistema',
            email: 'admin@sistema.com',
            role: 'Administrador'
          };
        }
      } else if (formData.authMethod === 'google') {
        if (formData.identifier.includes('@') && formData.credential === 'google_token') {
          isValid = true;
          userData = {
            id: 3,
            username: formData.identifier.split('@')[0],
            fullName: 'Usuario Google',
            email: formData.identifier,
            role: 'Usuario Social'
          };
        }
      } else if (formData.authMethod === 'facebook') {
        if (formData.identifier.includes('@') && formData.credential === 'facebook_token') {
          isValid = true;
          userData = {
            id: 4,
            username: formData.identifier.split('@')[0],
            fullName: 'Usuario Facebook',
            email: formData.identifier,
            role: 'Usuario Social'
          };
        }
      }

      if (isValid) {
        setIsLoggedIn(true);
        setUserInfo(userData);
        setMessage('success: ¡Autenticación exitosa! Bienvenido al sistema.');
      } else {
        setMessage('error: Credenciales incorrectas. Usa las credenciales de demostración.');
      }
    }, 500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      identifier: '',
      credential: '',
      authMethod: 'password'
    });
    setUserInfo(null);
    setMessage('success: Sesión cerrada correctamente.');
    
    // Enfocar el input después de logout
    setTimeout(() => {
      if (identifierRef.current) {
        identifierRef.current.focus();
      }
    }, 100);
  };

  // Estilos en línea
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginBox: {
      background: 'white',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '450px'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
      fontSize: '28px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#555',
      fontWeight: '600',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    inputFocus: {
      borderColor: '#667eea'
    },
    select: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #e1e5e9',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: 'white',
      outline: 'none'
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
      marginTop: '10px',
      transition: 'transform 0.2s'
    },
    buttonHover: {
      transform: 'translateY(-2px)'
    },
    message: {
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: '600'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    demoBox: {
      marginTop: '30px',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      borderLeft: '4px solid #667eea'
    }
  };

  // Renderizar Dashboard
  if (isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '15px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #e9ecef' }}>
            <div>
              <h1 style={{ color: '#333', marginBottom: '5px' }}>🎉 ¡Bienvenido, {userInfo?.fullName}!</h1>
              <p style={{ color: '#666' }}>Sistema de Autenticación - Patrones de Diseño</p>
            </div>
            <button 
              onClick={handleLogout}
              style={{ 
                padding: '10px 25px', 
                background: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Mensaje */}
          {message && (
            <div style={{
              ...styles.message,
              ...(message.startsWith('success') ? styles.success : styles.error),
              marginBottom: '30px'
            }}>
              {message.split(': ')[1]}
            </div>
          )}

          {/* Información del Usuario */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '10px', borderLeft: '4px solid #667eea' }}>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>👤 Información Personal</h3>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#555', fontSize: '14px' }}>ID de Usuario</div>
                <div style={{ color: '#333', fontWeight: '600' }}>{userInfo?.id}</div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#555', fontSize: '14px' }}>Nombre Completo</div>
                <div style={{ color: '#333', fontWeight: '600' }}>{userInfo?.fullName}</div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#555', fontSize: '14px' }}>Correo Electrónico</div>
                <div style={{ color: '#333', fontWeight: '600' }}>{userInfo?.email}</div>
              </div>
              <div>
                <div style={{ color: '#555', fontSize: '14px' }}>Rol en el Sistema</div>
                <div style={{ color: '#333', fontWeight: '600' }}>{userInfo?.role}</div>
              </div>
            </div>

            {/* Método de Autenticación */}
            <div style={{ background: '#e7f3ff', padding: '25px', borderRadius: '10px', borderLeft: '4px solid #2196f3' }}>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>🔐 Método de Autenticación</h3>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ color: '#555', fontSize: '14px' }}>Método Utilizado</div>
                <div style={{ color: '#333', fontWeight: '600', textTransform: 'uppercase' }}>{formData.authMethod}</div>
              </div>
              <div>
                <div style={{ color: '#555', fontSize: '14px' }}>Estado de la Sesión</div>
                <div style={{ color: '#28a745', fontWeight: '600' }}>✅ Activa</div>
              </div>
            </div>
          </div>

          {/* Características Implementadas */}
          <div style={{ background: '#fff3cd', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>✨ Patrones de Diseño Implementados</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#333', fontWeight: '600', marginBottom: '5px' }}>🎯 Strategy Pattern</div>
                <div style={{ color: '#666', fontSize: '14px' }}>Múltiples métodos de autenticación intercambiables</div>
              </div>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#333', fontWeight: '600', marginBottom: '5px' }}>🏭 Factory Pattern</div>
                <div style={{ color: '#666', fontSize: '14px' }}>Creación dinámica de estrategias de autenticación</div>
              </div>
              <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
                <div style={{ color: '#333', fontWeight: '600', marginBottom: '5px' }}>🎨 Decorator Pattern</div>
                <div style={{ color: '#666', fontSize: '14px' }}>Funcionalidades adicionales (2FA, Logging)</div>
              </div>
            </div>
          </div>

          {/* Información del Proyecto */}
          <div style={{ background: '#d4edda', padding: '25px', borderRadius: '10px' }}>
            <h3 style={{ color: '#155724', marginBottom: '15px' }}>📚 Información del Proyecto Académico</h3>
            <p style={{ color: '#155724', lineHeight: '1.6', marginBottom: '10px' }}>
              Este sistema demuestra la aplicación práctica de patrones de diseño en un sistema de autenticación empresarial.
            </p>
            <p style={{ color: '#155724', lineHeight: '1.6' }}>
              <strong>Tecnologías:</strong> Spring Boot, React, MySQL, JPA, Spring Security
            </p>
          </div>

        </div>
      </div>
    );
  }

  // Renderizar Login
  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>🔐 Sistema de Autenticación</h1>

        {/* Mensaje */}
        {message && (
          <div style={{
            ...styles.message,
            ...(message.startsWith('success') ? styles.success : styles.error)
          }}>
            {message.split(': ')[1]}
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Método de Autenticación:</label>
            <select
              name="authMethod"
              value={formData.authMethod}
              onChange={handleMethodChange}
              style={styles.select}
            >
              <option value="password">🔑 Password (Usuario/Contraseña)</option>
              <option value="google">🅖 Google OAuth</option>
              <option value="facebook">ƒ Facebook OAuth</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              {formData.authMethod === 'password' ? '👤 Usuario:' : '📧 Email:'}
            </label>
            <input
              ref={identifierRef}
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder={
                formData.authMethod === 'password' 
                  ? 'Ejemplo: usuario1' 
                  : 'Ejemplo: usuario@email.com'
              }
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              autoComplete="username"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              {formData.authMethod === 'password' ? '🔒 Contraseña:' : '🔐 Token:'}
            </label>
            <input
              ref={credentialRef}
              type="password"
              name="credential"
              value={formData.credential}
              onChange={handleInputChange}
              placeholder={
                formData.authMethod === 'password' 
                  ? 'Ejemplo: password123' 
                  : formData.authMethod === 'google' 
                    ? 'Ejemplo: google_token' 
                    : 'Ejemplo: facebook_token'
              }
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🚀 Iniciar Sesión
          </button>
        </form>

        {/* Credenciales de Demostración */}
        <div style={styles.demoBox}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>🧪 Credenciales de Demostración</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#4A6FA5', fontWeight: '600', marginBottom: '5px' }}>🔑 Autenticación por Password:</div>
            <div style={{ color: '#555', marginLeft: '10px' }}>
              <div>• Usuario: <code>usuario1</code> | Contraseña: <code>password123</code></div>
              <div>• Usuario: <code>admin</code> | Contraseña: <code>admin123</code></div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <div style={{ color: '#4A6FA5', fontWeight: '600', marginBottom: '5px' }}>🅖 Autenticación con Google:</div>
            <div style={{ color: '#555', marginLeft: '10px' }}>
              <div>• Email: <code>cualquier@email.com</code></div>
              <div>• Token: <code>google_token</code></div>
            </div>
          </div>

          <div>
            <div style={{ color: '#4A6FA5', fontWeight: '600', marginBottom: '5px' }}>ƒ Autenticación con Facebook:</div>
            <div style={{ color: '#555', marginLeft: '10px' }}>
              <div>• Email: <code>cualquier@email.com</code></div>
              <div>• Token: <code>facebook_token</code></div>
            </div>
          </div>
        </div>

        {/* Información del Proyecto */}
        <div style={{ marginTop: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
          🎓 Proyecto Académico - Sistema de Autenticación con Patrones de Diseño
        </div>

      </div>
    </div>
  );
}

export default App;