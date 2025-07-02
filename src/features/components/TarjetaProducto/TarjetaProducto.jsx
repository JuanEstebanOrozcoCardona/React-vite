// Ejemplo para TarjetaProducto.jsx
import { useState, useContext } from 'react';
import { ProductContext } from '../ProductContext/ProductContext';
import Swal from 'sweetalert2';
import '../../../shared/styles/style.css';

const TarjetaProducto = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useContext(ProductContext);

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleComprar = () => {
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    if (!usuarioSesion) {
      Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Por favor, inicia sesión para comprar.',
      });
      return;
    }
    addToCart(producto, cantidad);
    setCantidad(1);
  };

  return (
    <div className="producto-card">
      <img src={producto.image} alt={producto.title} className="producto-img" />
      <h4>{producto.title}</h4>
      <p>{producto.description}</p>
      <div className="game-price mb-2"><b>Precio: ${producto.price?.toFixed(2) ?? 'N/A'}</b></div>
      <div className="cantidad-control">
        <button onClick={disminuir} className="btn-cantidad">−</button>
        <span className="cantidad" style={{color: '#fff', background: '#23283a', borderRadius: '4px', padding: '2px 10px', minWidth: '24px', display: 'inline-block'}}>{cantidad}</span>
        <button onClick={aumentar} className="btn-cantidad">+</button>
      </div>
      <button className="btn-comprar" onClick={handleComprar}>Comprar</button>
    </div>
  );
};

export default TarjetaProducto;