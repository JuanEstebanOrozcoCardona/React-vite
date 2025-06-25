import { useState, useContext } from 'react';
import { ProductContext } from '../ProductContext/ProductContext';
import GameCarousel from '../GameCarousel/GameCarousel';
import '../../../shared/styles/style.css';

const GameCard = ({ juego }) => {
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useContext(ProductContext);

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleComprar = () => {
    const juegoCarrito = {
      id: juego.name,
      title: juego.name,
      price: juego.price, // Use price from juego
      description: juego.desc,
      image: juego.images[0],
    };
    addToCart(juegoCarrito, cantidad);
    setCantidad(1);
  };

  return (
    <div className="game-card game-card-large">
      <GameCarousel images={juego.images} alt={juego.name} />
      <h4>{juego.name}</h4>
      <p>{juego.desc}</p>
      <div className="game-price mb-2"><b>Precio: ${juego.price.toFixed(2)}</b></div>
      <div className="cantidad-control">
        <button onClick={disminuir} className="btn-cantidad">−</button>
        <span className="cantidad" style={{color: '#fff', background: '#23283a', borderRadius: '4px', padding: '2px 10px', minWidth: '24px', display: 'inline-block'}}>{cantidad}</span>
        <button onClick={aumentar} className="btn-cantidad">+</button>
      </div>
      <button className="btn-comprar" onClick={handleComprar}>Comprar</button>
    </div>
  );
};

export default GameCard;
