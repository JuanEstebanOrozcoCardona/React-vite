import React, { useState, useContext } from "react";
import { ProductContext } from '../ProductContext/ProductContext';
import '../../../shared/styles/style.css';

const TarjetaProducto = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useContext(ProductContext);

  const aumentar = () => setCantidad((c) => c + 1);
  const disminuir = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  return (
    <div className="producto-card">
      <img
        src={producto.image || producto.imagen}
        alt={producto.title || producto.nombre}
        className="producto-img"
        style={{
          width: "140px",
          height: "140px",
          objectFit: "contain",
          margin: "0 auto",
          display: "block",
        }}
      />
      <h4>{producto.title || producto.nombre}</h4>
      <p>{producto.description || producto.descripcion}</p>
      <p className="producto-precio">${producto.price || producto.precio}</p>
      <div className="cantidad-control">
        <button onClick={disminuir} className="btn-cantidad">
          −
        </button>
        <span className="cantidad">{cantidad}</span>
        <button onClick={aumentar} className="btn-cantidad">
          +
        </button>
      </div>
      <button
        className="btn-comprar"
        onClick={() => addToCart(producto, cantidad)}
      >
        Comprar
      </button>
    </div>
  );
};

export default TarjetaProducto;
