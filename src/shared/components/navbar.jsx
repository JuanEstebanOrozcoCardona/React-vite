import React from 'react';
import '../styles/style.css';

const Navbar = ({ setShowRegistro, setShowCarrito, totalProductos }) => (
  <nav>
    <a href="#">Inicio</a>
    <a href="#juegos">Juegos</a>
    <button className="nav-btn" onClick={() => setShowRegistro(true)}>
      Registro
    </button>
    <button className="nav-btn" onClick={() => setShowCarrito(true)}>
      Carrito <span className="carrito-badge">{totalProductos}</span>
    </button>
    <a href="#productos">Productos</a>
    <a href="#contacto">Contacto</a>
  </nav>
);

export default Navbar;
