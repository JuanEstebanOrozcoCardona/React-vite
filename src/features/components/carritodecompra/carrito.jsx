import React from 'react';
import Swal from 'sweetalert2';
import '../../../shared/styles/style.css';

const CarritoDeCompra = ({
  cart,
  totalProductos,
  totalPagar,
  decreaseCartItem,
  increaseCartItem,
  removeFromCart,
  setShowCarrito,
  clearCart // <-- AGREGA este prop desde tu contexto
}) => {
  const handleConfirmarCompra = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Carrito vacío',
        text: 'Agrega productos antes de confirmar la compra.',
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: '¡Compra confirmada!',
      text: 'Gracias por tu compra. Pronto recibirás tus productos.',
    });
    clearCart();
    setShowCarrito(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowCarrito(false)}>
      <div className="modal-registro" style={{minWidth:'340px',maxWidth:'95vw'}} onClick={e => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={() => setShowCarrito(false)}>&times;</button>
        <h4 style={{color:'#00e0ff',textAlign:'center'}}>🛒 Carrito</h4>
        {cart.length === 0 ? (
          <p className="carrito-vacio">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="carrito-lista">
              {cart.map((item, idx) => (
                <li key={idx}>
                  <span className="carrito-item-nombre">{item.title || item.nombre}</span>
                  <div className="carrito-cantidad-control">
                    <button className="carrito-btn-cantidad" onClick={() => decreaseCartItem(item.id || item.nombre)}>-</button>
                    <span>{item.cantidad}</span>
                    <button className="carrito-btn-cantidad" onClick={() => increaseCartItem(item.id || item.nombre)}>+</button>
                  </div>
                  <span>${((item.price || item.precio) * item.cantidad).toFixed(2)}</span>
                  <button className="carrito-btn-eliminar" onClick={() => removeFromCart(item.id || item.nombre)}>🗑</button>
                </li>
              ))}
            </ul>
            <div className="carrito-totales">
              <span>Total productos: <b>{totalProductos}</b></span>
              <span>Total a pagar: <b style={{color:'#00e0ff'}}>${totalPagar.toFixed(2)}</b></span>
            </div>
            {/* Botón de confirmar compra */}
            <button
              className="btn-confirmar-compra"
              style={{marginTop: '16px', width: '100%', background: '#00e0ff', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold', fontSize: '1em', cursor: 'pointer'}}
              onClick={handleConfirmarCompra}
            >
              Confirmar compra
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarritoDeCompra;