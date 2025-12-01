import React, { useState } from 'react';
import '../../styles/LoginForm.css'; // Si tienes esta ruta

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email || !password) {
      setError('Por favor ingresa email y contraseña');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Credenciales válidas
      const validEmails = ['usuario1', 'usuario1@email.com'];
      const validPassword = 'password123';
      
      const isEmailValid = validEmails.includes(email.toLowerCase().trim());
      const isPasswordValid = password === validPassword;
      
      if (isEmailValid && isPasswordValid) {
        setSuccess('✅ ¡Autenticación exitosa! Redirigiendo...');
        
        // Simular redirección
        setTimeout(() => {
          // window.location.href = '/dashboard';
          console.log('Redirigiendo al dashboard...');
        }, 2000);
        
      } else {
        setError('❌ Credenciales incorrectas. Usa: usuario1 / password123');
      }
      
    } catch (err) {
      setError('Error en el servidor. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('usuario1@email.com');
    setPassword('password123');
    setSuccess('Credenciales de demo cargadas. Haz clic en "Iniciar Sesión"');
    setError('');
  };

  const handleSocialLogin = (provider) => {
    setSuccess(`Iniciando sesión con ${provider}... (simulación)`);
    // Aquí iría la integración real con OAuth
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="header">
          <h1><i className="fas fa-lock"></i> Sistema de Autenticación</h1>
          <p className="subtitle">Método de Autenticación: Password</p>
        </div>

        <form onSubmit={handleSubmit} id="loginForm">
          <div className="input-group">
            <label htmlFor="email">
              <i className="fas fa-user"></i> Usuario/Email:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario1 o usuario1@email.com"
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              <i className="fas fa-key"></i> Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              disabled={isLoading}
            />
          </div>

          <div className="options">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Recordar mi sesión</span>
            </label>
            
            <label className="checkbox">
              <input
                type="checkbox"
                checked={twoFA}
                onChange={(e) => setTwoFA(e.target.checked)}
                disabled={isLoading}
              />
              <span>Autenticación en Dos Pasos (2FA)</span>
            </label>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Validando...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
              </>
            )}
          </button>

          <button
            type="button"
            className="demo-btn"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            <i className="fas fa-magic"></i> Usar Credenciales de Demo
          </button>
        </form>

        <div className="credentials-box">
          <h3><i className="fas fa-info-circle"></i> Credenciales de Demo:</h3>
          <ul>
            <li><strong>Password:</strong> usuario1 / password123</li>
            <li><strong>Google:</strong> cualquier@email.com / google_token</li>
            <li><strong>Facebook:</strong> cualquier@email.com / facebook_token</li>
            <li><strong>2FA:</strong> Código: 123456</li>
          </ul>
        </div>

        <div className="social-login">
          <p className="divider">O inicia sesión con:</p>
          <div className="social-buttons">
            <button
              className="social-btn google"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <i className="fab fa-google"></i> Google
            </button>
            <button
              className="social-btn facebook"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isLoading}
            >
              <i className="fab fa-facebook"></i> Facebook
            </button>
          </div>
        </div>

        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
      </div>
    </div>
  );
}

export default LoginForm;