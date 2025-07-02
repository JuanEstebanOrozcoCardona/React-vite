import React from 'react';
import '../styles/style.css';

const Navbar = ({ setShowRegistro, setShowCarrito, setShowLogin, totalProductos }) => {
  // El usuarioSesion es el que está logueado
  const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));

  const handleLogout = () => {
    localStorage.removeItem('usuarioSesion');
    window.location.reload();
  };

  return (
    <nav>
      <a href="#">Inicio</a>
      <a href="#juegos">Juegos</a>
      <button className="nav-btn" onClick={() => setShowRegistro(true)}>
        Registro
      </button>
      {/* Solo muestra el botón de iniciar sesión si NO hay usuario en sesión */}
      {!usuarioSesion && (
        <button className="nav-btn" onClick={() => setShowLogin(true)}>
          Iniciar sesión
        </button>
      )}
      <button className="nav-btn" onClick={() => setShowCarrito(true)}>
        Carrito <span className="carrito-badge">{totalProductos}</span>
      </button>
      <a href="#productos">Productos</a>
      <a href="#contacto">Contacto</a>
      {/* Solo muestra el icono y cerrar sesión si hay usuario en sesión */}
      {usuarioSesion && (
        <>
          <span
            title={usuarioSesion.correo}
            className="perfil-icon"
            style={{
              fontSize: '1.7em',
              marginLeft: '10px',
              verticalAlign: 'middle',
              cursor: 'pointer',
              display: 'inline-block'
            }}
          >
            {/* Candado animado con colores realistas */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              fill="none"
              style={{ display: 'block' }}
            >
              {/* Cuerpo del candado: dorado */}
              <rect x="16" y="28" width="32" height="24" rx="6" fill="#FFD700" stroke="#B8860B" strokeWidth="2"/>
              {/* Arco del candado: gris metálico */}
              <path
                className="candado-arco"
                d="M20 28
                   V20
                   a12 12 0 0 1 24 0
                   v8"
                fill="none"
                stroke="#888"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <button className="nav-btn" onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Cerrar sesión
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;