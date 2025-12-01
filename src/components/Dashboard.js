import React from 'react';

const Dashboard = ({ user, authData, onLogout }) => {
  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.dashboardHeader}>
        <h1>🎉 ¡Bienvenido al Sistema!</h1>
        <button onClick={onLogout} style={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </div>

      <div style={styles.userInfo}>
        <h2>Información del Usuario</h2>
        <div style={styles.infoGrid}>
          <div style={styles.infoItem}>
            <label>ID:</label>
            <span>{user.id}</span>
          </div>
          <div style={styles.infoItem}>
            <label>Usuario:</label>
            <span>{user.username}</span>
          </div>
          <div style={styles.infoItem}>
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div style={styles.infoItem}>
            <label>Método de Auth:</label>
            <span>{authData.authMethod}</span>
          </div>
          <div style={styles.infoItem}>
            <label>2FA:</label>
            <span>{authData.twoFactorRequired ? 'Activado ✓' : 'No activado'}</span>
          </div>
        </div>
      </div>

      <div style={styles.features}>
        <h2>✨ Características Implementadas</h2>
        <ul>
          <li>✅ Autenticación con múltiples métodos (Strategy Pattern)</li>
          <li>✅ Base de datos MySQL con JPA</li>
          <li>✅ Autenticación en Dos Pasos (2FA)</li>
          <li>✅ Registro de logs de seguridad</li>
          <li>✅ API REST con Spring Boot</li>
          <li>✅ Frontend con React</li>
          <li>✅ Seguridad con Spring Security</li>
        </ul>
      </div>

      <div style={styles.techStack}>
        <h2>🛠️ Stack Tecnológico</h2>
        <div style={styles.techGrid}>
          <div style={styles.techItem}>Spring Boot 3.2</div>
          <div style={styles.techItem}>React 18</div>
          <div style={styles.techItem}>MySQL</div>
          <div style={styles.techItem}>JPA/Hibernate</div>
          <div style={styles.techItem}>Spring Security</div>
          <div style={styles.techItem}>Axios</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    background: 'white',
    minHeight: '100vh',
    padding: '40px'
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e9ecef'
  },
  logoutBtn: {
    padding: '10px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  userInfo: {
    background: '#f8f9fa',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    background: 'white',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea'
  },
  features: {
    background: '#e7f3ff',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  techStack: {
    background: '#fff3cd',
    padding: '30px',
    borderRadius: '12px'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px'
  },
  techItem: {
    background: 'white',
    padding: '15px',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: '600',
    border: '2px solid #ffc107'
  }
};

export default Dashboard;